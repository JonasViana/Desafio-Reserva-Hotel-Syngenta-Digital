class Erros {
    static tipoClienteInvalido(){
        return new Error('Cliente inválido')
    }

    static dataInvalida(){
        return new Error('Data inválida')
    }

    static hotelInvalido(){
        return new Error('Hotel inválido')
    }
}

module.exports = Erros