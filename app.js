const InputUsuario = require("./src/inputUsuarioVerificacao");
const CalculadoraDeReservas = require("./src/calculadoraDeReservas");

class App {

    constructor() {
        this.inputHandler = new InputUsuario();
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

    cheaperHotel(dates) {
        try {
            let input = this.inputHandler.extractValues(dates);
            console.log("output:" + this.calculator.cheaperPrice(input.clienteTipo, input.dataFinal))
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