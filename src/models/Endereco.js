export class Endereco {
    #idEndereco; 
    #idCliente;  
    #uf;  
    #cep; 
    #logradouro;  
    #numero;  
    #complemento;  
    #cidade; 
    #bairro; 

    constructor(pIdCliente, pUf ,pCep, pLogradouro, pNumero, pComplemento ,pCidade, pBairro, pIdEndereco){
        this.idEndereco = pIdEndereco;
        this.idCliente = pIdCliente;
        this.uf = pUf;
        this.cep = pCep;
        this.logradouro = pLogradouro;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.cidade = pCidade;
        this.bairro = pBairro;
    }

    //Métodos acessores - GETTERS e SETTERS
    get idEndereco (){
        return this.#idEndereco;
    }
    set idEndereco(value){
        this.#validarIdEndereco(value);
        this.#idEndereco = value;
    }

    get idCliente (){
        return this.#idCliente;
    }

    set idCliente(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get uf(){
        return this.#uf;
    }
    set uf(value){        
        this.#validarUf(value);
        this.#uf = value;
    }

    get cep(){
        return this.#cep;
    }
    set cep(value){        
        this.#validarCep(value);
        this.#cep = value;
    }

    get logradouro(){
        return this.#logradouro;
    }
    set logradouro(value){        
        this.#validarLogradouro(value);
        this.#logradouro = value;
    }

    get numero(){
        return this.#numero;
    }
    set numero(value){        
        this.#validarNumero(value);
        this.#numero = value;
    }

    get complemento(){
        return this.#complemento;
    }
    set complemento(value){        
        this.#validarComplemento(value);
        this.#complemento = value;
    }

    get bairro(){
        return this.#bairro;
    }
    set bairro(value){        
        this.#validarBairro(value);
        this.#bairro = value;
    }

    //Métodos auxiliares
    #validarIdEndereco(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarIdCliente(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }

    #validarUf(value) {
        if (value.length !== 2) throw new Error("UF inválida");
    }

    #validarCep(value) {
        console.log(value);
        
        if (!/^[0-9]{8}$/.test(value)) 
        throw new Error("CEP inválido");
    }

    #validarLogradouro(value) {
        if (!value) throw new Error("Logradouro obrigatório");
    }

    #validarNumero(value) {
        if(!value || isNaN(value)){
            throw new Error('O campo número é obrigatória e deve ser um número válido');
        }
    }

    #validarComplemento(value) {
        // opcional
    }

    #validarBairro(value) {
        if (!value) {
        throw new Error("Bairro obrigatório");
    }
}
    // Criação de objetos utilizando o Design Pattern FACTORY METHOD
    static criar(dados){
        return new Endereco(null, dados.uf, dados.cep, dados.logradouro, dados.numero, dados.complemento, dados.cidade, dados.bairro, null);
    }
}