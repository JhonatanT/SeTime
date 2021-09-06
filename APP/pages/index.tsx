

import styles from './home.module.scss'
import './home.module.scss'
import { useContext, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { Logar } = useContext(AuthContext)

  async function handleSign(data) {

    //lugar onde mostra se falhou a autenticação ou n
    await Logar(data)

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



