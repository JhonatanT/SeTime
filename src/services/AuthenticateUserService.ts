import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"//função dentro da biblioteca para conseguir comparar a senha criptografada
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UserRepositories"


interface IAuthenticateUserService {
    usuario: string;
    senha: string;
}
class AuthenticateUserService {


    async execute({ usuario, senha }: IAuthenticateUserService) {

        //instaciando a classe repositories para poder acessar a tabela de usuario
        const usersRepository = getCustomRepository(UsersRepositories);
        //pesquisando na tabela se o usuario existe
        const usuario_E = await usersRepository.findOne({
            usuario
        });

        //Caso não exista entra no IF
        if (!usuario_E) {
            throw new Error("Usuario/Senha Incorrect");
        }

        //comparando a senha digita com a senha que esta no BD, usando a função da biblioteca bcryptjs
        const senha_compara = await compare(senha, usuario_E.senha);

        if (!senha_compara) {
            throw new Error("Usuario/Senha Incorrect");
        }

        //gerando o token
        const token = sign({
            usuario: usuario_E.usuario,
        }, "c094a4ad8a548c26dd6957247edde900", {//assinatura da criptografia
            subject: usuario_E.id,
            expiresIn: "1d"//tempo de vida do token
        });

        return token;
    }

}

export { AuthenticateUserService }