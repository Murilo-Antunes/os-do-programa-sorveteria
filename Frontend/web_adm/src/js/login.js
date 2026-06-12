const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const email = document.getElementById("email");
const entrar = document.getElementById("entrar");
const nivel_acesso = 1

const login = async (nome, email, senha, nivel_acesso) => {
    const OPTIONS = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, senha, nivel_acesso })
    }

    console.log('OPTIONS', OPTIONS)
    const response = await fetch("http://localhost:8080/v1/sorvetudos/admin/auth/login", OPTIONS);
    const data = await response.json()

    localStorage.setItem('token', data.token)

    return response
}

const fazerLogin = async () => {
    const response = await login(nome.value, email.value, senha.value, nivel_acesso);
    console.log(response)
}

entrar.addEventListener("click", fazerLogin)