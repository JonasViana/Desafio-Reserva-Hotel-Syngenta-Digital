class Erros {
    static tipoClienteInvalido(){
        return new Erro('Cliente inválido')
    }

    static dataInvalida(){
        return new Erro('Data inválida')
    }

    static hotelInvalido(){
        return new Errs('Hotel inválido')
    }
}

module.exports = Erros