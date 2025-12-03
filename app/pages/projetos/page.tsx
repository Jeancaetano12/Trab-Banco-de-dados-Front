"use client";

import { useState } from "react";
import ListaProjetos from "@/app/_components/ListarProjetos";
import { useGetProjetos } from "@/app/_hooks/useGetProjetos";
import ModalNovoProjeto from "@/app/_components/ModalNovoProjeto";

export default function TelaFuncionarios() {
  const { projetos, loading, error, deleteProjeto, recarregar } = useGetProjetos();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container p-0">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl mb-6 mt-6 font-mono font-bold text-gray-800 dark:text-gray-200">Gerenciar Projetos</h1>
        <button 
        onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Novo Projeto
        </button>
        
        <button
          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          onClick={recarregar}
        >
          Atualizar pagina
        </button>
      </div>
      <hr className="mb-2" />
      <ListaProjetos 
        projetos={projetos}
        loading={loading}
        error={error}
        onDelete={deleteProjeto}
      />

      <ModalNovoProjeto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {recarregar();}}
      />
    </div>
  );
    
}