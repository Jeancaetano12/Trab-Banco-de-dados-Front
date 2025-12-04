"use client";

import { useEffect, useState } from "react";
import { useAlocacoes, AlocacaoDetalhada } from "../_hooks/useAlocacoes"; // Importe a interface
import { Projeto } from "../_hooks/useGetProjetos";

// --- SUB-COMPONENTE: Cuida apenas de UMA linha da tabela ---
interface LinhaProps {
    item: AlocacaoDetalhada;
    onUpdate: (fid: number, horas: number) => Promise<boolean>;
    onDelete: (fid: number) => Promise<boolean>;
}

function LinhaAlocacao({ item, onUpdate, onDelete }: LinhaProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [horas, setHoras] = useState(item.horas_trabalhadas);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // Chama a função do pai (que veio do hook)
        const sucesso = await onUpdate(item.funcionario_id, Number(horas));
        setSaving(false);
        
        if (sucesso) {
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        // O confirm já está no hook, mas o botão fica desabilitado enquanto processa
        setSaving(true); 
        await onDelete(item.funcionario_id);
        setSaving(false);
    };

    // Se não estiver editando, mostra texto normal + botão editar
    if (!isEditing) {
        return (
            <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                    {item.funcionario.nome}
                    <span className="block text-xs text-gray-500">{item.funcionario.cargo}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">
                    {item.horas_trabalhadas}h
                </td>
                <td className="px-4 py-3 text-right">
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 text-xs mr-2 font-bold"
                    >
                        Editar
                    </button>
                    <button 
                            onClick={handleDelete}
                            disabled={saving}
                            className="text-red-500 hover:text-red-700 text-xs font-bold disabled:text-gray-400"
                        >
                            {saving ? "..." : "Excluir"}
                        </button>
                </td>
            </tr>
        );
    }

    // MODO EDIÇÃO: Mostra Input + Salvar + Cancelar
    return (
        <tr className="bg-blue-50">
            <td className="px-4 py-3 text-sm text-gray-900">
                {item.funcionario.nome}
            </td>
            <td className="px-4 py-3 text-gray-900">
                <input 
                    type="number" 
                    min="0"
                    value={horas}
                    onChange={(e) => setHoras(Number(e.target.value))}
                    className="w-20 border border-blue-300 rounded px-2 py-1 text-sm"
                />
            </td>
            <td className="px-4 py-3 text-right flex justify-end gap-2">
                <button 
                    onClick={handleSave}
                    className="text-green-600 hover:text-green-800 text-xs font-bold"
                    disabled={saving}
                >
                    {saving ? "..." : "✓"}
                </button>
            </td>
        </tr>
    );
}

// --- COMPONENTE PRINCIPAL ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    projeto: Projeto | null;
}

export default function ModalVisualizarAlocacoes({ isOpen, onClose, projeto }: ModalProps) {
    // Pegamos a nova função atualizarHorasAlocacao
    const { buscarAlocacoesDoProjeto, alocacoesProjeto, loading, atualizarHorasAlocacao, removerAlocacao } = useAlocacoes();

    useEffect(() => {
        if (isOpen && projeto) {
            buscarAlocacoesDoProjeto(projeto.id);
        }
    }, [isOpen, projeto]);

    if (!isOpen || !projeto) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg relative">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Equipe: {projeto.nome}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                {loading ? (
                    <p className="text-center py-4 text-gray-500">Carregando equipe...</p>
                ) : alocacoesProjeto.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">Nenhum funcionário alocado.</p>
                ) : (
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Funcionário</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Horas</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {alocacoesProjeto.map((item) => (
                                    <LinhaAlocacao 
                                        key={item.funcionario_id}
                                        item={item}
                                        onDelete={(fid) => removerAlocacao(fid, projeto.id)}
                                        onUpdate={(fid, horas) => atualizarHorasAlocacao(fid, projeto.id, horas)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-6 text-right">
                    <button 
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}