const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const conexao = require('../infraestrutura/conexao');

module.exports = app => {
    app.get('/', (requisicao, resposta) => {
        Usuario.lista(resposta);

    });

    app.get('/cadastramentos/:id', (requisicao, resposta) => {
            const id = parseInt(requisicao.params.id);
            Cadastramento.buscaPorId(id, resposta)

    });

    app.post('/auth/register', (requisicao, resposta, proximo) => {
        const dadosRecebidos = requisicao.body;
        bcrypt.hash(requisicao.body.senha, 12, (errBcrypt, hash) => {
            if(errBcrypt) {return resposta.status(500).send({ error: errBcrypt })};
            dadosRecebidos.senha = hash;
            Usuarios.adiciona(dadosRecebidos, resposta); 
        });
        
    });


    app.post('/auth/login', (requisicao, resposta, proximo) => {
        const sql = `SELECT * FROM Usuarios WHERE email =?`;
    
        conexao.query(sql, [requisicao.body.email], (error, resultado) => {
            if(error) {return resposta.status(500).send({ error: error }) }
            if(resultado.length < 1){ 
                return resposta.status(403).send({ message: 'Falha na autenticação !!'})
            }
        
            bcrypt.compare(requisicao.body.senha, resultado[0].senha, (err, result) => {
                if(err) { 
                    return resposta.status(401).send({ message: 'Falha na autenticação !!'})
                }
                if(result){
                    return resposta.status(200).send({ message: 'Autenticado com Sucesso  !!'})
                }
                return resposta.status(402).send({ message: 'Falha na autenticação !!'})
            });
        });
    });


    app.patch('/cadastramentos/:id', (requisicao, resposta) => {
        const id = parseInt(requisicao.params.id);
        const valores = requisicao.body;
        Cadastramento.altera(id, valores, resposta) 
    });

    app.delete('/cadastramentos/:id', (requisicao, resposta) => {
        const id = parseInt(requisicao.params.id);
        Cadastramento.deleta(id, resposta)
    })
}
