const database = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].findAll({ where : { ... where } })
    }

    async pegaUmRegistro(id){
        return database[this.nomeDoModelo].findOne({ where : { id : id } })
    }

    async criaRegistro(dados){
        return database.Pessoas.create(dados)
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { id: id } }, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}){
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({ where : { id : id } })
    }

    async restauraRegistro(id){
        return database[this.nomeDoModelo].restore({ where : { id : id } })
    }
}

module.exports = Services