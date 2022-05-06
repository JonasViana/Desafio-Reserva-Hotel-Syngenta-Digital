const tipoCliente = {
    REWARDS: 'rewards',
    REGULAR: 'regular',

    isValid: function(type){
        return type.toLowerCase() === this.REGULAR || tipoCliente.toLowerCase() === this.REWARDS
    }
}

module.exports = tipoCliente;