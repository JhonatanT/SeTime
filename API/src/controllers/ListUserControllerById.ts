import { Response, Request } from "express";
import { ListUserByIdService } from "../services/ListUserByIdService";

class ListUserControllerById {

    async handle(request: Request, response: Response) {

        const { id } = request.body;

        const listUserByIdService = new ListUserByIdService();

        const ListUserC = await listUserByIdService.execute(id);

        return response.json(ListUserC);

    }

}
export { ListUserControllerById }