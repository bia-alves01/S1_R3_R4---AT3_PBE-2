//import { Cliente } from "../models/";
//import clienteRepository from "../repositories/clienteRepository.js";
import axios from "axios";
import clienteRepository from "../repositories/clienteRepository.js";

 const clienteController = {
    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error.message });
        }
    },
    criar: async (req, res) => {
        try {
            const { nome, cpf, telefones, cep, numero, complemento} = req.body;
            const cepRegex = /^[0-9]{8}$/;
            if(!cepRegex.test(cep)){
                return res.status(400).json({message: 'Verifique o cep informado!'});
            }

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            if (respApi.data.erro) {
                throw new Error('Erro ao consultar o cep na API');
            }
            console.log(respApi.data);

            //const cliente = cliente.criar({ nome, descricao });
            //const result = await clienteRepository.criar(cliente);
            res.status(201).json({ data: respApi.data });
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error.message });
        }
    },
    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCategoria, nome, valor } = req.body;
            
            if (!idCategoria || !nome || !valor || !id || idCategoria <= 0 || nome.lenght < 3 || Number(valor) <= 0 || id <= 0 ) {
                return res.status(400).json({ message: 'Verifique os dados enviados' });
            }

            const produto = Produto.alterar({ idCategoria, nome, valor }, id);

            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error.message });
        }
    },

 }

export default clienteController;