import { useState, useEffect } from "react";

export interface Projeto {
    id: number;
    nome: string;
    descricao: string;
    status: string;
    data_inicio: Date;
    data_previsao_termino: Date;
}

export function useGetProjetos() {
    const [projetos, setProjetos] = useState<Projeto[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projetos`);
            if (!response) {
                throw new Error('Erro ao buscar projetos.')
            }
            const data = await response.json()
            console.log(data);
            setProjetos(data);
        } catch (Error) {
            setError('Falha na comunicação com a API')
            console.error(Error);
        } finally {
            setLoading(false);
        }
    };

    const updateProjeto = async (id: number, dados: Partial<Projeto>) => {
        const { status, ...dadosGerais } = dados;

        const temAtualizacaoDeStatus = !!status;
        const temAtualizacaoGeral = Object.keys(dadosGerais).length > 0;

        try {
            const requisicoes = []

            if (temAtualizacaoGeral) {
                const payloadGeral = {
                    ...dadosGerais,
                    ...(dadosGerais.data_inicio && {
                        data_inicio: new Date(dadosGerais.data_inicio)
                    }),
                    ...(dadosGerais.data_previsao_termino && {
                        data_previsao_termino: new Date(dadosGerais.data_previsao_termino)
                    }),
                };

                requisicoes.push(
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projetos/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payloadGeral), 
                    }).then(async (response) => {
                        if (!response.ok) {
                            const err = await response.json()
                            throw new Error(err.message || "Erro ao atualizar dados do projeto");
                        }
                        return response;
                    })
                );
            }

            if (temAtualizacaoDeStatus) {
                requisicoes.push(
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projetos/${id}/status`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status }),
                    }).then(async (response) => {
                        if (!response.ok) {
                            const err = await response.json();
                            throw new Error(err.message || "Erro ao atualizar status");
                        }
                        return response;
                    })
                );
            }
            
            await Promise.all(requisicoes);

            alert("Projeto atualizado com sucesso!");
            return true;
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Erro desconhecido ao atualizar projeto.")
            }
            return false;
        }
    };

    const deleteProjeto = async (id: number) => {
        const confirm = window.confirm("Tem certeza que quer exluir esse projeto?");
        if (!confirm) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projetos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProjetos((prev) => prev.filter((proj) => proj.id !== id));
                alert("Projeto Excluído!");
            } else {
                alert("Erro ao excluir projeto.")
            }
        } catch (Error) {
            console.log(Error)
        }
    };

    return { projetos, loading, error, deleteProjeto, recarregar: fetchData, updateProjeto}
}