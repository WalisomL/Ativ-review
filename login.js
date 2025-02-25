let users = JSON.parse(localStorage.getItem('users')) || [
    { username: "admin", password: "admin123" }
];
let loggedInUser = null;

function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        alert("Login bem-sucedido!");
        document.getElementById("login-form").style.display = "none";
        document.getElementById("actions").style.display = "block";
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

function register() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    const newEmail = document.getElementById("new-email").value;

    if (users.some(user => user.username === newUsername)) {
        alert("Este nome de usuário já está em uso.");
        return;
    }

    users.push({ username: newUsername, password: newPassword, email: newEmail });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    showLoginForm();
}

function search() {
    const searchInput = document.getElementById("search-input").value;
    const user = users.find(user => user.username === searchInput);

    if (user) {
        alert(`Usuário encontrado: ${user.username}`);
    } else {
        alert("Usuário não encontrado.");
    }
}

function edit() {
    if (!loggedInUser) {
        alert("Você precisa estar logado para editar.");
        return;
    }

    const newPassword = prompt("Digite a nova senha:");

    if (newPassword) {
        loggedInUser.password = newPassword;
        users = users.map(user => (user.username === loggedInUser.username ? loggedInUser : user));
        localStorage.setItem('users', JSON.stringify(users));
        alert("Senha atualizada com sucesso!");
    } else {
        alert("A edição foi cancelada.");
    }
}

function deleteUser() {
    if (!loggedInUser) {
        alert("Você precisa estar logado para apagar.");
        return;
    }

    const confirmDelete = confirm("Tem certeza que deseja apagar sua conta?");
    if (confirmDelete) {
        users = users.filter(user => user !== loggedInUser);
        loggedInUser = null;
        localStorage.setItem('users', JSON.stringify(users)); 
        localStorage.removeItem('loggedInUser'); 
        alert("Conta apagada com sucesso!");
        document.getElementById("actions").style.display = "none";
        showLoginForm();
    }
}

window.onload = function() {
    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedIn) {
        loggedInUser = loggedIn;
        document.getElementById("actions").style.display = "block";
    }
}
