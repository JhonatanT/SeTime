import { Request, Response } from "express"
import { ListHorarioByIDService } from "../services/ListHorarioByIDService"

class ListHorarioByIDController {

    async handle(request: Request, response: Response) {

        const { id } = request.body;

        const listHorarioByIDService = new ListHorarioByIDService();

        const Hor_by_id = await listHorarioByIDService.execute(id);

        return response.json(Hor_by_id);

    }

}
export { ListHorarioByIDController }