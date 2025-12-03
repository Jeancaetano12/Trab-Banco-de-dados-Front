"use client";

import { useState } from "react";
import ListaFuncionarios from "@/app/_components/ListaFuncionarios";
import { useGetFuncionarios, Funcionario } from "@/app/_hooks/useGetFuncionarios";
import ModalNovoFuncionario from "@/app/_components/ModalNovoFuncionario";
import ModalEditarFuncionario from "@/app/_components/ModalEditarFuncionario";

export default function TelaFuncionarios() {
  const { funcionarios, loading, error, deleteFuncionario, recarregar, updateFuncionario } = useGetFuncionarios();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState<Funcionario | null>(null);

  const handleSaveEdit = async (id: number, dados: Partial<Funcionario>) => {
    const sucesso = await updateFuncionario(id, dados);
    if (sucesso) {
      recarregar();
      setFuncionarioEditando(null);
    }
  }
  return (
    <div className="container p-0">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl mb-6 mt-6 font-mono font-bold text-gray-800 dark:text-gray-200">Gerenciar Funcionários</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Novo Funcionário
        </button>

        <button
          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          onClick={recarregar}
        >
          Atualizar pagina
        </button>
      </div>
      <hr className="mb-2" />
      <ListaFuncionarios 
        funcionarios={funcionarios}
        loading={loading}
        error={error}
        onDelete={deleteFuncionario}
        onEdit={(func) => setFuncionarioEditando(func)}
      />

      <ModalNovoFuncionario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {recarregar();}}
      />

      {funcionarioEditando && (
        <ModalEditarFuncionario
          isOpen={!!funcionarioEditando}
          onClose={() => setFuncionarioEditando(null)}
          funcionario={funcionarioEditando}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
    
}