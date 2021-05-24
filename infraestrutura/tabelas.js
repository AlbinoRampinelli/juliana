const conexao = require("./conexao");

class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarCadastramentos();
        this.criarUsuarios();

    }
    criarCadastramentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Cadastramentos (id int NOT NULL AUTO_INCREMENT, nomecompleto varchar(50) NOT NULL, cpf varchar(11), email varchar(30) NOT NULL, phone varchar(14) NOT NULL, rg varchar(15) NOT NULL, naturalidade varchar(20) NOT NULL, endereço varchar(50) NOT NULL, cep varchar(9) NOT NULL, logradouro varchar (10) NOT NULL, complemento varchar (10) NOT NULL, bairro varchar (20) NOT NULL, cidade varchar (20) NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id,cpf))';
        
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela cadastro Paciente criada com sucesso !!')
            }
        
        })
    }

    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, nome varchar(100) NOT NULL, email varchar(100) NOT NULL, senha varchar(100) NOT NULL, PRIMARY KEY (id) )';
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuarios criada com sucesso !!')
            }
        })
    }
}
module.exports = new Tabelas;
