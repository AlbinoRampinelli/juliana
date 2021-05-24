const moment = require('moment');
const conexao = require('../infraestrutura/conexao')

class Cadastramento {
    adiciona(cadastramento, resposta) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(cadastramento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = cadastramento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data', 
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Nome do Cliente deve ter pelo menos 5 caracters'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            resposta.status(400).json(erros);
        } else {
            const cadastramentoDatado = {...cadastramento, dataCriacao, data}
            const sql = 'INSERT INTO Cadastramentos SET ?'

            conexao.query(sql, cadastramentoDatado, (erro, resultado) => {
            if(erro) {
                resposta.status(400).json(erro)
            }else {
                resposta.status(201).json(cadastramento)
            }
        
        })

        }  
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

module.exports = new Cadastramento;