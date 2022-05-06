const fs = require ('fs')
const path = require ('path')

const tipoClientePreco = require('./tipoClientePreco')
const Hotel = require ("./hotel")

class repositorioHotel {
    constructor (databasePath = './database.json') {
        this.databasePath = databasePath
    }

    buscarHoteis() {
        var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.databasePath)))

        if(data.hotel == undefined){
            return []
        }
        
        return data.hotel.map((item) => {
            const regular = new tipoClientePreco(item.regular.diaSemana, item.regular.finalSemana)
            const rewards = new tipoClientePreco(item.reward.diaSemana, item.reward.finalSemana)
            return new Hotel(item.nome, item.avaliacao, regular, rewards)
        })
    }
}

module.exports = repositorioHotel