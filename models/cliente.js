const db = require('../db/sequelize');

const Clientes = db.sequelize.define("clientes",{
    nome: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    bairro: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.TEXT
    },
    estado: {
      type: db.Sequelize.TEXT
    }
});

//Clientes.sync({force: true});

module.exports = Clientes