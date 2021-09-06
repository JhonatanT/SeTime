import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { classToPlain } from "class-transformer"


class ListUserByIdService {
    async execute(user_id: string) {

        //instaciando a classe repositories para poder acessar a tabela de usuario
        const usersRepository = getCustomRepository(UsersRepositories);
        //pesquisando na tabela se o usuario existe
        const usuario_E = await usersRepository.findOne(user_id);


        const user = {
            id: usuario_E.id,
            usuario: usuario_E.usuario,
            admin: usuario_E.admin
        }


        return { user };
    }
}
export { ListUserByIdService }