const fs = require ('fs')
const path = require ('path')

const TipoClientePreco = require('./tipoClientePreco')
const Hotel = require ("./hotel")

class RepositorioHotel {
    constructor (databasePath = '../database.json') {
        this.databasePath = databasePath
    }

    fetchHotels() {
        var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.databasePath)))

        if(data.hotels == undefined){
            return []
        }
        
        return data.hotels.map((item) => {
            const regular = new TipoClientePreco(item.regular.weekday, item.regular.weekend)
            const rewards = new TipoClientePreco(item.rewards.weekday, item.rewards.weekend)
            return new Hotel(item.nome, item.avaliacao, regular, rewards)
        })
    }
}

module.exports = RepositorioHotel