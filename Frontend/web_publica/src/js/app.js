import { alimentarAtributos } from "./main.js";
import { render } from "./home.js";


document.addEventListener("DOMContentLoaded", async () =>{
    await alimentarAtributos()
    const destaque = window.PRODUTOS[0];
    if (destaque) {

        const imgDestaque = destaque.img?.startsWith("http") ? destaque.img : "./src" + destaque.img;
        const categoriaDestaque = Array.isArray(destaque.categoria) && destaque.categoria.length
        ? destaque.categoria[0].categoria : "";

        document.querySelectorAll('.skeleton, .skeleton-box, .skeleton-text').forEach(elemento => {
            elemento.classList.remove('skeleton', 'skeleton-box', 'skeleton-text')
        })
        //Hero stats
        document.getElementById('numero-sabores').innerHTML = `<dd class = 'surgir'>${window.PRODUTOS.length}<em>+</em></dd>`
        document.getElementById('numero-aprovacao').innerHTML = `<dd class = 'surgir style="animation-delay:50ms"'>98<em>%</em></dd>`
        document.getElementById('numero-top').innerHTML = `<dd class = 'surgir' style="animation-delay:100ms">10<em>Mundial</em></dd>`

        // Hero caption
        document.querySelector(".hero-img-caption .big").textContent = destaque.nome;
        document.querySelector(".hero-img-wrap img").src = imgDestaque;
        document.querySelector('.small').textContent = 'Edição especial'

        // Seção destaque
        document.querySelector(".featured-card").href = `./src/pages/product.html?id=${destaque.id}`;
        document.querySelector(".featured-link").href = `./src/pages/product.html?id=${destaque.id}`;
        document.querySelector(".featured-img img").src = imgDestaque;
        document.querySelector(".featured-meta").textContent = categoriaDestaque;
        document.querySelector(".featured-card h3").textContent = destaque.nome;
        document.querySelector(".featured-card .desc").textContent = destaque.descricao ?? "";
        document.querySelector(".featured-price-v").textContent = Number(destaque.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? "—";
    }   

    //milkshake
    document.querySelectorAll('.more').forEach(elemento => {
        elemento.textContent = 'Provar ↗'
    })

    const milkshakes = window.PRODUTOS.filter(p => Array.isArray(p.categoria) && p.categoria.some(c => c.id === 4)).slice(0, 2);

    

    milkshakes.forEach((milkshake, i) => {
        const seletor = i === 0 ? "#milkshakes" : "#sundaes";
        const imgMilkshake = milkshake.img?.startsWith("http") ? milkshake.img : "./src" + milkshake.img;

        document.querySelector(seletor).href = `./src/pages/product.html?id=${milkshake.id}`;
        document.querySelector(`${seletor} img`).src = imgMilkshake;
        document.querySelector(`${seletor} h3`).textContent = milkshake.nome;
        document.querySelector(`${seletor} .desc`).textContent = milkshake.descricao ?? "";
        document.querySelector(`${seletor} .price`).textContent = Number(milkshake.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? "—";
    });
    render()
})