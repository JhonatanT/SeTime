import Router from 'next/router'
import { setCookie } from 'nookies';
import { createContext, ReactNode } from "react";
import Swal from "sweetalert2";
import { api } from "../services/api";

type Cad_servico = {
    FK_ID_usu: string;
    nome_cliente: string;
    descricao_pedido: string;
    data_pedido: string;
    horario: string;
    troco: string;
}

type Cad_servContexts = {
    Cadserv: (data: Cad_servico) => Promise<void>;
}

export const Cad_servContext = createContext({} as Cad_servContexts);

export function CadProvider({ children }) {

    async function Cadserv({ FK_ID_usu, nome_cliente, descricao_pedido, data_pedido, horario, troco }: Cad_servico) {

        let preco = '';

        switch (descricao_pedido) {
            case "S-C": {
                preco = '18';
                break;
            }
            case "S-B": {
                preco = '20';
                break;
            }
            case "B-C": {
                preco = '38';
                break;
            }

            default: {
                preco;
                break;
            }
        }


        const datas = {
            FK_ID_usu: FK_ID_usu,
            nome_cliente: nome_cliente,
            descricao_pedido: descricao_pedido,
            preco: preco,
            data_pedido: data_pedido,
            horario: horario,
            troco: troco
        }
        try {
            const { data } = await api.post('/horario', datas);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cadastrado com Sucesso',
                showConfirmButton: false,
                timer: 2000
            })

            setCookie(undefined, 'SetTimerota', '/ServMarc', {
                maxAge: 30 * 30 * 1,//30min
            })

            setTimeout(() => {
                Router.push('/ServMarc');
            }, 2000);
        }
        catch (err) {
            console.log(err.request.response)
            if (err.request.response == '{"error":"data invalida"}') {
                Swal.fire(
                    'Data Inválida',
                    'Somente data de hoje para frente',
                    'error'
                )
            }
            else if (err.request.response == '{"error":"horario agendado"}') {
                Swal.fire(
                    'Horário já está ocupado',
                    'Escolha um horário de 10 ou mais minutos para frente',
                    'error'
                )
            }
            else {
                Swal.fire(
                    'ALGO DEU ERRADO',
                    'Algo deu errado, aperte F5 ou atualize a pagina, se o problema persistir entre em contato com um ADMIN',
                    'error'
                )
            }
        }

    }

    return (
        <Cad_servContext.Provider value={{ Cadserv }}>
            {children}
        </Cad_servContext.Provider>
    )

}

