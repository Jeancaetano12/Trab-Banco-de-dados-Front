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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      {/* Container que envolve todo o conteúdo, excluindo a sidebar */}
      <div className="max-w-7xl mx-auto ml-0 lg:ml-64"> {/* Ajuste aqui: ml-0 em mobile, ml-64 em desktop */}
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
              Gerenciar Funcionários
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl 
                        hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 
                        shadow-lg hover:shadow-xl font-medium"
            >
              <span className="text-xl">+</span>
              Novo Funcionário
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-xl 
                        hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-0.5 
                        shadow-lg hover:shadow-xl font-medium"
              onClick={recarregar}
            >
              <span className="text-xl">🔄</span>
              Atualizar
            </button>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          <span className="mx-4 text-slate-400 dark:text-slate-500">👥</span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <ListaFuncionarios 
            funcionarios={funcionarios}
            loading={loading}
            error={error}
            onDelete={deleteFuncionario}
            onEdit={(func) => setFuncionarioEditando(func)}
          />
        </div>

        {/* Modals */}
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
    </div>
  );
}
