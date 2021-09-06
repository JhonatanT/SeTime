//sobreescrevendo as tipagens da biblioteca express para adionar a variavel user_id que recebera o id do usuario logado
declare namespace Express {
    //ele vai pegar tudo que tem dentro do node_modules (@types/express/index.d.ts) toda tipagem mais oq vamos passar a baixo
    export interface Request {
        user_id: string;
    }

}

// em tsconfig tem que especificar onde fica em "typeRoots": ["./src/@types"],, para o ts config validar tudo que está aqui