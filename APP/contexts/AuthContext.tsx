//Classe que faz a atenticação do usuario
import { createContext, useState } from "react"
import { api } from "../services/api";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { useEffect } from "react";
import Swal from 'sweetalert2'
import { Player } from "../components/Player/Index";
type User = {
    id: string,
    usuario: string,
    admin: boolean
}

type LogarType = {
    usuario: string;
    senha: string;
}
type CadType = {
    usuario: string;
    senha: string;
    senha2: string;
}

type AuthContextType = {
    isAthenticated: boolean;
    user: User;
    Logar: (data: LogarType) => Promise<void>;
    Cad: (data: LogarType) => Promise<void>;
}


//dados que vou receber do usuario


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {

    const [user, setUser] = useState<User | null>(null);

    const isAthenticated = !user;

    useEffect(() => {

        const { 'SetTimetoken': token } = parseCookies();

        if (token) {
            //criar uma função que retorna os dados do usuario logado a partir desse id
            const { 'SetTimeid': id_usu } = parseCookies();

            //essa função tinha que pegar os dados do usuario pelo token, porem eu n sei ainda
            PegaUsu(id_usu).then(response => setUser(response.user));
        }
    }, [])


    async function Logar({ usuario, senha }: LogarType) {

        const { data } = await api.post('/login', {
            usuario: usuario,
            senha: senha
        });


        setCookie(undefined, 'SetTimetoken', data.token, {
            maxAge: 30 * 30 * 1,//30min
        })

        setCookie(undefined, 'SetTimeid', data.user.id, {
            maxAge: 30 * 30 * 1,//30min
        })

        setCookie(undefined, 'SetTimeadm', data.user.admin, {
            maxAge: 30 * 30 * 1,//30min
        })

        api.defaults.headers.authorization = `Bearer ${data.token}`

        setUser(data.user);


        if (data.user.admin == true) {
            setCookie(undefined, 'SetTimerota', '/PainelAdmin', {
                maxAge: 30 * 30 * 1,//30min
            })
            Router.push('/PainelAdmin');
        }
        else {

            const data = await api.get(`/users/Horariobyid`);

            if (data.data.length == 0) {
                setCookie(undefined, 'SetTimerota', '/Cadastrar_Serv', {
                    maxAge: 30 * 30 * 1,//30min
                })
                Router.push('/Cadastrar_Serv');
            }
            else {
                setCookie(undefined, 'SetTimerota', '/ServMarc', {
                    maxAge: 30 * 30 * 1,//30min
                })
                Router.push('/ServMarc',);
            }
        }



    }


    async function Cad({ usuario, senha, senha2 }: CadType) {

        console.log(usuario, senha, senha2);

        if (senha == senha2) {
            const datas = {
                usuario: usuario,
                senha: senha,
                admin: false
            }
            const Cadas = api.post('/users', datas);

            console.log(Cadas)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cadastrado com Sucesso',
                showConfirmButton: false,
                timer: 2000
            })

            setTimeout(() => {
                Router.push('/');
            }, 2000);
        }
        else {
            Swal.fire(
                'Senha Incorreta',
                'As senhas estão diferentes',
                'error'
            )
        }
    }





    return (
        <AuthContext.Provider value={{ user, isAthenticated, Logar, Cad }}>
            {children}
        </AuthContext.Provider>
    )
}


//essa função tinha que pegar os dados do usuario pelo token, porem eu n sei ainda
export async function PegaUsu(id) {

    const { data } = await api.get(`/users/ListUserbyId`, { data: { id: id } });

    return {

        user: {
            usuario: data.user.usuario,
            id: data.user.id,
            admin: data.user.admin
        }
    }
}
