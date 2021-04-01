const database = require('../models')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
      try {
        const todasAsTurmas = await database.Turmas.findAll()
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params
        try {
            const pegaUmaTurma = await database.Turmas.findOne({ where : { id : Number(id) } })
            return res.status(200).json(pegaUmaTurma)    
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async criaTurma(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaTurma = await database.Turmas.create(novaPessoa)
            return res.status(201).json(novaPessoaTurma)    
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, { where : { id : Number(id) } })
            const turmaAtualizada = await database.Turmas.findOne({ where : { id : Number(id) } })
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy({ where : { id : Number(id) } })
            return res.status(200).json({ mensagem: `id: ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)

        }
    }
}


module.exports = TurmaController