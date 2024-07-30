const express = require('express');
const app = express();
const PORTA = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(express.json())

let listaProdutos = [
    {
        id: 1,
        produto: "Farinha de trigo",
        pesoEmGramas: 100
    },
    {
        id: 2,
        produto: "Ervilha enlatada",
        pesoEmGramas: 500
    },
    {
        id: 3,
        produto: "Arroz",
        pesoEmGramas: 1000
  }
]

app.get("/produtos", (req, res) => {
    res.json(listaProdutos)
})

app.post("/produtos", (req, res) => {
    const produto = req.body;

    produto.id = listaProdutos.length + 1;
    listaProdutos.push(produto);

    res.status(201).json(produto);
})

app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const produto = listaProdutos.find(pro => pro.id == id)

    if (!produto) {
      res.status(404).json({ erro: 'produto não encontrado' })
    }

    res.json(produto)
})

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req

  let indexproduto = listaProdutos.findIndex(pro => pro.id == id)

  if (indexproduto === -1) {
    res.status(404).json({ erro: 'produto não encontrado' })
  }

  const produto = {
    ...listaProdutos[indexproduto],
    ...body,
  }

  listaProdutos[indexproduto] = produto

  res.json(produto)
})

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  let indexproduto = listaProdutos.findIndex(pro => pro.id == id)

  if (indexproduto === -1) {
    return res.status(404).json({ erro: 'produto não encontrado' })
  }

  listaProdutos.splice(indexproduto, 1)

  res.status(201).json({ mensagem: 'Removido com sucesso' })
})

app.listen(PORTA, ()=> {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})