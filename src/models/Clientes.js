export class Cliente {
    #idCliente;
    #nome;
    #cpf;
    #dataCad;

    constructor(pIdCliente, pNome, pCpf){
        this.idCliente = pIdCliente;
        this.nome = pNome;
        this.cpf = pCpf;
    }

    //Métodos acessores - GETTERS e SETTERS
    get idCliente (){
        return this.#idCliente;
    }
    set id(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get nome (){
        return this.#nome;
    }

    set nome(value){
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(value){        
        this.#validarCpf(value);
        this.#cpf = value;
    }

    //Métodos auxiliares
    #validarIdCliente(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarNome(value){
        if(!value || value.trim().length < 3 || value.trim().length > 45){
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }
    #validarCpf(value){
        if(!value || isNaN(value)){
            throw new Error('O campo CPF é obrigatória e deve ser um número válido');
        }
    }
    // Criação de objetos utilizando o Design Pattern FACTORY METHOD
    static criar(dados){
        console.log(dados.idCliente, dados.nome, dados.cpf);
        
        return new Cliente(dados.idCliente, dados.nome, dados.cpf, null);
    }
    // static alterar(dados, idCliente){        
    //     return new Cliente(dados.idCliente, dados.nome, dados.cpf, null);
    // }
}