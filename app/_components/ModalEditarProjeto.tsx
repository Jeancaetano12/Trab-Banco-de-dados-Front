"use client";

import { useState, useEffect } from "react";
import { Projeto } from "@/app/_hooks/useGetProjetos";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  projeto: Projeto | null;
  // A assinatura da função deve bater com o que seu hook retorna
  onSave: (id: number, dados: Partial<Projeto>) => Promise<boolean>;
}

export default function ModalEditarProjeto({ isOpen, onClose, projeto, onSave }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    status: "",
    data_inicio: "",
    data_previsao_termino: "",
  });

  // Preenche o formulário quando o modal abre (ou o projeto muda)
  useEffect(() => {
    if (projeto) {
      // Função auxiliar para formatar Data ISO para YYYY-MM-DD (input date)
      const formatDate = (date: Date | string) => {
        if (!date) return "";
        const d = new Date(date);
        // Se a data for inválida, retorna vazio. Senão, recorta a parte da data.
        return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
      };

      setFormData({
        nome: projeto.nome,
        descricao: projeto.descricao,
        status: projeto.status,
        data_inicio: formatDate(projeto.data_inicio),
        data_previsao_termino: formatDate(projeto.data_previsao_termino),
      });
    }
  }, [projeto]);

  if (!isOpen || !projeto) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepara o objeto. Convertendo as strings de data de volta para Objetos Date
    // para satisfazer a interface Partial<Projeto>
    const payload: Partial<Projeto> = {
      nome: formData.nome,
      descricao: formData.descricao,
      status: formData.status,
      data_inicio: new Date(formData.data_inicio),
      data_previsao_termino: new Date(formData.data_previsao_termino),
    };

    // Chama a função do hook (que vai decidir qual rota usar)
    const sucesso = await onSave(projeto.id, payload);

    setLoading(false);
    
    // Só fecha se tiver dado tudo certo
    if (sucesso) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Projeto</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 text-black"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 text-black"
              rows={3}
            />
          </div>

          {/* Status - Select Específico */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2 bg-white text-black"
            >
              <option value="Em_Planejamento">Em Planejamento</option>
              <option value="Em_Andamento">Em Andamento</option>
              <option value="Concluido">Concluído</option>
            </select>
          </div>

          <div className="flex gap-4">
            {/* Data Início */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Data Início</label>
              <input
                type="date"
                name="data_inicio"
                value={formData.data_inicio}
                onChange={handleChange}
                className="mt-1 w-full border rounded p-2 text-black"
                required
              />
            </div>

            {/* Previsão Término */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Previsão Término</label>
              <input
                type="date"
                name="data_previsao_termino"
                value={formData.data_previsao_termino}
                onChange={handleChange}
                className="mt-1 w-full border rounded p-2 text-black"
                required
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}