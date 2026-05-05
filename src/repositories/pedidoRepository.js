import { connection } from "../configs/Database.js";

const pedidoRepository = {
    selecionar: async (idPedido) => {
        const conn = await connection.getConnection();
        try {

            const sql = `
                SELECT *
                FROM pedidos AS p
                    INNER JOIN clientes AS c
                ON p.ClienteId = c.idCliente  
                    INNER JOIN itens_pedidos AS i
                ON i.pedidoId = p.id;`;

            const [rows] = await connection.execute(sql);
            return rows;

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },
    criar: async (pedido, itens) => {

        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            //Insert Pedido       
            const sqlPed = 'INSERT INTO pedidos (ClienteId, subTotal, status ) VALUES (?,?, ?);';
            const valuesPed = [pedido.clienteId, pedido.subTotal, pedido.status];
            const [rowsPed] = await conn.execute(sqlPed, valuesPed);

            //Insert Itens_Pedidos
            for (const item of itens) {
                const sqlItens = 'INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);';
                const valuesItens = [rowsPed.insertId, item.produtoId, item.quantidade, item.valorItem];
                await conn.execute(sqlItens, valuesItens);
            }

            await conn.commit();
            return { rowsPed }
        } catch (error) {
            conn.rollback()
            throw error
        }
        finally {
            conn.release();
        }
    },
    adicionarItem: async (req, res) => {
        try {
            const { pedidoId } = req.params;
            const { produtoId, quantidade, valorItem } = req.body;

            const item = ItensPedido.criar({ produtoId, quantidade, valorItem });

            const valorTotalItem = item.quantidade * item.valorItem;

            const result = await pedidoRepository.adicionarItem(pedidoId, item, valorTotalItem);

            res.status(200).json({ data: result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    buscarPorId: async (pedidoId) => {
        const conn = await connection.getConnection();
        try {
            const sql = `SELECT * FROM pedidos WHERE id = ?;`;
            const [rows] = await conn.execute(sql, [pedidoId]);
            return rows[0] || null;

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    editarItem: async (pedidoId, itemId, quantidade) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            quantidade = Number(quantidade);

            if (!quantidade || quantidade <= 0) {
                throw new Error("Quantidade inválida");
            }

            const sqlBuscar = `
            SELECT * FROM itens_pedidos WHERE id = ? AND PedidoId = ?;
        `;

            const [rows] = await conn.execute(sqlBuscar, [itemId, pedidoId]);

            if (rows.length === 0) {
                throw new Error("Item não encontrado neste pedido");
            }

            const sqlUpdateItem = `
            UPDATE itens_pedidos
            SET Quantidade = ?
            WHERE id = ? AND PedidoId = ?;
        `;

            await conn.execute(sqlUpdateItem, [
                quantidade,
                itemId,
                pedidoId
            ]);

            const sqlUpdatePedido = `
            UPDATE pedidos
            SET subTotal = COALESCE((
                SELECT SUM(Quantidade * ValorItem)
                FROM itens_pedidos
                WHERE PedidoId = ?
            ), 0)
            WHERE id = ?;
        `;

            await conn.execute(sqlUpdatePedido, [pedidoId, pedidoId]);

            await conn.commit();

            return {
                pedidoId,
                itemId,
                quantidadeAtualizada: quantidade
            };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    editarStatus: async (pedidoId, status) => {
        const conn = await connection.getConnection();

        try {
            const sql = `
            UPDATE pedidos
            SET status = ?
            WHERE id = ?;
        `;

            const [result] = await conn.execute(sql, [status, pedidoId]);

            if (result.affectedRows === 0) {
                throw new Error("Pedido não encontrado");
            }

            return {
                pedidoId,
                statusAtualizado: status
            };

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }

}

export default pedidoRepository;
