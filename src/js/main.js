const $inputFirstName = document.getElementById('firstName')
const $inputLastName = document.getElementById('lastName')
const $inputEmail = document.getElementById('email')
const $buttonSubmit = document.getElementById('submit')
let users = []

$buttonSubmit.addEventListener('click', register)

class User {
        constructor(name, lastName, email) {
            this.name = name
            this.lastName = lastName
            this.email = email
        }
    }

function createTableRow(userData) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.lastName}</td>
        <td>${userData.email}</td>
        <td class="tdbtn">
            <button class="btn-edit" onclick="editUser(event, '${userData.name}', '${userData.lastName}', '${userData.email}')">Editar</button>
            <button class="btn-delete">Deletar</button>
        </td>
    `
    return tr
}

function editUser(event, name, lastName, email) {
    $inputFirstName.value = name;
    $inputLastName.value = lastName;
    $inputEmail.value = email;

    const row = event.target.closest('tr')
    if (row) {
        const tbody = row.closest('tbody');
        row.remove()

        if (tbody && tbody.querySelectorAll('tr').length === 0) {
            const table = tbody.closest('table');
            if (table) {
                table.remove()
            }
        }
    }
}

function addTableToDOM(userData) {
    const main = document.querySelector('main');
    let div = document.querySelector('.table-container');

    if (!div) {
        div = document.createElement('div');
        div.classList.add('table-container');
        main.appendChild(div);
    }

    let table = div.querySelector('.table');

    if (!table) {
        table = document.createElement('table');
        table.classList.add('table');

        const thead = document.createElement('thead');
        thead.classList.add('thead');
        thead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
        `
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tbody.classList.add('tbody');
        table.appendChild(tbody);

        div.appendChild(table);
    }

    const tbody = table.querySelector('tbody');
    const row = createTableRow(userData);
    tbody.appendChild(row);
}
  
function register() {
    const name = $inputFirstName.value
    const lastName = $inputLastName.value
    const email = $inputEmail.value

    if (name && lastName && email) {
        const userData = new User(name, lastName, email)
        addTableToDOM(userData)
        users.push(userData)
        
        $inputFirstName.value = '';
        $inputLastName.value = '';
        $inputEmail.value = '';
    } else {
        alert('Preencha todos os campos')
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-delete')) {
        deleteRow(event);
    }
});

function deleteRow(event) {
    const row = event.target.closest('tr')
    if (row) {
        const tbody = row.closest('tbody');
        row.remove()

        if (tbody && tbody.querySelectorAll('tr').length === 0) {
            const table = tbody.closest('table');
            if (table) {
                table.remove()
            }
        }
    }
}