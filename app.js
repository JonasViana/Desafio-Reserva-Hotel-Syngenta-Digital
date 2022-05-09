const InputHandler = require("./src/inputUsuarioVerificacao");
const CalculadoraDeReservas = require("./src/calculadoraDeReservas");

class App {

    constructor() {
        this.inputHandler = new InputHandler();
        this.calculator = new CalculadoraDeReservas();
    }

    run() {
        const stdin = process.openStdin();
        const standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        console.log("#### Calculadora de preços ####\n");
        this.showMenu();
        standard_input.on('data', function (data) {
            if (data.toLowerCase() == "s\n") {
                process.exit();
            }
            this.cheaperHotel(data)
            this.showMenu();
        }.bind(this));
    }

    cheaperHotel(data) {

        try {
            let input = this.inputHandler.extractValues(data);
            console.log("output:" + this.calculator.cheaperPrice(input.clientType, input.dates))
            return this.calculator.cheaperPrice(input.clientType, input.dates)
        } catch(error) {
            console.log(error.message)
        }
    }

    showMenu() {
        console.log("--------------------------------");
        console.log("Digite os dados da reserva e pressione enter");
    }
}

const app = new App()
app.run();

module.exports = App
