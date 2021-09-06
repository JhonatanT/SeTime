import { Hidden } from '@material-ui/core';
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';
import { GetStaticProps, GetServerSideProps } from 'next'

type HeaderProps = {
    token: string;
}

export function Header({ token }: HeaderProps) {
    console.log('ARRUMAR O HEADER, FAZER APARECER O USUARIO');
    console.log('DESLOGAR, VERIFICAR SE NO LOGIN,CAD User, CAD Serv estão com todos os campos preechido')
    const currentDate = format(new Date(), 'EEEEEE , d MMMM', {
        locale: ptBR,
    });//formatando a data de hoje utilizando a biblioteca date-fns


    return (
        <header className={styles.headerContainer}>
            <img src="/logo.png" alt="Salão" />

            <p>Salão Laerte</p>

            <h3 className={styles.inv0}>Bem Vindo{token}</h3>

            <span>{currentDate}</span>

        </header>
    );
}
export async function getServerSideProps(ctx) {

    const { ['SetTimeid']: tokens } = parseCookies(ctx);
    console.log(tokens)

    return {
        //returnar sempre props, pois a função ja espera um return props
        props: {
            token: tokens,
        }

    }
}