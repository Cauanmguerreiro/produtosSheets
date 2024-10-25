document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value.trim(); // Obtém o valor do campo de nome
    const description = document.getElementById('description').value.trim(); // Obtém o valor da descrição
    const price = parseFloat(document.getElementById('price').value); // Obtém o valor do preço e converte para número
    const image = document.getElementById('image').value.trim(); // Obtém o valor da imagem

    // Validação básica
    if (!name || !description || isNaN(price) || price <= 0 || !image) {
        alert('Por favor, preencha todos os campos corretamente.'); // Alerta se houver campos vazios ou preço inválido
        return;
    }

    const productData = {
        name: name,
        description: description,
        price: price, // Mantém o preço como número
        image: image
    };

    fetch('https://script.google.com/macros/s/AKfycbxH7yznIexppkcVPUpIUU34q7ucEi5lzsZlhjLlOb10XovbRFd42gFud5IZCBtvpQoy/exec', { // URL do Web App
        method: 'POST',
        body: JSON.stringify(productData), // Converte os dados do produto para JSON
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.status); // Lança um erro se a resposta não for OK
        }
        return response.json(); // Retorna a resposta como JSON
    })
    .then(data => {
        alert(`Produto adicionado com sucesso: ${data.message}`); // Exibe uma mensagem de sucesso
        document.getElementById('productForm').reset(); // Reseta o formulário

        // Atualiza a lista de produtos
        const productList = document.getElementById('productList');
        const productItem = document.createElement('div'); // Cria um novo elemento para o produto
        productItem.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
            <p>Preço: R$ ${price.toFixed(2)}</p>
            <img src="${image}" alt="${name}" style="width:100px; height:auto;">
            <hr>
        `;
        productList.appendChild(productItem); // Adiciona o novo produto à lista
    })
    .catch(error => {
        console.error('Erro:', error); // Exibe erros no console
        alert('Ocorreu um erro ao adicionar o produto.'); // Mensagem de erro para o usuário
    });
});
