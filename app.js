 const express = require("express");
const bodyParser = require("body-parser");

const clientes = require('./models/cliente');

const app = express();

const handlebars = require("express-handlebars").engine;
app.engine("handlebars", handlebars({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));

app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){    
  res.render('cadastro');
});

app.get("/cadastrar", function(req, res){    
  res.render('cadastro');
});

app.get("/consultar", function(req, res){    
  clientes.findAll().then(result => {
    res.render('consulta', { result });
  }).catch((erro) => {
    return res.status(401).json({ error: 'Houve um error'});
  });
});

app.post('/cadastrar', function(req, res) {
  clientes.create({
    nome: req.body.nome,
    endereco: req.body.endereco,
    bairro: req.body.bairro,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
  }).then(function(){
      console.log("Cliente cadastrado com sucesso!")
  }).catch(function(erro){
      console.log("Erro: Cliente não cadastrado!" + erro)
  });

  res.render('cadastro');
});

app.get("/atualizar/:id", function(req, res){    
  clientes.findOne({ where: { id: req.params.id }}).then((result) => {
    res.render('editar', { result });
  }).catch((err) => {
    return res.status(401).json({ error: 'Houve um erro' });
  });
});

app.post("/atualizar", function(req, res){    
  clientes.update({
    nome: req.body.nome,
    endereco: req.body.endereco,
    bairro: req.body.bairro,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
  }, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.redirect('/consultar');
  }).catch(function (erro) {
    return res.status(401).json({ error: 'Houve um erro' });
  });
});

app.get("/deletar/:id", function(req, res){    
  clientes.destroy({
    where: { id: req.params.id }
  }).then(function () {
    res.redirect('/consultar');
  }).catch(function (erro) {
    return res.status(401).json({ error: 'Houve um erro' });
  });
});

app.listen(8081, function(){    
  console.log("Servidor está rodando!")
});