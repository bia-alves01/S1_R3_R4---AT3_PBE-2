import { connection } from "../configs/Database.js";

const pedidoRepository = {
    // selecionar: async (idCliente) => {
    //     const conn = await connection.getConnection();
    //     try {

    //         const sql = `
    //             SELECT 
    //                 *
    //             FROM clientes as c
    //             INNER JOIN telefones AS t
    //                 ON c.idCliente = t.idCliente
    //             INNER JOIN enderecos AS e
    //                 ON c.idCliente = e.idCliente;`;

    //         const [rows] = await connection.execute(sql);
    //         return rows;

    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         conn.release();
    //     }
    // },
    criar: async (pedido, itens) => {
        
        console.log("Teste: ", pedido.clienteId, pedido.subTotal, pedido.status);
        
        
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            
            //Insert Pedido       
            const sqlPed = 'INSERT INTO pedidos (ClienteId, subTotal, status ) VALUES (?,?, ?);';
            const valuesPed = [pedido.clienteId, pedido.subTotal, pedido.status];
            const [rowsPed] = await conn.execute(sqlPed, valuesPed);
            
            //Insert Itens_Pedidos
            itens.forEach(async item => {
                console.log("Teste: ", rowsPed.insertId, item.produtoId, item.quantidade, item.valorItem);
                const sqlItens = 'INSERT INTO itens_pedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?,?,?,?);';
                const valuesItens = [rowsPed.insertId, item.produtoId, item.quantidade, item.valorItem];
                await conn.execute(sqlItens, valuesItens); 
            });

            await conn.commit();
            return { rowsPed}
        } catch (error) {
            conn.rollback()
            throw error
        }
        finally {
            conn.release();
        }
    }
    // editar: async (cliente, endereco, telefone) => {
    //     const conn = await connection.getConnection();
    //     try {
    //         await conn.beginTransaction();

    //         const sqlCliente = 'UPDATE clientes SET nome=?, cpf=? WHERE idCliente=?';
    //         await conn.execute(sqlCliente, [
    //             cliente.nome ?? null,
    //             cliente.cpf ?? null,
    //             cliente.idCliente
    //         ]);

    //         const sqlTelefone = 'UPDATE telefones SET telefone=? WHERE idCliente=?';

    //         //verifica se realmente existe antes de acessar 
    //         const numeroTelefone = telefone?.telefone?.[0];

    //         //Só atualizará se realmente tiver um número de telefone existente 
    //         if (numeroTelefone) {
    //             await conn.execute(sqlTelefone, [
    //                 numeroTelefone,
    //                 cliente.idCliente
    //             ]);
    //         }

    //         if (endereco) {
    //             const sqlEndereco = `UPDATE enderecos SET logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=?, cep=? WHERE idCliente=?
    //         `;
    //         //Atualiza o endereço e garante que nenhum valor seja undefined, evitando erro no MYSQL e possibilitando qualquer valor ser nulo(campos opcionais)
    //             await conn.execute(sqlEndereco, [
    //                 endereco.logradouro ?? null,
    //                 endereco.numero ?? null,
    //                 endereco.complemento ?? null,
    //                 endereco.bairro ?? null,
    //                 endereco.cidade ?? null,
    //                 endereco.uf ?? null,
    //                 endereco.cep ?? null,
    //                 cliente.idCliente
    //             ]);
    //         }

    //         await conn.commit();

    //         return { message: 'Cliente atualizado com sucesso!' };

    //     } catch (error) {
    //         await conn.rollback();
    //         throw error;
    //     } finally {
    //         conn.release();
    //     }
    // },
    // deletar: async (idCliente) => {
    //     const conn = await connection.getConnection();
    //     try {
    //         await conn.beginTransaction();

    //         await conn.execute('DELETE FROM telefones WHERE idCliente = ?', [idCliente]);
    //         await conn.execute('DELETE FROM enderecos WHERE idCliente = ?', [idCliente]);
    //         await conn.execute('DELETE FROM clientes WHERE idCliente = ?', [idCliente]);

    //         await conn.commit();
    //         return { message: "Cliente deletado com sucesso!" };

    //     } catch (error) {
    //         await conn.rollback();
    //         throw error;
    //     } finally {
    //         conn.release();
    //     }
    // }
}

export default pedidoRepository;
