
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR';
import { response } from 'express';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { AuthContext, PegaUsu } from '../../contexts/AuthContext';
import styles from './styles.module.scss';
import Image from 'next/image'


export function Header() {

    const { ['SetTimeid']: id } = parseCookies();

    const currentDate = format(new Date(), 'EEEEEE , d MMMM', {
        locale: ptBR,
    });//formatando a data de hoje utilizando a biblioteca date-fns

    if (id) {
        const { user, Sair } = useContext(AuthContext);

        return (

            <header className={styles.headerContainer}>
                <img src="/logo.png" alt="Salão" />

                <p>Salão Laerte</p>

                <span>{currentDate}</span>

                <p>Sair</p>
                <button type="button" onClick={() => Sair()}>
                    <Image width={24} height={24} objectFit="cover" src="/sair.png" alt="Sair" />
                </button>

            </header>
        );
    }
    else {
        return (
            <header className={styles.headerContainer}>
                <img src="/logo.png" alt="Salão" />

                <p>Salão Laerte</p>

                <span>{currentDate}</span>

            </header>
        );
    }



}
