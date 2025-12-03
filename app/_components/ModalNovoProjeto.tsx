"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Para recarregar a lista após salvar
}

export default function ModalNovoProjeto({ isOpen, onClose, onSuccess }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        data_inicio: "",
        data_previsao_termino: "",
    });

    if (!isOpen) {
        return null;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const payload = {
                nome: formData.nome,
                descricao: formData.descricao,
                data_inicio: new Date(formData.data_inicio),
                data_previsao_termino: new Date(formData.data_previsao_termino)
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projetos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar projeto");
            }

            alert("Projeto cadastrado com sucesso!")

            setFormData({nome: "", descricao: "", data_inicio: "", data_previsao_termino: ""});

            onSuccess();
            onClose();

        } catch (error) {
            console.log(error)
            alert("Erro ao enviar dados. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Novo Projeto</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input 
                            type="text"
                            required
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded p-2 text-black" 
                            placeholder="Nome do projeto"
                        />
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <input 
                            type="text"
                            required
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded p-2 text-black"
                            placeholder="Breve resumo do projeto" 
                        />
                    </div>
                    {/* Data de inicio */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Data de Inicio</label>
                            <input 
                                type="date"
                                required
                                name="data_inicio"
                                value={formData.data_inicio}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded p-2 text-black" 
                            />
                        </div>
                    </div>
                    {/* Data termino */ }
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Previsão de termino</label>
                            <input 
                                type="date"
                                required
                                name="data_previsao_termino"
                                value={formData.data_previsao_termino}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded p-2 text-black" 
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}