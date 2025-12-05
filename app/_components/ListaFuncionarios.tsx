// app/_components/ListaFuncionarios.tsx
"use client"; // Obrigatório pois usa Hooks

import Link from "next/link";
import { Funcionario } from "../_hooks/useGetFuncionarios";

interface ListaProps {
  funcionarios: Funcionario[];
  loading: boolean;
  onEdit : (funcionario: Funcionario) => void
  error: string | null;
  onDelete: (id: number) => void
}

export default function ListaFuncionarios({ funcionarios, loading, error, onDelete, onEdit }: ListaProps) {

  if (loading) return <p className="text-center p-4">Carregando dados...</p>;
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="px-5 py-3 border-b-2 border-gray-200">ID</th>
            <th className="px-5 py-3 border-b-2 border-gray-200">Nome</th>
            <th className="px-5 py-3 border-b-2 border-gray-200">Email</th>
            <th className="px-5 py-3 border-b-2 border-gray-200">Cargo</th>
            <th className="px-5 py-3 border-b-2 border-gray-200">Salário</th>
            <th className="px-5 py-3 border-b-2 border-gray-200">Data de Contratação</th>
            <th className="px-5 py-3 border-b-2 border-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((func) => (
            <tr key={func.id} className="hover:bg-gray-100">
              <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                {func.id}
              </td>
              <td className="px-5 py-4 border-b border-gray-600 text-sm font-bold text-gray-600">
                {func.nome}
              </td>
              <td className="px-5 py-4 border-b border-gray-600 text-sm font-bold text-gray-600">
                {func.email}
              </td>
              <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                {func.cargo}
              </td>
              <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                {func.salario}
              </td>
              <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                {new Date(func.data_contratacao).toLocaleDateString('pt-br')}
              </td>
              <td className="px-5 py-4 border-b border-gray-600 text-sm text-gray-600">
                <div className="flex gap-2">
                  {/* Botão de Editar (Leva para outra página) */}
                  <button
                    onClick={() => onEdit(func)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white px-3 py-1 rounded hover:from-blue-700 hover:to-cyan-700 text-xs"
                  >
                    Editar
                  </button>

                  {/* Botão de Excluir (Chama a função do hook) */}
                  <button
                    onClick={() => onDelete(func.id)}
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