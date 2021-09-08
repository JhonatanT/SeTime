

import styles from './home.module.scss'
import './home.module.scss'
import { useContext, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import Swal from 'sweetalert2'

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { Logar } = useContext(AuthContext)

  async function handleSign(data) {


    if (data.usuario == '' || data.senha == '') {

      return (
        Swal.fire(
          'Todos os campos DEVEM SER PREENCHIDOS',
          'Algum campo esta vazio',
          'error'
        )
      )

    }

    //lugar onde mostra se falhou a autenticação ou n
    try {
      await Logar(data)
    }
    catch (e) {
      if (e.request.response == '{"error":"Usuario/Senha Incorrect"}') {
        return (
          Swal.fire(
            'Usuario ou senha INCORRETOS',
            'O usuario ou senha digitado estão(a) incorretos',
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

    };
  }

  const { ['SetTimerota']: rota } = parseCookies();
  if (rota) {
    if (rota == '/PainelAdmin') {
      destroyCookie(undefined, 'SetTimerota');
      destroyCookie(undefined, 'SetTimeid');
      destroyCookie(undefined, 'SetTimetoken');
      destroyCookie(undefined, 'SetTimeadm');
      Router.push('/');
    }
    Router.push(rota);
    return (
      <div>
        <p>LOGADO</p>
      </div>
    )
  }
  else {
    destroyCookie(undefined, 'SetTimerota');
    return (
      <div className={styles.pageauth}>

        <main>
          <div className={styles.maincontent}>
            <img src="/login.png" alt="logo" />

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
              <button className={styles.createroom}>
                <img src="/entrar.png" alt="Logo Entrar" />
                Entrar
              </button>
            </form>
            <div className={styles.separator}><a href="/Cad_user">Caso não tenha uma conta, Crie</a></div>
          </div>
        </main>
      </div>
    )
  }
}



