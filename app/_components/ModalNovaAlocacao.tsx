"use client";

import { useState } from "react";
import { useAlocacoes } from "../_hooks/useAlocacoes";
import { Funcionario } from "../_hooks/useGetFuncionarios";
import { Projeto } from "../_hooks/useGetProjetos";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  // O modal precisa dessas listas para montar os <select>
  listaFuncionarios: Funcionario[];
  listaProjetos: Projeto[];
}

export default function ModalNovaAlocacao({ 
  isOpen, onClose, onSuccess, listaFuncionarios, listaProjetos 
}: ModalProps) {
    
  const { registrarAlocacao, loading } = useAlocacoes();
  
  const [formData, setFormData] = useState({
    funcionario_id: "",
    projeto_id: "",
    data_alocacao: "",
    horas_trabalhadas: ""
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Chama o hook passando os dados
    const sucesso = await registrarAlocacao({
        funcionario_id: formData.funcionario_id,
        projeto_id: formData.projeto_id,
        data_alocacao: formData.data_alocacao,
        horas_trabalhadas: formData.horas_trabalhadas
    });

    if (sucesso) {
        // Limpa o form e fecha
        setFormData({ funcionario_id: "", projeto_id: "", data_alocacao: "", horas_trabalhadas: "" });
        onSuccess();
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Nova Alocação</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* SELECT FUNCIONÁRIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Funcionário</label>
            <select
              name="funcionario_id"
              value={formData.funcionario_id}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded p-2 bg-white text-black"
            >
              <option value="">Selecione um funcionário...</option>
              {listaFuncionarios.map(func => (
                <option key={func.id} value={func.id}>
                   {func.nome} (ID: {func.id})
                </option>
              ))}
            </select>
          </div>

          {/* SELECT PROJETO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Projeto</label>
            <select
              name="projeto_id"
              value={formData.projeto_id}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded p-2 bg-white text-black"
            >
              <option value="">Selecione um projeto...</option>
              {listaProjetos.map(proj => (
                <option key={proj.id} value={proj.id}>
                   {proj.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            {/* Data Alocação */}
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Data Início</label>
                <input
                    type="date"
                    name="data_alocacao"
                    value={formData.data_alocacao}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border rounded p-2 text-black"
                />
            </div>

            {/* Horas Trabalhadas */}
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Horas (Total)</label>
                <input
                    type="number"
                    min="0"
                    name="horas_trabalhadas"
                    value={formData.horas_trabalhadas}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border rounded p-2 text-black"
                />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded text-gray-800">Cancelar</button>
            <button 
                type="submit" 
                disabled={loading} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? "Alocando..." : "Confirmar Alocação"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}