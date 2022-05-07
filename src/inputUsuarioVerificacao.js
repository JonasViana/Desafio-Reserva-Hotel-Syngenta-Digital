const Erros = require ("./erros")
const TipoCliente = require ('./tipoCliente')
const inputUsuario = require("./inputUsuario")

class InputUsuarioVerificacao{
    extractValues(value) {
        if (value == undefined) {
            throw Erros.tipoClienteInvalido()
        }

        const values = value.split(':')
        if(values.length != 2) {
            throw Erros.tipoClienteInvalido()
        }

        const tipoCliente = values [0].trim().toLowerCase()
        if (!TipoCliente.isValid(tipoCliente)){
            throw Erros.tipoClienteInvalido()
        }

        const dataFinal = values[1].split(',').map(item => this.dateFromString(item.trim()))

        if(dataFinal.includes(undefined)){
            throw Erros.dataInvalida()
        }

        return new inputUsuario(tipoCliente, dataFinal)
    }

    dateFromString(value) {
        const dia = parseInt(value.substring(0,2))
        if(dia === undefined || dia === NaN){
            return undefined
        }

        const mes = this.getMes(value.substring(2, 5))
        if( mes === -1) {
            return undefined
        }

        const ano = value.substring(5, 9)
        if(ano === undefined || ano === NaN){
            return undefined
        }

        return new Date(ano, mes, dia)
    }

    getMes(mes){
        let meses = [
            "jan",
            "feb",
            "mar",
            "apr",
            "may",
             "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec"
        ]

        for (var i = 0; i < meses.length; i++){
            if(meses[i] === mes.trim().toLowerCase()){
                return i
            }
        }

        return -1
    }
}

module.exports = InputUsuarioVerificacao
