const App = require('../app');

function getCheapestHotel (calculadoraDeReservas) { 

    const AppObj = new App;
    const resultado = AppObj.cheaperHotel(calculadoraDeReservas)

    return resultado
}

exports.getCheapestHotel = getCheapestHotel