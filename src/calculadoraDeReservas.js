const Erros = require ('./erros')
const TipoCliente = require('./tipoCliente')
const RepositorioHotel = require('./repositorioHotel')

class calculadoraDeReservas {
    
    constructor(hotelRepository = new RepositorioHotel()) {
        this.hotelRepository = hotelRepository
    }

    cheaperPrice(clientType, dates) {
        if(clientType.constructor !== String || clientType == undefined || !TipoCliente.isValid(clientType)) {
            throw Erros.invalidClientType();
        } else if (dates === undefined || dates.constructor !== Array) {
            throw Erros.invalidDates()
        }
        let hotels = this.hotelRepository.fetchHotels();
        if(hotels.length == 0) {
            throw Erros.invalidHotel()
        }
        var cheaperHotel = hotels[0];
        let cheaperPrice = this.calculatePrice(hotels[0], clientType, dates);
        for(var i = 1; i < hotels.length; i++) {
            const currentPrice = this.calculatePrice(hotels[i], clientType, dates);
            if(currentPrice < cheaperPrice) {
                cheaperHotel = hotels[i];
                cheaperPrice = currentPrice;
            } else if(currentPrice === cheaperPrice && cheaperHotel.rating < hotels[i].rating) {
                cheaperHotel = hotels[i];
                cheaperPrice = currentPrice;
            }
        }
        return cheaperHotel.name;
    }
    
    calculatePrice(hotel, clientType, dates) {
        let priceType = this.getPrice(hotel, clientType);
        return dates
        .map((date) => priceType.priceForDate(date))
        .reduce( (accum, curr) => accum + curr );
    }
    
    getPrice(hotel, clientType) {
        if(clientType == TipoCliente.REGULAR) {
            return hotel.regular;
        } else if (clientType == TipoCliente.REWARDS) {
            return hotel.rewards;
        }
    }
}

module.exports = calculadoraDeReservas