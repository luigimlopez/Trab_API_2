const API_URL = 'http://localhost:3000/produtos';

document.getElementById('addProdutoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const produto = document.getElementById('produto').value;
    const pesoEmGramas = document.getElementById('pesoEmGramas').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ produto, pesoEmGramas })
    });
    const data = await response.json();
    alert('Produto adicionado: ' + JSON.stringify(data));
    fetchProdutos(); 
});

async function fetchProdutos() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const ProdutoList = document.getElementById('ProdutoList');
    ProdutoList.innerHTML = '';
    data.forEach(Produto => {
        const li = document.createElement('li');
        li.textContent = `ID: ${Produto.id}, Produto: ${Produto.produto}, Peso: ${Produto.pesoEmGramas}g`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deleteProduto(Produto.id);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Alterar Peso';
        updateButton.onclick = () => updateProdutoPeso(Produto.id);

        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        ProdutoList.appendChild(li);
    });
}

async function deleteProduto(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    alert(data.mensagem);
    fetchProdutos();
}

async function updateProdutoPeso(id) {
    const novoPeso = prompt('Digite o novo peso em gramas:');
    if (novoPeso !== null && !isNaN(novoPeso) && novoPeso > 0) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pesoEmGramas: novoPeso })
        });
        const data = await response.json();
        alert('Produto atualizado: ' + JSON.stringify(data));
        fetchProdutos();
    } else {
        alert('Peso inválido. Por favor, insira um valor numérico positivo.');
    }
}