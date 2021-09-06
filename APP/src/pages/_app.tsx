import { Header } from "../components/Header/Index";
import { Player } from "../components/Player/Index"
import "../styles/global.scss"
import styles from "../styles/app.module.scss"
import { PlayerContextProvider } from "../contexts/PlayerContext";
import { CadProvider } from "../contexts/Cad_servContext";

import { AuthProvider } from '../contexts/AuthContext'


function MyApp({ Component, pageProps }) {

  return (

    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header {...pageProps} />
          <AuthProvider>
            <CadProvider>
              <Component {...pageProps} />
            </CadProvider>
          </AuthProvider>
        </main>
        <Player />
      </div>
    </PlayerContextProvider>

  )
}

export default MyApp
