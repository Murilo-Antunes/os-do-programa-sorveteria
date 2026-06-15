// ============================================================
//  upload.js
//  Gerencia o upload de imagem: drag & drop, click e preview.
// ============================================================

let imagemSelecionada = null;

export function iniciarUpload() {
  const dropzone    = document.getElementById("dropzone");
  const inputArquivo = document.getElementById("input-arquivo");
  const preview     = document.getElementById("imagem-preview");
  const placeholder = document.getElementById("upload-placeholder");
  const btnRemover  = document.getElementById("btn-remover-imagem");

  if (!dropzone || !inputArquivo) return;

  // Clique na dropzone abre o seletor de arquivo
  dropzone.addEventListener("click", (e) => {
    // Não abre se clicar no botão de remover
    if (e.target === btnRemover || btnRemover?.contains(e.target)) return;
    inputArquivo.click();
  });

  // Drag over — feedback visual
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("drag-sobre");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("drag-sobre");
  });

  // Drop
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-sobre");
    const arquivo = e.dataTransfer.files[0];
    if (arquivo && arquivo.type.startsWith("image/")) {
      _processarArquivo(arquivo, preview, placeholder, btnRemover);
    }
  });

  // Seleção via input
  inputArquivo.addEventListener("change", () => {
    const arquivo = inputArquivo.files[0];
    if (arquivo) _processarArquivo(arquivo, preview, placeholder, btnRemover);
  });

  // Botão de remover imagem
  if (btnRemover) {
    btnRemover.addEventListener("click", (e) => {
      e.stopPropagation();
      _removerImagem(preview, placeholder, btnRemover, inputArquivo);
    });
  }
}

function _processarArquivo(arquivo, preview, placeholder, btnRemover) {
  imagemSelecionada = arquivo;
  const leitor = new FileReader();
  leitor.onload = (e) => {
    preview.src = e.target.result;
    preview.style.display = "block";
    placeholder.style.display = "none";
    if (btnRemover) btnRemover.style.display = "flex";
  };
  leitor.readAsDataURL(arquivo);
}

function _removerImagem(preview, placeholder, btnRemover, inputArquivo) {
  imagemSelecionada = null;
  inputArquivo.value = "";
  preview.src = "";
  preview.style.display = "none";
  placeholder.style.display = "flex";
  btnRemover.style.display = "none";
}

export function obterImagem() {
  return imagemSelecionada;
}
