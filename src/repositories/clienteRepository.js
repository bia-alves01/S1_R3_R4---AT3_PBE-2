import { connection } from "../configs/Database.js";

const clienteRepository = {
    criar: async (cliente) => {
        try {
         // const connection = await pool.getConnection();
            await connection.beginTransaction();

            //Clientes        
            const sqlCliente = 'INSERT INTO clientes (nome, cpf ) VALUES (?,?);';
                    const valuesClientes = [cliente.nome, cliente.cpf ];
                    const [rowsClientes] = await connection.execute(sqlCliente, valuesClientes);

            const sqlEndereco = 'INSERT INTO enderecos (idCliente, logradouro, numero, complemento, bairro, cidade, uf, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
            const valuesEndereco = [rowsClientes.insertId, Endereco.logradouro, Endereco.numero, Endereco.complemento, Endereco.bairro, endereco.cidade, endereco.uf, endereco.cep];
            const [rowsEnderecos] = await connection.execute(sqlEndereco, valuesEndereco);

            const sqlTelefones = 'INSERT INTO telefones (idTelefone, idCliente, telefone '

            connection.commit();
            return {rowsClientes, rowsEnderecos, rowsTelefones
            }
        } catch (error) {
            connection.rollback()
            throw error
        }
    },

}


//     criar: async (cliente) => {
        
//         const sql = 'INSERT INTO clientes (idCliente, nome, cpf ) VALUES (?,?,?);';

// const clienteRepository = {
//     selecionar: async () => {
//          const sql = 'SELECT * FROM clientes;';
//          const [rows] = await connection.execute(sql);
//          return rows;
//     },
//     editar: async (cliente) => {
//         console.log(cliente.idCliente, cliente.nome, cliente.cpf);
        
//         const sql = 'UPDATE clientes SET idCliente=?, nome=?, cpf=? WHERE idCliente=?;';
//         const values = [cliente.idCliente, cliente.nome, cliente.cpf];
//         const [rows] = await connection.execute(sql, values);
//         return rows;
//     },
//     deletar: async (id) => {
//         const sql = 'DELETE FROM clientes WHERE Id = ?;';
//         const values = [id];
//         const [rows] = await connection.execute(sql, values);
//         return rows;                                                         
//     },           

//}

export default clienteRepository;