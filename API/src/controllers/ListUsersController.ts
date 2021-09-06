import { Response, Request } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {

    async handle(request: Request, response: Response) {

        const listUsersService = new ListUsersService();

        const ListUserC = await listUsersService.execute();

        return response.json(ListUserC);

    }

}
export { ListUsersController }