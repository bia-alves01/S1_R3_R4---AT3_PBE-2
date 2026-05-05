import { ItensPedido } from "../models/itensPedidos.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";
import { statusPed } from "../enums/statusPedido.js";

const pedidoController = {
    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    criar: async (req, res) => {
        try {
            let { clienteId, itens } = req.body;

            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);
            const pedido = Pedido.criar({ clienteId, subTotal, status: statusPed.ABERTO });

            const result = await pedidoRepository.criar(pedido, itensPedido);
            res.status(201).json({ data: result });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    adicionarItem: async (pedidoId, item, valorTotalItem) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlItem = `INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?);`;

            const valuesItem = [pedidoId, item.produtoId, item.quantidade, item.valorItem];

            await conn.execute(sqlItem, valuesItem);

            const sqlUpdate = `UPDATE pedidos SET subTotal = subTotal + ? WHERE id = ?;
        `;

            await conn.execute(sqlUpdate, [valorTotalItem, pedidoId]);

            await conn.commit();

            return { message: "Item adicionado com sucesso!" };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    editarItem: async (req, res) => {
        try {

            const { pedidoId, itemId } = req.params;
            const { quantidade } = req.body;

            const pedido = await pedidoRepository.buscarPorId(pedidoId);
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }
            const statusPedido = pedido.status.trim().toUpperCase();

            if (statusPedido !== statusPed.ABERTO) {
                    return res.status(400).json({ message: 'Não é possível editar itens de um pedido que não está aberto' });
                }

                const result = await pedidoRepository.editarItem(pedidoId, itemId, quantidade);
                res.status(200).json({ data: result });

            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                });
            }
        },

        excluirItem: async (req, res) => {
            try {
                console.log("PARAMS:", req.params);

                const { pedidoId, itemId } = req.params;

                const pedido = await pedidoRepository.buscarPorId(pedidoId);
                if (!pedido) {
                    return res.status(404).json({ message: 'Pedido não encontrado' });
                }

                if (pedido.status !== statusPed.ABERTO) {
                    return res.status(400).json({ message: 'Não é possível excluir itens de um pedido que não está aberto' });
                }

                const result = await pedidoRepository.excluirItem(pedidoId, itemId);
                res.status(200).json({ data: result });

            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                });
            }
        },

            editarStatus: async (req, res) => {
                try {
                    console.log("PARAMS:", req.params);
                    console.log("BODY:", req.body);

                    const { pedidoId } = req.params;
                    const { status } = req.body;

                    if (!Object.values(statusPed).includes(status)) {
                        return res.status(400).json({ message: `Status inválido. Use: ${Object.values(statusPed).join(', ')}` });
                    }

                    const pedido = await pedidoRepository.buscarPorId(pedidoId);
                    if (!pedido) {
                        return res.status(404).json({ message: 'Pedido não encontrado' });
                    }

                    const result = await pedidoRepository.editarStatus(pedidoId, status);
                    res.status(200).json({ data: result });

                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        message: 'Ocorreu um erro no servidor',
                        errorMessage: error.message
                    });
                }

            }

    }

export default pedidoController;