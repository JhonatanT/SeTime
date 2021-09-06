import { useContext } from 'react';

import styles from './styles.module.scss';
import Image from 'next/image'
import { PlayerContext, PlayerContextProvider } from '../../contexts/PlayerContext';
import { parseCookies } from 'nookies';
import { PegaUsu } from '../../contexts/AuthContext';
import { response } from 'express';
import { type, userInfo } from 'os';


export function Player() {

    const { clientDadosList, currentClientIndex, ConDel, SelClient } = useContext(PlayerContext);
    let value = false;
    const client = clientDadosList[currentClientIndex];
    const { ['SetTimeadm']: admin } = parseCookies();

    switch (admin) {
        case "false": {
            value = false;
            break;
        }
        case "true": {
            value = true;
            break;
        }
    }

    if (value) {
        return (
            <div className={styles.playerContainer}>
                <header>
                    <img src="/horarios.png" alt="Horário Selecionado" />
                    <strong>Horário Selecionado</strong>
                </header>

                {//se client n estiver nulo então mostra a parte vazia
                    client ? (
                        <div className={styles.currentClient}>

                            <div className={styles.title}>
                                <span>{client.nome_cliente}</span><br />
                            </div>
                            <span>Descrição: </span><br />
                            <input disabled type="text" placeholder={client.D_Convert} /><br /><br />

                            <span>Data:</span><br />
                            <input disabled type="text" placeholder={client.DT_pedido} /><br /><br />

                            <span>Horario:</span><br />
                            <input disabled type="text" placeholder={client.horario} /><br /><br />

                            <span>Preço:</span><br />
                            <input disabled type="text" placeholder={client.Precos_convert} /><br /><br />

                            <span>Troco:</span><br />
                            <input disabled type="text" placeholder={client.troco} /><br /><br />
                            <div className={styles.buttons}>

                                <button type="button" onClick={() => ConDel(client.id, client.FK_ID_usu, client.nome_cliente, client.descricao_pedido, client.preco, client.data_pedido, client.horario, client.troco, true, 1)}>
                                    <Image width={24} height={24} objectFit="cover" src="/check.svg" alt="Pedido Concluido" />
                                </button>

                                <button type="button" onClick={() => ConDel(client.id, client.FK_ID_usu, client.nome_cliente, client.descricao_pedido, client.preco, client.data_pedido, client.horario, client.troco, false, 0)}>
                                    <Image width={24} height={24} objectFit="cover" src="/delete.svg" alt="Cancelar Pedido" />
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyPlayer}>
                            <strong> Selecione um Cliente Agendado </strong>
                        </div>
                    )
                }
                <footer></footer>

            </div>
        );
    }
    else {
        if (!value) {
            return (
                <div>


                </div>
            );
        }
    }
}