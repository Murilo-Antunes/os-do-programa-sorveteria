const nome = document.getElementById("nome")
const senha = document.getElementById("senha")
const email = document.getElementById("email")
const entrar = document.getElementById("entrar")

const login = async (nome, email, senha) => {
    const OPTIONS = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    }

    const response = await fetch("https://backend-adm-sorvetudos.onrender.com/v1/sorvetudos/admin/auth/login", OPTIONS)
    const data = await response.json()

    return { response, data }
}

const fazerLogin = async () => {
    const { response, data } = await login(nome.value, email.value, senha.value)

    if (response.ok) {
        localStorage.setItem('token', data.response.auth[0].token)
        window.location.href = "dashboard_modelo.html"
    } else {
        console.error("Login inválido:", data)
    }
}

entrar.addEventListener("click", fazerLogin)