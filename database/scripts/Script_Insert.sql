USE db_sorvetudos_2026;

-- Usuario adm
INSERT INTO tbl_usuario (nome, email, senha, nivel_de_acesso) VALUES
('admin', 'admin@gmail.com','$2b$10$XBa9TqJuC15BAjlcU/47ge9csV8VuLAfWKj4Z0FCjI0yJpTuYr.be',1);
-- senha: 'admin'

-- PRODUTOS
INSERT INTO tbl_produto (nome, descricao, preco, status, img) VALUES
('Pote Avelã Sorvetudos', 'Pote de sorvete de avelã cremoso para adoçar sua manhã', 30.99, 1, 'https://uploadsorvetudos.blob.core.windows.net/uploadsorvetudos/178169712102020-avela.jpg'),
('Sorvete Café Sorvetudos', 'Descubra o equilíbrio perfeito entre cremosidade e o sabor marcante do café em nosso Pote de Sorvete de Café.', 20.98, 1, 'https://uploadsorvetudos.blob.core.windows.net/uploadsorvetudos/178169890222026-cafe-espresso.jpg'),
('Brownie Cobertura Baunilha Sorvetudos', 'O contraste perfeito entre sabores e texturas transforma cada pedaço em uma experiência deliciosa e cheia de sabor.',25.90 , 1, 'https://uploadsorvetudos.blob.core.windows.net/uploadsorvetudos/178169978194433-brownie-quente.jpg'),
('Milkshake Ovolmatine Sorvetudos', 'Cada gole entrega o equilíbrio ideal entre doçura e aquele toque maltado que conquistou gerações.', 35.99, 1, 'https://uploadsorvetudos.blob.core.windows.net/uploadsorvetudos/178170007915537-milkshake-ovomaltine.jpg');

-- CATEGORIAS
INSERT INTO tbl_categoria (categoria) VALUES
('Sorvete'),
('Açaí'),
('Picolé'),
('Milkshake'),
('Sobremesa'),
('Cremosos');

-- SABORES
INSERT INTO tbl_sabor (sabor) VALUES
('Chocolate'),
('Morango'),
('Baunilha'),
('Flocos'),
('Pistache'),
('Limão'),
('Cookies'),
('Avelã'),
('Café');

-- PROMOÇÕES
INSERT INTO tbl_promocao (valor_atual, valor_promocao, status) VALUES
(12.90, 9.90, 1),
(15.90, 12.90, 1),
(19.90, 16.90, 1);

-- TAMANHOS
INSERT INTO tbl_tamanho (tamanho) VALUES
('P'),
('M'),
('G');

-- LOTES
INSERT INTO tbl_lote (numero, data_fabricacao, data_validade, quantidade) VALUES
(1001, '2026-06-01', '2026-12-01', 100),
(1002, '2026-06-02', '2026-12-02', 120),
(1003, '2026-06-03', '2026-12-03', 80),
(1004, '2026-06-04', '2026-12-04', 150),
(1005, '2026-06-05', '2026-12-05', 90);



-- INGREDIENTES
INSERT INTO tbl_ingrediente (ingrediente) VALUES
('Leite'),
('Chocolate'),
('Morango'),
('Baunilha'),
('Açúcar'),
('Pistache'),
('Limão'),
('castanha'),
('Essência de baunilha'),
('Creme de leite'),
('Café');

-- TAGS
INSERT INTO tbl_tag (tag) VALUES
('Premium'),
('Zero Açúcar'),
('Mais Vendido'),
('Promoção'),
('Novo');

-- PRODUTO x CATEGORIA
INSERT INTO tbl_produto_categoria (id_categoria, id_produto) VALUES
(1,1), -- Sorvete
(6,1), -- Cremosos

(1,2), -- Sorvete
(6,2), -- Cremosos

(5,3), -- Sobremesa

(4,4), -- Milkshake
(6,4); -- Cremosos


-- PRODUTO x SABOR
INSERT INTO tbl_produto_sabor (id_sabor, id_produto) VALUES
(8,1), -- Avelã
(3,1), -- Baunilha

(9,2), -- Café

(1,3), -- Chocolate
(3,3), -- Baunilha

(1,4), -- Chocolate
(7,4); -- Cookies


-- PRODUTO x PROMOCAO
INSERT INTO tbl_produto_promocao (id_promocao, id_produto) VALUES
(1,1),
(2,2),
(3,3),
(2,4);


-- PRODUTO x TAMANHO
INSERT INTO tbl_produto_tamanho (id_tamanho, id_produto) VALUES
(2,1), -- M
(3,1), -- G

(1,2), -- P
(2,2), -- M

(2,3), -- M
(3,3), -- G

(2,4), -- M
(3,4); -- G


-- PRODUTO x LOTE
INSERT INTO tbl_produto_lote (id_lote, id_produto) VALUES
(1,1),
(2,1),

(2,2),
(3,2),

(3,3),
(4,3),

(4,4),
(5,4);


-- PRODUTO x INGREDIENTE
INSERT INTO tbl_produto_ingrediente (id_ingrediente, id_produto) VALUES
-- Pote Avelã
(1,1),  -- Leite
(5,1),  -- Açúcar
(8,1),  -- Castanha
(10,1), -- Creme de leite

-- Sorvete Café
(1,2),  -- Leite
(5,2),  -- Açúcar
(11,2), -- Café
(10,2), -- Creme de leite

-- Brownie Baunilha
(1,3),  -- Leite
(2,3),  -- Chocolate
(4,3),  -- Baunilha
(9,3),  -- Essência de baunilha
(10,3), -- Creme de leite

-- Milkshake Ovomaltine
(1,4),  -- Leite
(2,4),  -- Chocolate
(5,4),  -- Açúcar
(10,4); -- Creme de leite


-- PRODUTO x TAG
INSERT INTO tbl_produto_tag (id_tag, id_produto) VALUES
-- Pote Avelã
(1,1), -- Premium
(5,1), -- Novo

-- Sorvete Café
(3,2), -- Mais Vendido
(1,2), -- Premium

-- Brownie
(4,3), -- Promoção
(5,3), -- Novo

-- Milkshake
(1,4), -- Premium
(3,4), -- Mais Vendido
(4,4); -- Promoção