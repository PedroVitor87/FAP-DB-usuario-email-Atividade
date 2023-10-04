const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const ejs = require('ejs');
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extends:true}));

const port = 3003;
app.listen(port, () => {
    console.log("Servidor rodando...");
})


const db = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'981766219',
    database:'empresa'
}); //Fazer a conexão com o Workbench com host, user, password, database

db.connect((error) => {
    if(error){
        console.log('Erro ao conectar com banco de dados', error);
    }else{
        console.log("Banco conetado com sucesso");
    }
}) //Exibe erro ou a conexão do código


app.get("/formulario", (req, res) => {
    res.render('formulario')
})

app.post("/cadastrar", (req, res) => {
    const {name, preco} = req.body
    const query = 'INSERT INTO produto (name,preco) VALUES (?, ?)' //Inserir no banco de dados
    db.query(query,[name, preco], (err)=>{
        if(err){
            console.log("Erro ao inserir no banco de dados");
        }else{
            res.send("Produto cadastrado com sucesso")
        }
    })
})
