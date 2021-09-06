import { Request, Response } from "express"
import { ApagaHorarioServices } from "../services/ApagaHorarioServices"

class ApagaHorarioController {

    async handle(request: Request, response: Response) {
        var msg;
        const { id } = request.body

        const apagaHorarioServices = new ApagaHorarioServices();

        const apagaHorario = await apagaHorarioServices.execute(id);

        return response.json(apagaHorario);

    }

}
export { ApagaHorarioController }