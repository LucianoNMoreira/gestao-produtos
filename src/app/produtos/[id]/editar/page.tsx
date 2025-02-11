import { atualizarProduto } from '@/app/lib/actions'
import Produto from '@/db/models/produto'

export default async function Pagina({ params }: any) {
    const { id } = await params

    const produto = await Produto.findById(id)

    return (
        <>
            <h1>Atualizar produto</h1>

            <form action={atualizarProduto}>
                <input type='hidden' name='id' value={id} />
                <div>
                    <label htmlFor='nome'>Nome do produto</label>
                    <input
                        id='nome'
                        name='nome'
                        type='text'
                        defaultValue={produto.nome}
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