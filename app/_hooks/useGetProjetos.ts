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

    return { projetos, loading, error, deleteProjeto, recarregar: fetchData}
}