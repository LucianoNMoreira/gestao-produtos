'use client'

import axios from "axios";
import { useState } from "react";

export default function Pagina() {
    const [formData, setFormData] = useState({ key: "", name: "" })

    const cadastrarProduto = async (ev: any) => {
        ev.preventDefault()
        const produto = await axios.post('http://localhost:3000/api/v1/produtos', formData)
        console.log('Produto cadastrado', produto.data)
        window.location.href = '/'
    }

    const onChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <>
            <h1>Cadastrar novo produto</h1>

            <form onSubmit={cadastrarProduto}>
                <div>
                    <label htmlFor='nome'>Nome do produto</label>
                    <input
                        id='nome'
                        name='nome'
                        type='text'
                        onChange={onChange}
                        autoFocus={true}
                    />

                    <label htmlFor='valor'>Valor do produto</label>
                    <input
                        id='valor'
                        name='valor'
                        type='number'
                    />

                    <label htmlFor='estoque'>Estoque do produto</label>
                    <input
                        id='estoque'
                        name='estoque'
                        type='number'
                    />
                </div>

                <button>Salvar</button>

            </form>
        </>
    )
}