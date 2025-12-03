"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Para recarregar a lista após salvar
}

export default function ModalNovoFuncionario({ isOpen, onClose, onSuccess }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    email: "",
    data_contratacao: "",
    salario: "",
  });

  if (!isOpen) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = {
        nome: formData.nome,
        cargo: formData.cargo,
        email: formData.email,
        // O input date retorna string YYYY-MM-DD, o DTO espera Date
        data_contratacao: new Date(formData.data_contratacao), 
        // O DTO espera string para decimal
        salario: String(formData.salario), 
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/funcionarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar funcionário");
      }

      alert("Funcionário cadastrado com sucesso!");
      
      // Limpar form
      setFormData({ nome: "", cargo: "", email: "", data_contratacao: "", salario: "" });
      
      onSuccess(); // Recarrega a lista pai
      onClose();   // Fecha o modal

    } catch (error) {
      console.error(error);
      alert("Erro ao enviar dados. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Novo Funcionário</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              required
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              type="text"
              className="mt-1 w-full border rounded p-2 text-black"
              placeholder="Nome completo"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <input
              required
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              type="text"
              className="mt-1 w-full border rounded p-2 text-black"
              placeholder="Ex: Desenvolvedor"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="mt-1 w-full border rounded p-2 text-black"
              placeholder="email@empresa.com"
            />
          </div>

          <div className="flex gap-4">
            {/* Data Contratação */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Data Contratação</label>
              <input
                required
                name="data_contratacao"
                value={formData.data_contratacao}
                onChange={handleChange}
                type="date"
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>

            {/* Salário */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Salário</label>
              <input
                required
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                type="number"
                step="0.01"
                className="mt-1 w-full border rounded p-2 text-black"
                placeholder="0.00"
              />
            </div>
          </div>

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
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}