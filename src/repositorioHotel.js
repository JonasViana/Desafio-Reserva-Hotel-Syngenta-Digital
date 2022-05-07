const fs = require ('fs')
const path = require ('path')

const TipoClientePreco = require('./tipoClientePreco')
const Hotel = require ("./hotel")

class RepositorioHotel {
    constructor (databasePath = './database.json') {
        this.databasePath = databasePath
    }

    buscarHoteis() {
        var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.databasePath)))

        if(data.hoteis == undefined){
            return []
        }
        
        return data.hoteis.map((item) => {
            const regular = new TipoClientePreco(item.regular.diaSemana, item.regular.finalSemana)
            const rewards = new TipoClientePreco(item.reward.diaSemana, item.reward.finalSemana)
            return new Hotel(item.nome, item.avaliacao, regular, rewards)
        })
    }
}

module.exports = RepositorioHotel