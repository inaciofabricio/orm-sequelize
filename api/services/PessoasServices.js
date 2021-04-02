const Services =  require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({ where: { ...where }  })
    }

    async pegaTodosRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({ where: { ...where }  })
    }

    async cancelaPessoaEmatricula(estudanteId){
        return database.sequelize.transaction(async transacao => { 
            await super.atualizaRegistro({ ativo: false }, { estudante_id: estudanteId }, { transaction: transacao })
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId } , { transaction: transacao })
        })
    }
}

module.exports = PessoasServices