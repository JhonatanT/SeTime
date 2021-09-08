import styles from './home.module.scss'
import './home.module.scss'
import { useContext, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'
import { getAPIClient } from '../../services/axios'
import { CadProvider, Cad_servContext } from "../../contexts/Cad_servContext";
import id from 'date-fns/esm/locale/id/index.js'

type user = {
  id: string;
  usuario: string;
}

type CadastroProps = {
  usuario: user
}


export default function Cadastrar_Serv(CadastroProps) {

  const { register, handleSubmit } = useForm();
  const { Cadserv } = useContext(Cad_servContext)


  async function handleSign(data) {
    try {
      await Cadserv(data)
    }
    catch (e) {
      console.log(e.response)
    }

  }

  return (

    <div className={styles.pageauth}>

      <main>

        <div className={styles.maincontent}>

          <img src="/agend.png" alt="logo" />

          <div className={styles.separator}>Agende seu Horário {CadastroProps.user.usuario}</div>

          <form onSubmit={handleSubmit(handleSign)} >

            <span>O que deseja fazer: </span><br />

            <select {...register('descricao_pedido')}>
              <option value="S-C">Cortar cabelo (18R$)</option>
              <option value="S-B">Barba (20R$) </option>
              <option value="B-C">Cortar cabelo e fazer a Barba (38R$) </option>

            </select>


            <br />
            <br />

            <span>Data: </span><br />
            <input type="date"
              {...register('data_pedido')}
              placeholder="dia"
              required
            />

            <br />
            <br />
            <span>Horario (Domingo é até as 14H): </span><br />
            <input type="time" min="09:00" max="18:00" required
              {...register('horario')}
              placeholder="Horario"
            />


            <br />
            <br />

            <span>Preciso de troco (OPCIONAL): </span><br />
            <input
              type="text"
              placeholder="Exemplo: Troco para 20R$"
              {...register('troco')}
            />

            <div className={styles.input_inv}>
              <input type="text" onChange
                {...register('nome_cliente')}
                placeholder="nome_cliente"
                value={CadastroProps.user.usuario}
              />
              <input type="text" onChange
                {...register('FK_ID_usu')}
                placeholder="id_usu"
                value={CadastroProps.user.id}
              />
            </div>

            <button className={styles.createroom}>
              <img src="/logoAg.png" alt="Agendar" />
              Agendar
            </button>
          </form>
        </div>

      </main>
    </div>

  )
}



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

  const { ['SetTimeid']: id } = parseCookies(ctx);

  const { data } = await apiClient.get('/users/ListUserbyId', { data: { id: id } });


  //mapeando o array que vem do BD para tratar os dados antes de exibilos, como datas, horarios etc
  const usuario = {
    id: data.user.id,
    usuario: data.user.usuario

  }


  return {
    //returnar sempre props, pois a função ja espera um return props
    props: {
      user: usuario
    }

  }
}

