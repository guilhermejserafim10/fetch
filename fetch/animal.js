const apiURL = 'https://672b4557976a834dd0265674.mockapi.io/Guilherme/Animal'; 

// Função para adicionar um novo animal à lista exibida na página
function addAnimalToList(animal) {
    const animalList = document.getElementById('animalList');
    const li = document.createElement('li');
    li.textContent = `${animal.id} - ${animal.Nome} (${animal.Idade} anos) – ${animal.Raca}`;
    animalList.appendChild(li);
}

// Função para cadastrar o animal com os dados do formulário
async function registerAnimal(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores do formulário
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const breed = document.getElementById('breed').value;

    const newAnimal = {
        Nome: name,
        Idade: parseInt(age, 10),
        Raca: breed
    };

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnimal)
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao cadastrar o animal: ${response.status}`);
        }
        
        // Obtem o objeto do animal recém-cadastrado e adiciona à lista
        const addedAnimal = await response.json();
        addAnimalToList(addedAnimal); // Adiciona o animal à lista sem recarregar

        // Limpa os campos do formulário após o cadastro
        document.getElementById('animalForm').reset();
    } catch (error) {
        console.error('Erro ao cadastrar animal:', error);
    }
}

// Adiciona evento ao formulário para capturar o envio
document.getElementById('animalForm').addEventListener('submit', registerAnimal);
