import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
    usuario: string;
    senha: string;
    admin?: boolean; //opcional por isso o ? na frente

}
class CreateUserService {
    //admin = false é atribuir um valor default para caso não venha preenchido
    async execute({ usuario, senha, admin = false }: IUserRequest) {
        //instaciando a classe repositories para poder acessar a tabela de usuario
        const usersRepository = getCustomRepository(UsersRepositories);

        //verificando se o usuario esta preenchido se não veio vazio 
        if (!usuario) {
            throw new Error("User Incorrect");

        }

        //pesquisando na tabela se o usuario ja existe
        const usersAlreadyExists = await usersRepository.findOne({
            usuario,
        })

        //caso ele exista mostra essa msg
        if (usersAlreadyExists) {
            throw new Error("User already exists");
        }

        //criptografando a senha do usuario, o 8 é o tamanho da criptografia, valor padrao
        const SenhaHash = await hash(senha, 8);

        //criando uma instacia do objeto para inserir no bd
        const user = usersRepository.create({
            usuario,
            senha: SenhaHash,//para inserir o valor dentro desse campo (nome do campo: valor que deseja) OPCIONAL (somente se o valor que sera salvo seja um valor alterado)
            admin
        });

        //passando o objeto para classe
        await usersRepository.save(user);

        //recuperando o usuario salvo
        return user;
    }

}
export { CreateUserService }