import styles from './home.module.scss'
import './home.module.scss'
import { useContext, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'

export default function Cadastrar() {

  const { register, handleSubmit } = useForm();
  const { Cad } = useContext(AuthContext)



  async function handleSign(data) {


    //lugar onde mostra se falhou a autenticação ou n
    await Cad(data);

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


