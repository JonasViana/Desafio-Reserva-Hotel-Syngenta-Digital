class TipoClientePreco{
    constructor(diaSemana, finalSemana) {
        this.diaSemana = diaSemana
        this.finalSemana = finalSemana
    }

    precoPorData(data){
        if(data.getDay() == 0 || data.getDay() == 6)
        return this.finalSemana
        if(data.getDay() == 1 || data.getDay() == 2 || data.getDay() == 3 || data.getDay() == 4 || data.getDay() == 5)
        return this.diaSemana
    }
}
module.exports = TipoClientePreco