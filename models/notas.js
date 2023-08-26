const Sequelize = require('sequelize');
const db = require ('./db');

const Notas = db.define('notas',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    aluno: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nota1: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    nota2: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    nota3: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    nota4: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    media: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
}, {
    timestamps: false
});

//Notas.sync();
module.exports = Notas;