const Erros = require ('./erros')
const TipoCliente = require('./tipoCliente')
const RepositorioHotel = require('./repositorioHotel')

class calculadoraDeReservas {
    
    constructor(repositorioHotel = new RepositorioHotel()) {
        this.repositorioHotel = repositorioHotel
    }
    
    menorPreco(tipoCliente, dates) {
        if(tipoCliente.constructor !== String || tipoCliente == undefined || !TipoCliente.isValid(tipoCliente)) {
            throw Erros.tipoClienteInvalido();
        } else if (dates === undefined || dates.constructor !== Array) {
            throw Erros.dataInvalida()
        }
        let hotels = this.repositorioHotel.buscarHoteis();
        if(hotels.length == 0) {
            throw Erros.hotelInvalido()
        }
        var hotelMaisBarato = hotels[0];
        let menorPreco = this.calcularPreco(hotels[0], tipoCliente, dates);
        for(var i = 1; i < hotels.length; i++) {
            const precoAtual = this.calcularPreco(hotels[i], tipoCliente, dates);
            if(precoAtual < menorPreco) {
                hotelMaisBarato = hotels[i];
                menorPreco = precoAtual;
            } else if(precoAtual === menorPreco && hotelMaisBarato.avaliacao < hotels[i].avaliacao) {
                hotelMaisBarato = hotels[i];
                menorPreco = precoAtual;
            }
        }
        return hotelMaisBarato.nome;
    }
    
    calcularPreco(hotel, tipoCliente, dates) {
        let tipoPreco = this.getPreco(hotel, tipoCliente);
        return dates
        .map((date) => tipoPreco.precoPorData(date))
        .reduce( (accum, curr) => accum + curr );
    }
    
    getPreco(hotel, tipoCliente) {
        if(tipoCliente == TipoCliente.REGULAR) {
            return hotel.regular;
        } else if (tipoCliente == TipoCliente.REWARDS) {
            return hotel.rewards;
        }
    }
}

module.exports = calculadoraDeReservas