import { Router } from "express";
import LivroController from "./controllers/livroController";

const routes = Router();

routes.post("/livros", new LivroController().create);

routes.get("/livros", new LivroController().get);

routes.put("/livros/:id", new LivroController().update);

routes.delete("/livros/:id", new LivroController().delete);
export default routes;
