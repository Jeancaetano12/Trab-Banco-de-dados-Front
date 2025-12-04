import { useState, useEffect } from "react";

export interface CreateAlocacaoData {
    funcionario_id: number | string;
    projeto_id: number | string;
    data_alocacao: string;
    horas_trabalhadas: number | string;
}

export interface AlocacaoDetalhada {
    funcionario_id: number;
    projeto_id: number;
    horas_trabalhadas: number;
    funcionario: {
        id: number;
        nome: string;
        cargo: string;
    }
}


export function useAlocacoes() {
    const [loading, setLoading] = useState(false);
    const [alocacoesProjeto, setAlocacoesProjeto] = useState<AlocacaoDetalhada[]>([]);
    const registrarAlocacao = async (dados: CreateAlocacaoData) => {
        setLoading(true);
        try {
            // CONVERSÃO DE DADOS (Para bater com o DTO do Back-end)
            const payload = {
                funcionario_id: Number(dados.funcionario_id), 
                projeto_id: Number(dados.projeto_id),         
                data_alocacao: new Date(dados.data_alocacao), // @IsDate (@Type(() => Date))
                horas_trabalhadas: Number(dados.horas_trabalhadas) 
            };

            if (!payload.funcionario_id || !payload.projeto_id) {
                throw new Error("Selecione um funcionário e um projeto.");
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alocacoes`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 const err = await response.json();
                 const msg = Array.isArray(err.message) ? err.message.join("\n- ") : err.message;
                 throw new Error(msg || "Erro ao realizar alocação");
            }

            alert("Alocação realizada com sucesso!");
            return true;

        } catch (error) {
            console.error(error);
            if (error instanceof Error) alert(error.message);
            else alert("Erro desconhecido.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const buscarAlocacoesDoProjeto = async (projetoId: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alocacoes/projeto/${projetoId}`);
            
            if (!response.ok) {
                throw new Error("Erro ao buscar alocações do projeto");
            }

            const data = await response.json();
            setAlocacoesProjeto(data);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar lista de alocações.");
            setAlocacoesProjeto([]); // Limpa em caso de erro
        } finally {
            setLoading(false);
        }
    };

    const atualizarHorasAlocacao = async (funcionarioId: number, projetoId: number, novasHoras: number) => {
        try {
            const payload = { horas_trabalhadas: novasHoras };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/alocacoes/funcionario/${funcionarioId}/projeto/${projetoId}`, 
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                 const err = await response.json();
                 throw new Error(err.message || "Erro ao atualizar horas.");
            }

            // ATUALIZAÇÃO OTIMISTA (Atualiza a lista na tela sem chamar o backend de novo)
            setAlocacoesProjeto((prev) => 
                prev.map((item) => 
                    item.funcionario_id === funcionarioId 
                        ? { ...item, horas_trabalhadas: novasHoras } 
                        : item
                )
            );

            return true;

        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar horas.");
            return false;
        }
    };

    const removerAlocacao = async (funcionarioId: number, projetoId: number) => {
        const confirmou = window.confirm("Tem certeza que deseja remover este funcionário do projeto?");
        if (!confirmou) return false;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/alocacoes/funcionario/${funcionarioId}/projeto/${projetoId}`, 
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                 const err = await response.json();
                 throw new Error(err.message || "Erro ao remover alocação.");
            }

            // ATUALIZAÇÃO OTIMISTA: Remove o item da lista visualmente
            setAlocacoesProjeto((prev) => 
                prev.filter((item) => item.funcionario_id !== funcionarioId)
            );

            return true;

        } catch (error) {
            console.error(error);
            alert("Erro ao remover alocação.");
            return false;
        }
    };
    return { registrarAlocacao, buscarAlocacoesDoProjeto, atualizarHorasAlocacao, removerAlocacao, loading, alocacoesProjeto };
}