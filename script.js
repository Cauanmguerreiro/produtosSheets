document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value; // Obtém o valor do campo de nome
    const description = document.getElementById('description').value; // Obtém o valor da descrição
    const price = document.getElementById('price').value; // Obtém o valor do preço
    const image = document.getElementById('image').value; // Obtém o valor da imagem

    const productData = {
        name: name,
        description: description,
        price: parseFloat(price), // Converte o preço para um número
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
        return response.text(); // Retorna o texto da resposta
    })
    .then(data => {
        alert(data); // Exibe uma mensagem de sucesso
        document.getElementById('productForm').reset(); // Reseta o formulário
    })
    .catch(error => {
        console.error('Erro:', error); // Exibe erros no console
    });
});
