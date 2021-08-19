import { Response, Request } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {

    async handle(request: Request, response: Response) {

        const { usuario, senha } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({
            usuario,
            senha
        });

        return response.json(token);
    }

}
export { AuthenticateUserController }