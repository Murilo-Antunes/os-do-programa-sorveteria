const nome = document.getElementById('nome')
const senha = document.getElementById('senha')
const email = document.getElementById('email')
const entrar = document.getElementById('entrar')

const validarDados = () => {
    if (nome.value == undefined || nome.value == null || !nome.value.trim() || !isNaN(nome.value) || nome.value.length > 255) {
        alert('Nome inválido!')
        nome.focus()
        return false
    }

    if (email.value == undefined || email.value == null || !isNaN(email.value) || !email.value.trim() || !email.value.includes('@') || email.value.length > 255) {
        alert('Email inválido!')
        email.focus()
        return false
    }

    if (senha.value == undefined || senha.value == null || !senha.value.trim() || !isNaN(senha.value) || senha.value.length > 255) {
        alert('Informe a senha')
        senha.focus()
        return false
    }

    return true
}

const mostrarLoading = () => {
    entrar.disabled = true
    entrar.value = 'Entrando...'
}

const esconderLoading = () => {
    entrar.disabled = false
    entrar.value = 'Entrar'
}

const login = async (nome, email, senha) => {
    const OPTIONS = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    }

    const response = await fetch(
        'https://backend-adm-sorvetudos.onrender.com/v1/sorvetudos/admin/auth/login',
        OPTIONS
    )

    const data = await response.json()

    return { response, data }
}

const fazerLogin = async () => {
    if (!validarDados()) return

    try {
        mostrarLoading()

        const { response, data } = await login(
            nome.value,
            email.value,
            senha.value
        )

        if (response.ok) {
            localStorage.setItem(
                'token',
                data.response.auth[0].token
            )

            window.location.href = 'dashboard.html'
        } else {
            alert('Usuário ou senha inválidos')
            console.error('Login inválido:', data)
        }

    } catch (error) {
        console.error(error)
        alert('Erro ao realizar login')
    } finally {
        esconderLoading()
    }
}

entrar.addEventListener('click', fazerLogin)