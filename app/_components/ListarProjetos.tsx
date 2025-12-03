"use client"

import Link from "next/link";
import { Projeto } from "../_hooks/useGetProjetos";

interface ListaProps {
  projetos: Projeto[];
  loading: boolean;
  onEdit: (projeto: Projeto) => void
  error: string | null;
  onDelete: (id: number) => void
}

export default function ListaProjetos({ projetos, loading, error, onDelete, onEdit }: ListaProps) {

    if (loading) return <p className="text-center p-4">Carregando dados...</p>;
    if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                        <th className="px-5 py-3 border-b-2 border-gray-200">ID</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200">Nome</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200">Descrição</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200">Status</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200">Data de Inicio</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200">Previsão de termino</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {projetos.map((proj) => (
                        <tr key={proj.id} className="hover:bg-gray-100">
                            <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                                {proj.id}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-600 text-sm font-bold text-gray-600">
                                {proj.nome}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-600 text-sm font-bold text-gray-600">
                                {proj.descricao}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                                {proj.status}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                                {new Date(proj.data_inicio).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                                {new Date(proj.data_previsao_termino).toLocaleDateString('pt-br')}
                            </td>
                            <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                                <div className="flex gap-2">
                                    {/* Botão de Editar (Leva para outra página) */}
                                    <button
                                        onClick={() => onEdit(proj)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                                    >
                                        Editar
                                    </button>

                                    {/* Botão de Excluir (Chama a função do hook) */}
                                    <button
                                        onClick={() => onDelete(proj.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
        </div>
    );
}