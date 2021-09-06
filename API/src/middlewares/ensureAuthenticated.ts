import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //recebe o token logado
    const authToken = request.headers.authorization;

    //verificando se o token está preenchido
    if (!authToken) {
        return response.status(401).json({ message: "token invalid" });
    }

    //separando o token pelo espaço transformando em um array, a primeira posição ele ignora a 2 vai para variavel token
    const [, token] = authToken.split(" ");

    //verificando se o token é valido ou não usando a função da biblioteca jsonwebtoken
    try {
        //criei uma interface com um atributo chamado sub que é do tipo string, e abaixo forçamos com que o nosso verify seja do tipo IPayload para que returne o atributo 
        //em string ao invez de uma função isso pq a função ja retorna uma string estamos somente mudando o formato, isso é graças ao typescript
        const { sub } = verify(token, "c094a4ad8a548c26dd6957247edde900") as IPayload;

        request.user_id = sub;

        return next();
    }
    catch (err) {
        return response.status(401).json({ message: "token não autorizado" });
    }


}