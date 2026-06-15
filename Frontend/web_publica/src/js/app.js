import { alimentarAtributos } from "./main.js";
import { render } from "./home.js";


document.addEventListener("DOMContentLoaded", async () =>{
    await alimentarAtributos()
    
    render()
})