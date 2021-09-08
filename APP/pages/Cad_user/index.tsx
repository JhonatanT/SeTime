import styles from './home.module.scss'
import './home.module.scss'
import { useContext, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'

export default function Cadastrar() {

  const { register, handleSubmit } = useForm();
  const { Cad } = useContext(AuthContext)



  async function handleSign(data) {
    if (data.usuario == '' || data.senha == '' || data.senha2 == '') {
      return (
        Swal.fire(
          'Todos os campos DEVEM SER PREENCHIDOS',
          'Algum campo esta vazio',
          'error'
        )
      )
    }
    try {
      await Cad(data);
    }
    catch (e) {
      if (e.request.response == '{"error":"User already exists"}') {
        return (
          Swal.fire(
            'Usuario já existe',
            'O usuario que tentou se cadastrar ja existe, é um usuario por pessoa',
            'error'
          )
        )
      }
      else {
        return (
          Swal.fire(
            'ALGO DEU ERRADO',
            'Algo deu errado, aperte F5 ou atualize a pagina, se o problema persistir entre em contato com um ADMIN',
            'error'
          )
        )
      }

    }
  }

  return (
    <div className={styles.pageauth}>

      <main>
        <div className={styles.maincontent}>
          <img src="/registo.png" alt="logo" />

          <form onSubmit={handleSubmit(handleSign)} >
            <input
              {...register('usuario')}
              type="text"
              placeholder="Usuario"
            />
            <br />
            <br />
            <input
              {...register('senha')}
              type="password"
              placeholder="Senha"
            />

            <br />
            <br />

            <input
              {...register('senha2')}
              type="password"
              placeholder="Repetir a senha"
            />
            <button className={styles.createroom}>
              <img src="/logoR.png" alt="Cadastrar" />
              Cadastrar
            </button>
          </form>
          <div className={styles.separator}>Preencha os dados acima</div>
        </div>
      </main>
    </div>

  )
}


