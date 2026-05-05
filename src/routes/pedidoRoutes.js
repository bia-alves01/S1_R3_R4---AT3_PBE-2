import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";
const pedidosRoutes = Router();


pedidosRoutes.post('/', pedidoController.criar);
pedidosRoutes.get('/', pedidoController.selecionar);
pedidosRoutes.post('/:id/itens', pedidoController.adicionarItem);
pedidosRoutes.put('/:pedidoId/itens/:itemId', pedidoController.editarItem);
pedidosRoutes.delete('/:pedidoId/itens/:itemId', pedidoController.excluirItem);
pedidosRoutes.put('/:pedidoId/status', pedidoController.editarStatus);

export default pedidosRoutes;