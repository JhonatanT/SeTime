import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getCustomRepository } from "typeorm"
import { HorariosRepositories } from "../repositories/HorariosRepositories"



//criando interface para desestruturação 
interface IHorarioRequest {
    FK_ID_usu: string;

    nome_cliente: string;

    descricao_pedido: string;

    preco: Number;

    data_pedido: Date;

    horario: string;

    troco: string;
}


//FALTA FAZER ESSAS DUAS COISAS
//de 30 em 30 minutos para cada cliente
//FAZER COM QUE O RELOGIO MOSTRE APENAS HORARIOS DISPONIVEIS

class CreateHorarioService {
    //desestruturando a interface que recebemos do request
    async execute({ FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco }: IHorarioRequest) {

        //instaciando a classe repositories para poder acessar a tabela de horario
        const horariosRepositories = getCustomRepository(HorariosRepositories);

        //verificando se o usuario esta preenchido se não veio vazio 
        if (!FK_ID_usu && !nome_cliente && !descricao_pedido && !preco && !data_pedido && !horario) {
            throw new Error("Incorrect Name");
        }

        //pesquisando se na tabela de horario ja existe um nome cliente ja cadastrado
        const horarioAlreadyExists = await horariosRepositories.findOne({
            FK_ID_usu
        });

        //caso exista retorna esse throw
        if (horarioAlreadyExists) {
            throw new Error("Você já tem um horario Cadastrado");
        }

        const horario_HOR = await horariosRepositories.find({
            horario
        });


        for (let i = 0; i < horario_HOR.length; i++) {
            const data_cad = format(horario_HOR[i].data_pedido, 'y-MM-dd');

            if (horario_HOR[i].horario && data_cad) {
                throw new Error('horario agendado')
            }
        }

        const currentDate = format(new Date(), 'y-MM-dd', {
            locale: ptBR,
        });

        const data_hoje = currentDate

        if (String(data_pedido) < data_hoje) {
            throw new Error('data invalida')
        }

        //criando uma instacia do objeto para inserir no bd
        const hor = horariosRepositories.create({
            FK_ID_usu,
            nome_cliente,
            descricao_pedido,
            preco,
            data_pedido,
            horario,
            troco
        });

        //passando o objeto para classe
        await horariosRepositories.save(hor);

        //recuperando os dados salvos
        return hor;
    }

}
export { CreateHorarioService }