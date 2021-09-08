import { GetStaticProps, GetServerSideProps } from 'next'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertFormatPreco } from '../../components/utils/convertFormatPreco'
import styles from './home.module.scss'
import { convertDescricao } from '../../components/utils/convertDescricao'
import { useContext } from 'react'
import { PlayerContext, PlayerContextProvider } from '../../contexts/PlayerContext'
import { AuthContext } from '../../contexts/AuthContext'
import { parseCookies } from 'nookies'
import { getAPIClient } from '../../services/axios'



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

  data_pedido: string;

  horario: string;

  troco: string;

  algo_Custom: string;
}

type HomeProps = {
  latestClients: Cliente_Marcado[];//outra forma de declar um array seria 'Array<Cliente_Marcado>'
  AllClients: Cliente_Marcado[];
}
//COLUNAS PARA SEREM LISTADAS
//nome_cliente C1
//descricao_pedido C2
//data_pedido C3
//horario C4
//troco C5?

//tudo que eu retorno do props do getServerSideProps é repassado para meu componente
//o map ele percorre algo e returna algo de volta
//usando a biblioteca usando Image da biblioteca next para otimizar imagens
//Link href={`/ClientsSelect/${cliente.id}`} é para enviar para a classe o ID do cliente selecionado usando a biblioteca next/link
export default function PainelAdmin({ latestClients, AllClients }: HomeProps) {

  const { user } = useContext(AuthContext)

  const { ConDel, SelClient } = useContext(PlayerContext);

  return (

    <PlayerContextProvider>

      <div className={styles.homepage}>

        <section className={styles.latestClients}>
          {/* CASO PRECISE EXIBIR O NOME "<p className={styles.separator}>Bem vindo: {user?.usuario}</p>"*/}


          <h2> Últimos Clientes Agendados</h2>

          <ul>
            {latestClients.map(C_pendentes => {

              return (

                <li key={C_pendentes.id}>

                  <div className={styles.ClientsDetails}>

                    <a onClick={() => SelClient(C_pendentes)}>{C_pendentes.nome_cliente}</a>

                    <p>{C_pendentes.D_Convert}</p>

                    <span>{C_pendentes.DT_pedido}</span>

                    <span>{C_pendentes.horario}</span>

                  </div>

                  <button type="button" onClick={() => ConDel(
                    C_pendentes.id,
                    C_pendentes.FK_ID_usu,
                    C_pendentes.nome_cliente,
                    C_pendentes.descricao_pedido,
                    C_pendentes.preco,
                    C_pendentes.data_pedido,
                    C_pendentes.horario,
                    C_pendentes.troco, true, 1, 'admin')}>
                    <Image width={24} height={24} objectFit="cover" src="/check.svg" alt="Pedido Concluido" />
                  </button>

                  <button type="button" onClick={() => ConDel(C_pendentes.id,
                    C_pendentes.FK_ID_usu,
                    C_pendentes.nome_cliente,
                    C_pendentes.descricao_pedido,
                    C_pendentes.preco,
                    C_pendentes.data_pedido,
                    C_pendentes.horario,
                    C_pendentes.troco, false, 0, 'admin')}>
                    <Image width={24} height={24} objectFit="cover" src="/delete.svg" alt="Cancelar Pedido" />
                  </button>
                </li>
              )
            })}
          </ul>

        </section>

        <section className={styles.AllClients}>

          <h2>Todos Clientes Agendados</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>Nome Cliente</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Confirmar</th>
                <th>Cancelar</th>
              </tr>
            </thead>
            <tbody>
              {AllClients.map(cliente => {
                return (

                  <tr key={cliente.id}>
                    {/* PARA ABRIR EM UMA "NOVA TELA, JA ESTA TUDO PRONTO POREM NÃO ESTOU USANDO NO PROJETO AINDA" 
                    ---> <td><Link href={`/ClientsSelect/${cliente.id}`}><a>{cliente.nome_cliente}</a></Link></td>*/}

                    <td><a onClick={() => SelClient(cliente)}>{cliente.nome_cliente}</a></td>
                    <td> {cliente.D_Convert} </td>
                    <td style={{ width: 100 }}> {cliente.DT_pedido} </td>
                    <td> {cliente.horario} </td>
                    <td>

                      <button type="button" onClick={() => ConDel(
                        cliente.id,
                        cliente.FK_ID_usu,
                        cliente.nome_cliente,
                        cliente.descricao_pedido,
                        cliente.preco,
                        cliente.data_pedido,
                        cliente.horario,
                        cliente.troco, true, 1, 'admin')}>
                        <Image width={24} height={24} objectFit="cover" src="/check.svg" alt="Pedido Concluido" />
                      </button>

                    </td>
                    <td>

                      <button type="button" onClick={() => ConDel(
                        cliente.id,
                        cliente.FK_ID_usu,
                        cliente.nome_cliente,
                        cliente.descricao_pedido,
                        cliente.preco,
                        cliente.data_pedido,
                        cliente.horario,
                        cliente.troco, false, 0, 'admin')}>
                        <Image width={24} height={24} objectFit="cover" src="/delete.svg" alt="Cancelar Pedido" />
                      </button>

                    </td>
                  </tr>
                )
              })}

            </tbody>

          </table>

        </section>

      </div>
    </PlayerContextProvider>

  )
}

//MODELO SSR DE ABASTECIMENTO DE DADOS DA API COM REACT+NEXT:
//O SSR ele vai executar toda vez que o usuario acessar a pagina, ou seja se 1M de pessoas acessar essa pagina vai fazer 1M de requisições na API
//só de exportar uma função com esse nome 'getServerSideProps', o next já vai entender que ele precisa executar essa função antes de exibir o conteudo desse pagina
export async function getServerSideProps(ctx) {

  const apiClient = getAPIClient(ctx);

  const { ['SetTimetoken']: token } = parseCookies(ctx);


  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data } = await apiClient.get('/users/Pendentes', {
    params: {
      limit: 12,//não esta funcionando esses params
      sort: 'horario',
      order: 'desc'
    }
  });


  //mapeando o array que vem do BD para tratar os dados antes de exibilos, como datas, horarios etc
  const Pendentes = data.map(pendente => {
    return {

      id: pendente.id,

      FK_ID_usu: pendente.FK_ID_usu,

      nome_cliente: pendente.nome_cliente,

      descricao_pedido: pendente.descricao_pedido,

      D_Convert: convertDescricao(pendente.descricao_pedido),

      preco: Number(pendente.preco),

      //criei um classe na pasta utils para formatar o preco SOMENTE EXEMPLO
      Precos_convert: convertFormatPreco(Number(pendente.preco)),

      DT_pedido: format(parseISO(pendente.data_pedido), 'd MMM yy', { locale: ptBR }),

      data_pedido: pendente.data_pedido,

      horario: pendente.horario,

      troco: pendente.troco,

      algo_Custom: pendente.algo_Custom,

    };
  })

  const latestClients = Pendentes.slice(0, 2); // falando para pegar os 2 ultimos Clientes agendados
  const AllClients = Pendentes.slice(2, Pendentes.length);// falando para pegar todos menos os ultimos 2

  return {
    //returnar sempre props, pois a função ja espera um return props
    props: {
      latestClients,
      AllClients
    }

  }
}
