"use client";

import { useState } from "react";
import ListaProjetos from "@/app/_components/ListarProjetos";
import { useGetProjetos, Projeto } from "@/app/_hooks/useGetProjetos";
import { useGetFuncionarios } from "@/app/_hooks/useGetFuncionarios";
import ModalNovoProjeto from "@/app/_components/ModalNovoProjeto";
import ModalEditarProjeto from "@/app/_components/ModalEditarProjeto";
import ModalNovaAlocacao from "@/app/_components/ModalNovaAlocacao";
import ModalVisualizarAlocacoes from "@/app/_components/ModalAlocacoes";

export default function TelaProjetos() {
  const { projetos, loading, error, deleteProjeto, recarregar, updateProjeto } = useGetProjetos();
  const [modalAberto, setModalAberto] = useState(false); // Modal de alocacoes
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal pros Projetos
  const [projetoEditando, setProjetoEditando] = useState<Projeto | null>(null); 
  const [projetoVisualizar, setProjetoVisualizar] = useState<Projeto | null>(null);

  const { funcionarios } = useGetFuncionarios();

  const handleSaveEdit = async (id: number, dados: Partial<Projeto>) => {
    const sucesso = await updateProjeto(id, dados);
    if (sucesso) {
      recarregar();
      setProjetoEditando(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto ml-0 lg:ml-64">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
              Gerenciar Projetos
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl 
                        hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 
                        shadow-lg hover:shadow-xl font-medium"
            >
              <span className="text-xl">+</span>
              Novo Projeto
            </button>

            <button
              onClick={() => setModalAberto(true)}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl 
                        hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 
                        shadow-lg hover:shadow-xl font-medium"
            >
              <span className="text-xl">👥</span>
              Nova Alocação
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
          <span className="mx-4 text-slate-400 dark:text-slate-500">📋</span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <ListaProjetos 
            projetos={projetos}
            loading={loading}
            error={error}
            onDelete={deleteProjeto}
            onEdit={(proj) => setProjetoEditando(proj)}
            onVerAlocacao={(proj) => setProjetoVisualizar(proj)}
          />
        </div>

        {/* Modals */}
        <ModalNovoProjeto
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {recarregar();}}
        />

        <ModalNovaAlocacao
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          onSuccess={() => {
              alert("Sucesso! Clique em Alocação para visualizar.");
          }}
          listaFuncionarios={funcionarios}
          listaProjetos={projetos}
        />

        <ModalVisualizarAlocacoes
          isOpen={!!projetoVisualizar}
          onClose={() => setProjetoVisualizar(null)}
          projeto={projetoVisualizar}
        />

        {projetoEditando && (
          <ModalEditarProjeto
            isOpen={!!projetoEditando}
            onClose={() => setProjetoEditando(null)}
            projeto={projetoEditando}
            onSave={async (id, dados) => {
              const sucesso = await updateProjeto(id, dados);
              if (sucesso) {
                recarregar();
                return true;
              }
              return false;
            }}
          />
        )}
      </div>
    </div>
  );
}
