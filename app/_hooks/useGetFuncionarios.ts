// app/_hooks/useGetFuncionarios.ts
import { useState, useEffect } from 'react';

// 1. Defina a "cara" do seu dado
export interface Funcionario {
  id: number; // ou string, dependendo do seu banco
  nome: string;
  cargo: string;
  email: string;
  data_contratacao: Date;
  salario: string
}

export function useGetFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/funcionarios`);
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários');
      }
      const data = await response.json();
      console.log(data)
      setFuncionarios(data);
    } catch (Error) {
      setError('Falha na comunicação com a API');
      console.error(Error);
    } finally {
      setLoading(false);
    }
  };

  const updateFuncionario = async (id: number, dadosAtualizados: Partial<Funcionario>) => {
    try {
      const payload = {
        ...dadosAtualizados,
        ...(dadosAtualizados.data_contratacao && {
          data_contratacao: new Date(dadosAtualizados.data_contratacao)
        }),
        ...(dadosAtualizados.salario && {
          salario: String(dadosAtualizados.salario)
        }),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/funcionarios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || "Erro ao atualizar");
      }

      alert("Funcionario atualizado!");
      return true;
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o funcionário.");
      return false
    }
  };
  // Função de Excluir (já integrada ao hook)
  const deleteFuncionario = async (id: number) => {
    const confirm = window.confirm("Tem certeza que deseja excluir?");
    if (!confirm) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/funcionarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualiza a lista localmente removendo o item excluído
        setFuncionarios((prev) => prev.filter((func) => func.id !== id));
        alert("Funcionário excluído!");
      } else {
        alert("Erro ao excluir.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { funcionarios, loading, error, deleteFuncionario, recarregar: fetchData, updateFuncionario };
}