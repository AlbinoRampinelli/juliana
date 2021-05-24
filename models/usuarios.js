const conexao = require('../infraestrutura/conexao');
const moment = require('moment');
const brypt = require('bcrypt');

    class Usuarios {

    adiciona(usuario,resposta) {
        const dataCriacao = moment().format('YYYY-MM-DD HH-MM-SS')
        const data = dataCriacao;
        const usuarioDatado = {...usuario, dataCriacao, data}

            const sql = 'INSERT INTO Usuarios SET ?'

            conexao.query(sql, usuarioDatado, (erro, resultados) => {

            if(erro) {
                resposta.status(400).json(erro)
            }else {
                resposta.status(201).json(resultados)
            }
            return;
        });
 
    }
    buscarPorEmail(email, resposta) {

        conexao.query('SELECT * FROM Usuarios WHERE email =?', [email], (erro, resultados) => {
            if(erro) {return resposta.status(500).send({erro: erro })}
            if(resultados.length < 1){ 
                return resposta.status(401).send({ message: 'Falha na autenticação !!'})}
            });
        
    }

    lista(resposta) {
        const sql = 'SELECT * FROM Cadastramentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                resposta.status(400).json(erro)
            } else {
                resposta.status(200).json(resultados)
            }
        
        })
    }

    buscaPorId(id, resposta) {
        const sql = `SELECT * FROM Cadastramentos WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                resposta.status(400).json(erro)
            } else {
                resposta.status(200).json(atendimento)
            }
        
        });
            
    }
 
    altera(id, valores, resposta) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM--DD HH:MM:SS');
        }
        const sql = 'UPDATE Cadastramentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                resposta.status(400).json(erro)
            } else {
                resposta.status(200).json({...valores, id})
            }
        

        });

    }

    deleta(id, resposta) {
        const sql = 'DELETE FROM Cadastramentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                resposta.status(400).json(erro);
            } else {
                resposta.status(200).json({id});
            }
    
        })
    }
}

module.exports = new Usuarios;