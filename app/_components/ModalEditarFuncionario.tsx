"use client";
import { useState, useEffect } from "react";
import { Funcionario } from "../_hooks/useGetFuncionarios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario | null; // Recebe quem vamos editar
  onSave: (id: number, dados: Partial<Funcionario>) => Promise<void>;
}

export default function ModalEditarFuncionario({ isOpen, onClose, funcionario, onSave }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    email: "",
    data_contratacao: "",
    salario: "",
  });

  // EFEITO MÁGICO: Quando o "funcionario" muda (usuário clicou em editar), preenche o form
  useEffect(() => {
    if (funcionario) {
      // Converte a data ISO para YYYY-MM-DD para o input funcionar
      const dataFormatada = new Date(funcionario.data_contratacao).toISOString().split('T')[0];

      setFormData({
        nome: funcionario.nome,
        cargo: funcionario.cargo,
        email: funcionario.email,
        data_contratacao: dataFormatada,
        salario: funcionario.salario,
      });
    }
  }, [funcionario]);

  if (!isOpen || !funcionario) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Chama a função do hook que passamos via props
    const payload = {
      nome: formData.nome,
      cargo: formData.cargo,
      email: formData.email,
      data_contratacao: formData.data_contratacao ? new Date(formData.data_contratacao) : undefined,
      salario: formData.salario !== "" ? Number(formData.salario) : undefined,
    } as Partial<Funcionario>;

    await onSave(funcionario.id, payload);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Funcionário</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Copie os inputs do seu modal de criação aqui (Nome, Cargo, etc) */}
            {/* Vou colocar só um exemplo, mas você repete para todos */}
            <label className="text-gray-700block text-sm font-medium text-gray-700">Nome</label>
            <input name="nome" value={formData.nome} onChange={handleChange} className="mt-1 w-full border rounded p-2 text-black" />

            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <input name="cargo" value={formData.cargo} onChange={handleChange} className="mt-1 w-full border rounded p-2 text-black" />
            
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full border rounded p-2 text-black" />

            <label className="block text-sm font-medium text-gray-700">Data Contratação</label>
            <input type="date" name="data_contratacao" value={formData.data_contratacao} onChange={handleChange} className="mt-1 w-full border rounded p-2 text-black" />

            <label className="block text-sm font-medium text-gray-700">Salário</label>
            <input type="number" step="0.01" name="salario" value={formData.salario} onChange={handleChange} className="mt-1 w-full border rounded p-2 text-black" />

            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800">Cancelar</button>
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}