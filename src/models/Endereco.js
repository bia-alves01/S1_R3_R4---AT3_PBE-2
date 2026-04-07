export class Telefones {
    #idTelefone;
    #idCliente;
    #telefone;


    constructor(pIdTelefone, pidCliente, pTelefone){
        this.idTelefone = pIdTelefone;
        this.idCliente = pidCliente;
        this.telefone = pTelefone;
    }

    //Métodos acessores - GETTERS e SETTERS
    get idTelefones (){
        return this.#idTelefone;
    }
    set id(value){
        this.#validarIdTelefone(value);
        this.#idTelefone = value;
    }

    get idCliente (){
        return this.#idCliente;
    }

    set idCliente(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){        
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    //Métodos auxiliares
    #validarIdTelefone(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarIdCliente(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarTelefone(value){
        if(!value || isNaN(value)){
            throw new Error('O campo telefone é obrigatória e deve ser um número válido');
        }
    }

    // Criação de objetos utilizando o Design Pattern FACTORY METHOD
    static criar(dados){
        console.log(dados.idTelefone, dados.idCliente, dados.telefone);
        
        return new Telefones(dados.idTelefone, dados.nome, dados.telefone, null);
    }
    static alterar(dados, idTelefone){        
        return new Telefones(dados.idTelefone, dados.nome, dados.telefone, null);
    }
}