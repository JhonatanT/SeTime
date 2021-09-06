import { type } from "os";
import { createContext, useState, ReactNode } from "react";
import { api } from "../services/api";
import Swal from 'sweetalert2'
import { getAPIClient } from "../services/axios";

type Client = {
    id: string;

    FK_ID_usu: string;

    nome_cliente: string;

    descricao_pedido: string;

    D_Convert: string;

    preco: string;

    Precos_convert: string;

    data_pedido: string;

    DT_pedido: string;

    horario: string;

    troco: string;
}

//passando o play da função q esta no app.tsx para conseguir acessar do arquivo index da pages
type PlayerContextData = {
    clientDadosList: Client[]
    currentClientIndex: number;
    SelClient: (client: Client) => void
    ConDel: (
        ID_horario: string,
        FK_ID_usu: string,
        nome_cliente: string,
        descricao_pedido: string,
        preco: string,
        data_pedido: string,
        horario: string,
        troco: string,
        concluido,
        opcao: Number,) => void;

}

type PlayerContextProviderProps = {
    children: ReactNode;
}

//não precisa ser um valor real, é usado mais para definir o tipo de dados que vamos receber
//fazendo uma atribuição do objeto PlayerContextData "forçada" para falar que o objeto PlayerContext tem a estrutura do PlayerContextData mesmo não tendo
//para que quando eu importar esse objeto e for desestruturar ele ja entende tudo que eu preciso
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    //quando é uma variavel q vai refletir no designer precisa ser uma variavel State, no react
    const [clientDadosList, setClientList] = useState([]);
    const [currentClientIndex, setCurrentClientIndex] = useState(0);


    function SelClient(client: Client) {
        setClientList([client]);
        setCurrentClientIndex(0);
    }


    //essa função faz o concluir e concelar da API, ela recebe os dados que precisa por parametro diretamente da index pages e index Player
    //virifica qual opção que vem se for 1 conclui o pedido se n cancela
    function ConDel(ID_horario, FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco, concluido, opcao) {

        if (opcao == 1) {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Deseja Concluir esse pedido",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            }).then((result) => {
                if (result.isConfirmed) {

                    const datas = {
                        ID_horario: ID_horario,
                        FK_ID_usu: FK_ID_usu,
                        nome_cliente: nome_cliente,
                        descricao_pedido: descricao_pedido,
                        preco: preco,
                        data_pedido: data_pedido,
                        horario: horario,
                        troco: troco,
                        concluido: concluido
                    }

                    api.post('/historico', datas);

                    api.delete('/users/apagaHorario', {
                        data: {
                            id: ID_horario
                        }
                    });
                    Swal.fire(
                        'Concluido!',
                        'Esse Pedido foi concluido',
                        'success'
                    )
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            });
        }
        else {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Que deseja cancelar esse pedido",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            }).then((result) => {
                if (result.isConfirmed) {

                    const del = api.delete('/users/apagaHorario', {
                        data: {
                            id: ID_horario
                        }
                    });
                    Swal.fire(

                        'Deletado',
                        'Esse Pedido foi deletado',
                        'success'
                    )
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            })

        }
    }

    return (
        <PlayerContext.Provider
            value={{
                clientDadosList,
                currentClientIndex,
                SelClient,
                ConDel
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}