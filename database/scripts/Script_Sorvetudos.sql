DROP DATABASE IF EXISTS db_sorvetudos_2026;

CREATE DATABASE IF NOT EXISTS db_sorvetudos_2026;
USE db_sorvetudos_2026;

# ------------------- PRODUTO --------------------
# cria tabela tbl_produto
CREATE TABLE IF NOT EXISTS tbl_produto (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    preco DECIMAL(5,2) NOT NULL,
    status TINYINT NOT NULL,
    img VARCHAR(255) NOT NULL
);

# ------------------- USUARIO --------------------
# cria tabela tbl_usuario
CREATE TABLE IF NOT EXISTS tbl_usuario (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel_de_acesso TINYINT NOT NULL,
    token TEXT DEFAULT NULL
);

# ------------------- CATEGORIA --------------------
# cria tabela tbl_categoria
CREATE TABLE IF NOT EXISTS tbl_categoria (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL
);

# ------------------- SABOR --------------------
# cria tabela tbl_sabor
CREATE TABLE IF NOT EXISTS tbl_sabor (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sabor VARCHAR(50) NOT NULL
);

# ------------------- PROMOCAO --------------------
# cria tabela tbl_promocao
CREATE TABLE IF NOT EXISTS tbl_promocao (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    valor_atual DECIMAL(5,2) NOT NULL,
    valor_promocao DECIMAL(5,2) NOT NULL,
    status TINYINT NOT NULL
);

# ------------------- TAMANHO --------------------
# cria tabela tbl_tamanho
CREATE TABLE IF NOT EXISTS tbl_tamanho (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tamanho VARCHAR(10) NOT NULL
);

# ------------------- LOTE --------------------
# cria tabela tbl_lote
CREATE TABLE IF NOT EXISTS tbl_lote (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    data_fabricacao DATE NOT NULL,
    data_validade DATE NOT NULL,
    quantidade INT NOT NULL
);

# ------------------- INGREDIENTE --------------------
# cria tabela tbl_ingrediente
CREATE TABLE IF NOT EXISTS tbl_ingrediente (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingrediente VARCHAR(50) NOT NULL
);

# ------------------- TAG --------------------
# cria tabela tbl_tag
CREATE TABLE IF NOT EXISTS tbl_tag (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(50) NOT NULL
);

# ------------------- PRODUTO CATEGORIA --------------------
# cria tabela tbl_produto_categoria
CREATE TABLE IF NOT EXISTS tbl_produto_categoria (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_CATEGORIA_PRODUTOCATEGORIA
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categoria (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOCATEGORIA
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);

# ------------------- PRODUTO SABOR --------------------
# cria tabela tbl_produto_sabor
CREATE TABLE IF NOT EXISTS tbl_produto_sabor (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_sabor INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_SABOR_PRODUTOSABOR
    FOREIGN KEY (id_sabor)
    REFERENCES tbl_sabor (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOSABOR
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);

# ------------------- PRODUTO PROMOCAO --------------------
# cria tabela tbl_produto_promocao
CREATE TABLE IF NOT EXISTS tbl_produto_promocao (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_promocao INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_PROMOCAO_PRODUTOPROMOCAO
    FOREIGN KEY (id_promocao)
    REFERENCES tbl_promocao (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOPROMOCAO
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);

# ------------------- PRODUTO TAMANHO --------------------
# cria tabela tbl_produto_tamanho
CREATE TABLE IF NOT EXISTS tbl_produto_tamanho (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_tamanho INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_TAMANHO_PRODUTOTAMANHO
    FOREIGN KEY (id_tamanho)
    REFERENCES tbl_tamanho (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOTAMANHO
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);


# ------------------- PRODUTO LOTE --------------------
# cria tabela tbl_produto_lote
CREATE TABLE IF NOT EXISTS tbl_produto_lote (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_lote INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_LOTE_PRODUTOLOTE
    FOREIGN KEY (id_lote)
    REFERENCES tbl_lote (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOLOTE
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);

# ------------------- PRODUTO INGREDIENTE --------------------
# cria tabela tbl_produto_ingrediente
CREATE TABLE IF NOT EXISTS tbl_produto_ingrediente (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ingrediente INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_INGREDIENTE_PRODUTOINGREDIENTE
    FOREIGN KEY (id_ingrediente)
    REFERENCES tbl_ingrediente (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOINGREDIENTE
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);

# ------------------- PRODUTO TAG --------------------
# cria tabela tbl_produto_tag
CREATE TABLE IF NOT EXISTS tbl_produto_tag (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_tag INT NOT NULL,
    id_produto INT NOT NULL,

    CONSTRAINT FK_TAG_PRODUTOTAG
    FOREIGN KEY (id_tag)
    REFERENCES tbl_tag (id)
    ON DELETE CASCADE,

    CONSTRAINT FK_PRODUTO_PRODUTOTAG
    FOREIGN KEY (id_produto)
    REFERENCES tbl_produto (id)
    ON DELETE CASCADE
);

SELECT *
FROM tbl_produto_tag;

SELECT *
FROM tbl_produto_ingrediente;

SELECT *
FROM tbl_produto_lote;

SELECT *
FROM tbl_produto_tamanho;

SELECT *
FROM tbl_produto_promocao;

SELECT *
FROM tbl_produto_sabor;

SELECT *
FROM tbl_produto_categoria;

SELECT *
FROM tbl_tag;

SELECT *
FROM tbl_ingrediente;

SELECT *
FROM tbl_lote;

SELECT *
FROM tbl_tamanho;

SELECT *
FROM tbl_promocao;

SELECT *
FROM tbl_sabor;

SELECT *
FROM tbl_categoria;

SELECT *
FROM tbl_usuario;

SELECT *
FROM tbl_produto;