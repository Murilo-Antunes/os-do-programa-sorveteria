import { obterAtributos } from "./main.js";
import { renderizarTudo } from "./renderizar.js";
import { iniciarUpload } from "./upload.js";
import { iniciarForm } from "./form.js";
import { cadastrarProduto } from "./main.js";

document.addEventListener("DOMContentLoaded",  async () => {
  await obterAtributos()
  await renderizarTudo();
  await iniciarUpload();
  await iniciarForm();
});

