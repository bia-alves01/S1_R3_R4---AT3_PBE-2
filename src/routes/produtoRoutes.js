import { Router } from "express";
import produtoController from "../controllers/ProdutoController.js";
import uploadImage from "../middleware/uploadImage.middleware.js";

const produtoRoutes = Router();

produtoRoutes.get('/', produtoController.selecionar);
produtoRoutes.post('/', uploadImage, produtoController.criar);
produtoRoutes.put('/:id', produtoController.editar);
produtoRoutes.delete('/:id', produtoController.deletar);

export default produtoRoutes;