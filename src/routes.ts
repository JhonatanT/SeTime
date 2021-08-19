import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateHorarioController } from "./controllers/CreateHorarioController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { CreateHistoricoController } from "./controllers/CreateHistoricoController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListHistoricoByUserController } from "./controllers/ListHistoricoByUserController";
import { ListHorarioByUserController } from "./controllers/ListHorarioByUserController";
import { ListHistoricoAllController } from "./controllers/ListHistoricoAllController";
import { ListHorarioAllController } from "./controllers/ListHorarioAllController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createHorarioController = new CreateHorarioController();
const authenticateUserService = new AuthenticateUserController();
const createHistoricoController = new CreateHistoricoController();
const listHistoricoByUserController = new ListHistoricoByUserController();
const listHorarioByUserController = new ListHorarioByUserController();
const listHistoricoAllController = new ListHistoricoAllController();
const listHorarioAllController = new ListHorarioAllController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);

//ensureAdmin é o middlewares que faz a autenticação para ver se o user é admin ou não
//ensureAuthenticated é o middlewares que faz a autenticação para ver se o usuario esta logado
router.post("/historico", ensureAuthenticated, ensureAdmin, createHistoricoController.handle);
router.post("/horario", ensureAuthenticated, createHorarioController.handle); // não precisa ser admin tirar
router.get("/users/Historicobyid", ensureAuthenticated, listHistoricoByUserController.handle);
router.get("/users/HistoricoAll", ensureAuthenticated, listHistoricoAllController.handle);
router.get("/users/Horariobyid", ensureAuthenticated, listHorarioByUserController.handle);
router.get("/users/HorarioAll", ensureAuthenticated, listHorarioAllController.handle);
router.get("/users/ListUserAll", ensureAuthenticated, listUsersController.handle);
router.post("/login", authenticateUserService.handle);


export { router }