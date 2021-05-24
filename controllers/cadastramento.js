const Cadastramento = require('../models/cadastramentos');

module.exports = app => {
    app.get('/cadastramentos', (requisicao, resposta) => {
        Cadastramento.lista(resposta);

    });

    app.get('/cadastramentos/:id', (requisicao, resposta) => {
            const id = parseInt(requisicao.params.id);
            Cadastramento.buscaPorId(id, resposta)
    });

    app.post('/cadastramentos', (requisicao, resposta) => {
        const atendimento = requisicao.body;
        Cadastramento.adiciona(atendimento, resposta);       
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