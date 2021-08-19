import { Request, Response, NextFunction } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    //recuperando o user_id que criamos no ensureAuthenticated, pelo request para conseguir recuperar se é admin ou n
    const { user_id } = request;
    console.log(user_id);

    //instaciando a classe repositories para poder acessar a tabela de usuario
    const userRespositories = getCustomRepository(UsersRepositories);

    //pesquisando na tabela se o usuario existe
    const { admin } = await userRespositories.findOne(user_id);

    //Verificar se oq retornou da tabela é admin ou n

    if (admin) {
        //se for vai para função next, função do express
        return next();
    }

    //caso n seja admin retorna isso
    return response.status(401).json({
        error: "User is not admin",
    });
}