
import Image from 'next/image'
import style from './clients.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { api } from '../../services/api';
import { format, parseISO } from 'date-fns';
import { convertFormatPreco } from '../../components/utils/convertFormatPreco';
import { convertDescricao } from '../../components/utils/convertDescricao';
import ptBR from 'date-fns/locale/pt-BR'
import { URLSearchParams } from 'url';
import Link from 'next/link'


//seria o msm q o interface o resultado é o msm
type Cliente_Marcado = {

    id: string;

    FK_ID_usu: string;

    nome_cliente: string;

    descricao_pedido: string;

    D_Convert: string;

    preco: string;

    Precos_convert: string;

    DT_pedido: string;

    horario: string;

    troco: string;
}

type HomeProps = {
    Clients: Cliente_Marcado;//outra forma de declar um array seria 'Array<Cliente_Marcado>' 
}

//o nome da Pasta é o nome da rota e o nome do arquivo ele recebe o id enviado[parametro dinamico] apos clicar em qualquer cliente, ou seja http://localhost:3000/ClientsSelect/ ID selecionado
export default function ClientsSelect({ Clients }: HomeProps) {
    //recebo o ID enviado da 'Link href={`/ClientsSelect/${cliente.id}`}' para buscar as informações desse ID 
    const router = useRouter();//só pode ser usado dentro de componente
    //retorno um HTML
    return (
        <div className={style.client}>
            <div className={style.thumbCont}>
                <Link href="/">
                    <button type="button">
                        <Image width={24} height={24} objectFit="cover" src="/voltar.png" alt="Voltae" />
                    </button>
                </Link>
                <header>

                    <h1>{Clients.nome_cliente}</h1><br />

                    <span>Descrição: </span><br />
                    <input disabled type="text" placeholder={Clients.D_Convert} /><br /><br />

                    <span>Data:</span><br />
                    <input disabled type="text" placeholder={Clients.DT_pedido} /><br /><br />

                    <span>Horario:</span><br />
                    <input disabled type="text" placeholder={Clients.horario} /><br /><br />

                    <span>Preço:</span><br />
                    <input disabled type="text" placeholder={Clients.preco} /><br /><br />

                    <span>Troco:</span><br />
                    <input disabled type="text" placeholder={Clients.troco} /><br /><br />

                    <button type="button"> <Image width={24} height={24} objectFit="cover" src="/check.svg" alt="Pedido Concluido" /> </button>
                    <button type="button"> <Image width={24} height={24} objectFit="cover" src="/delete.svg" alt="Cancelar Pedido" /> </button>
                </header>

            </div>
        </div>
    )
}

//toda rota q seja com parametro dinamico precisamos do getStaticPaths
//ele informa no momento da build quais telas ele tem q gerar de forma estatica
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        //aqui eu posso passar o 'id' q eu quero para gerar uma pagina estatica
        paths: [],
        //client(browser) - nextjs(node) - server(back-end)
        //fallback é para saber oq fazer quando o usuario acessar uma pagina que n foi gerada de forma estatica 
        //false ele n gera nenhuma tela estatica q n tenha sido informada no paths
        //true ele busca os dados q o usuario esta buscando, para criar uma pagina estatica do cliente selecionado no caso, mas é executado pelo lado do cliente (Browser)
        //blocking ele busca os dados q o usuario esta buscando, para criar uma pagina estatica do cliente selecionado no caso, porem é gerado pelo nextjs

        fallback: 'blocking'

    }
}

//recebendo o o id pelo parametro (ctx)
export const getStaticProps: GetStaticProps = async (ctx) => {

    // é slug pq é o nome do arquivo 
    const { slug } = ctx.params;//para obter o slug ou seja o id que o slug esta returnando, recebemos po parametro 

    const id = { id: slug }

    const { data } = await api.get(`/users/HorarioSelected/`, { data: { id } });

    const Clients = {

        id: data.id,

        FK_ID_usu: data.FK_ID_usu,

        nome_cliente: data.nome_cliente,

        descricao_pedido: data.descricao_pedido,

        D_Convert: convertDescricao(data.descricao_pedido),

        preco: Number(data.preco),

        //criei um classe na pasta utils para formatar o preco SOMENTE EXEMPLO
        Precos_convert: convertFormatPreco(Number(data.preco)),

        DT_pedido: format(parseISO(data.data_pedido), 'd MMM yy', { locale: ptBR }),

        horario: data.horario,

        troco: data.troco,
    };


    return {
        props: {
            Clients,
        },
        revalidate: 60 * 60 * 24,//24hrs

    }
}

