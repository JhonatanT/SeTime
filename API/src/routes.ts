import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateHorarioController } from "./controllers/CreateHorarioController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { CreateHistoricoController } from "./controllers/CreateHistoricoController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListHistoricoByUserController } from "./controllers/ListHistoricoByUserController";
import { ListHorarioByUserController } from "./controllers/ListHorarioByUserController";
import { ListHorariosConcluidosController } from "./controllers/ListHorariosConcluidosController";
import { ListHorarioAllController } from "./controllers/ListHorarioAllController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ApagaHorarioController } from "./controllers/ApagaHorarioController";
import { ListHorarioByIDController } from "./controllers/ListHorarioByIDController";
import { ListUserControllerById } from "./controllers/ListUserControllerById";


const router = Router();

const createUserController = new CreateUserController();
const createHorarioController = new CreateHorarioController();
const authenticateUserService = new AuthenticateUserController();
const createHistoricoController = new CreateHistoricoController();
const listHistoricoByUserController = new ListHistoricoByUserController();
const listHorarioByUserController = new ListHorarioByUserController();
const listHorariosConcluidosController = new ListHorariosConcluidosController();
const listHorarioAllController = new ListHorarioAllController();
const listUsersController = new ListUsersController();
const apagaHorarioController = new ApagaHorarioController();
const listHorarioByIDController = new ListHorarioByIDController();

const listUserControllerById = new ListUserControllerById();




//ensureAdmin é o middlewares que faz a autenticação para ver se o user é admin ou não
//ensureAuthenticated é o middlewares que faz a autenticação para ver se o usuario esta logado

//POSTS
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserService.handle);
router.post("/historico", ensureAuthenticated, ensureAdmin, createHistoricoController.handle);//PRECISA DE AUTENTICAÇÃO e ensureAdmin
router.post("/horario", ensureAuthenticated, createHorarioController.handle);

//GETS
router.get("/users/Concluidos", ensureAuthenticated, ensureAdmin, listHorariosConcluidosController.handle);//PRECISA DE AUTENTICAÇÃO
router.get("/users/Pendentes", ensureAuthenticated, ensureAdmin, listHorarioAllController.handle);//PRECISA DE AUTENTICAÇÃO
router.get("/users/Historicobyid", ensureAuthenticated, listHistoricoByUserController.handle);
router.get("/users/Horariobyid", ensureAuthenticated, listHorarioByUserController.handle);
router.get("/users/ListUserAll", ensureAuthenticated, ensureAdmin, listUsersController.handle);
router.get("/users/HorarioSelected", ensureAuthenticated, listHorarioByIDController.handle);//PRECISA DE AUTENTICAÇÃO
router.get("/users/ListUserbyId", ensureAuthenticated, listUserControllerById.handle);//PRECISA DE AUTENTICAÇÃO

//DELETES
router.delete("/users/apagaHorario", ensureAuthenticated, ensureAdmin, apagaHorarioController.handle);//PRECISA DE AUTENTICAÇÃO

export { router }