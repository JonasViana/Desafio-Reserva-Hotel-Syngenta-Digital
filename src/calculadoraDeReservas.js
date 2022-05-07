const Erros = require ('./erros')
const TipoCliente = require('./tipoCliente')
const RepositorioHotel = require('./repositorioHotel')

class calculadoraDeReservas {
    
    constructor(repositorioHotel = new RepositorioHotel()) {
        this.repositorioHotel = repositorioHotel
    }
    cheaperPrice(tipoCliente, dates) {
        if(tipoCliente.constructor !== String || tipoCliente == undefined || !TipoCliente.isValid(tipoCliente)) {
            throw Erros.tipoClienteInvalido();
        } else if (dates === undefined || dates.constructor !== Array) {
            throw Erros.dataInvalida()
        }
        let hotels = this.repositorioHotel.fetchHotels();
        if(hotels.length == 0) {
            throw Erros.hotelInvalido()
        }
        var cheaperHotel = hotels[0];
        let cheaperPrice = this.calculatePrice(hotels[0], tipoCliente, dates);
        for(var i = 1; i < hotels.length; i++) {
            const currentPrice = this.calculatePrice(hotels[i], tipoCliente, dates);
            if(currentPrice < cheaperPrice) {
                cheaperHotel = hotels[i];
                cheaperPrice = currentPrice;
            } else if(currentPrice === cheaperPrice &&  cheaperHotel.avaliacao < hotels[i].avaliacao) {
                cheaperHotel = hotels[i];
                cheaperPrice = currentPrice;
            }
        }
        return  cheaperHotel.nome;
    }
    
    calculatePrice(hotel, tipoCliente, dates) {
        let priceType = this.getPrice(hotel, tipoCliente);
        return dates
        .map((date) => priceType.priceForDate(date))
        .reduce( (accum, curr) => accum + curr );
    }
    
    getPrice(hotel, tipoCliente) {
        if(tipoCliente == TipoCliente.REGULAR) {
            return hotel.regular;
        } else if (tipoCliente == TipoCliente.REWARDS) {
            return hotel.rewards;
        }
    }
}

module.exports = calculadoraDeReservas