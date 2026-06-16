import { alimentarAtributos } from "./main.js";
import { render } from "./home.js";


document.addEventListener("DOMContentLoaded", async () =>{
    await alimentarAtributos()
    const destaque = window.PRODUTOS[0];
    if (destaque) {
        const imgDestaque = destaque.img?.startsWith("http") ? destaque.img : "./src" + destaque.img;
        const categoriaDestaque = Array.isArray(destaque.categoria) && destaque.categoria.length
        ? destaque.categoria[0].categoria : "";

        // Hero caption
        document.querySelector(".hero-img-caption .big").textContent = destaque.nome;
        document.querySelector(".hero-img-wrap img").src = imgDestaque;

        // Seção destaque
        document.querySelector(".featured-card").href = `./src/pages/product.html?id=${destaque.id}`;
        document.querySelector(".featured-link").href = `./src/pages/product.html?id=${destaque.id}`;
        document.querySelector(".featured-img img").src = imgDestaque;
        document.querySelector(".featured-meta").textContent = categoriaDestaque;
        document.querySelector(".featured-card h3").textContent = destaque.nome;
        document.querySelector(".featured-card .desc").textContent = destaque.descricao ?? "";
        document.querySelector(".featured-price-v").textContent = destaque.preco ?? "—";
    }

    const milkshakes = window.PRODUTOS .filter(p => Array.isArray(p.categoria) && p.categoria.some(c => c.id === 11)).slice(0, 2);

    milkshakes.forEach((milkshake, i) => {
        const seletor = i === 0 ? "#milkshakes" : "#sundaes";
        const imgMilkshake = milkshake.img?.startsWith("http") ? milkshake.img : "./src" + milkshake.img;

        document.querySelector(seletor).href = `./src/pages/product.html?id=${milkshake.id}`;
        document.querySelector(`${seletor} img`).src = imgMilkshake;
        document.querySelector(`${seletor} h3`).textContent = milkshake.nome;
        document.querySelector(`${seletor} .desc`).textContent = milkshake.descricao ?? "";
        document.querySelector(`${seletor} .price`).textContent = milkshake.preco ?? "—";
    });
    render()
})