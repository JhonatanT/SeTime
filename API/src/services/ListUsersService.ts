import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { classToPlain } from "class-transformer"


class ListUsersService {
    async execute() {

        const usersRepositories = getCustomRepository(UsersRepositories);

        const ListUsers = await usersRepositories.find();

        return classToPlain(ListUsers); //aplicando a alteração da coluna feita na entidade, usando a biblioteca class-transformer
    }
}
export { ListUsersService }