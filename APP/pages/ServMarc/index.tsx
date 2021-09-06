import styles from './home.module.scss'
import React, { useContext, FormEvent } from 'react'
import { getAPIClient } from '../../services/axios'
import Image from 'next/image'
import { convertDescricao } from '../../components/utils/convertDescricao'
import { convertFormatPreco } from '../../components/utils/convertFormatPreco'
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { PlayerContext } from '../../contexts/PlayerContext'
type Cliente_Marcado = {

  id: string;

  FK_ID_usu: string;

  nome_cliente: string;

  descricao_pedido: string;

  D_Convert: string;

  Precos_convert: string;

  DT_pedido: string;

  horario: string;

  troco: string;
}



type HomeProps = {
  Clients: Cliente_Marcado;//outra forma de declar um array seria 'Array<Cliente_Marcado>' 
}

export default function Cadastrar_Serv({ Clients }: HomeProps) {
  console.log(Clients)
  const { ConDel, SelClient } = useContext(PlayerContext);

  return (

    <div className={styles.pageauth}>

      <main>

        <div className={styles.maincontent}>

          <img src="/agendado.png" alt="logo" />

          <div className={styles.separator}>Horário agendado de {Clients.nome_cliente}</div>
          <div className={styles.client}>
            <div className={styles.thumbCont}>
              <header>

                <span>Descrição: </span><br />
                <input disabled type="text" placeholder={Clients.D_Convert} /><br /><br />

                <span>Data:</span><br />
                <input disabled type="text" placeholder={Clients.DT_pedido} /><br /><br />

                <span>Horario:</span><br />
                <input disabled type="text" placeholder={Clients.horario} /><br /><br />

                <span>Preço:</span><br />
                <input disabled type="text" placeholder={Clients.Precos_convert} /><br /><br />

                <span>Troco:</span><br />
                <input disabled type="text" placeholder={Clients.troco} /><br /><br />

                <button type="button" onClick={() => ConDel(Clients.id,
                  Clients.FK_ID_usu,
                  Clients.nome_cliente,
                  Clients.descricao_pedido,
                  Clients.Precos_convert,
                  Clients.DT_pedido,
                  Clients.horario,
                  Clients.troco, false, 0)}>
                  <p>Cancelar Pedido </p>
                </button>
              </header>

            </div>
          </div>

        </div>

      </main>
    </div>

  )
}

export async function getServerSideProps(ctx) {

  const apiClient = getAPIClient(ctx);

  const { data } = await apiClient.get(`/users/Horariobyid`);

  const Clients = {

    id: data[0].id,

    FK_ID_usu: data[0].FK_ID_usu,

    nome_cliente: data[0].nome_cliente,

    descricao_pedido: data[0].descricao_pedido,

    D_Convert: convertDescricao(data[0].descricao_pedido),

    //criei um classe na pasta utils para formatar o preco SOMENTE EXEMPLO
    Precos_convert: convertFormatPreco(Number(data[0].preco)),

    DT_pedido: format(parseISO(data[0].data_pedido), 'd MMM yy', { locale: ptBR }),

    horario: data[0].horario,

    troco: data[0].troco,
  };
  return {
    props: {
      Clients,
    },
  }
}

