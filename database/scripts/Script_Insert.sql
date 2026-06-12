USE db_sorvetudos_2026;

-- Usuario adm
INSERT INTO tbl_usuario (nome, email, senha, nivel_de_acesso) VALUES
('admin', 'admin@gmail.com','$2b$10$XBa9TqJuC15BAjlcU/47ge9csV8VuLAfWKj4Z0FCjI0yJpTuYr.be',1);
-- senha: 'admin'

-- PRODUTOS
INSERT INTO tbl_produto (nome, descricao, preco, status, img) VALUES
('Chocolate ao Leite', 'Sorvete sabor chocolate ao leite', 12.90, 1, 'chocolate.jpg'),
('Morango', 'Sorvete sabor morango', 11.50, 1, 'morango.jpg'),
('Baunilha', 'Sorvete sabor baunilha', 10.90, 1, 'baunilha.jpg'),
('Flocos', 'Sorvete sabor flocos', 13.50, 1, 'flocos.jpg'),
('Napolitano', 'Sorvete napolitano tradicional', 15.90, 1, 'napolitano.jpg'),
('Cookies', 'Sorvete sabor cookies', 16.50, 1, 'cookies.jpg'),
('Chocolate Branco', 'Sorvete sabor chocolate branco', 14.90, 1, 'choc_branco.jpg'),
('Pistache', 'Sorvete sabor pistache', 19.90, 1, 'pistache.jpg'),
('Limão', 'Sorvete sabor limão', 9.90, 1, 'limao.jpg'),
('Açaí', 'Açaí tradicional', 18.90, 1, 'acai.jpg');

-- CATEGORIAS
INSERT INTO tbl_categoria (categoria) VALUES
('Sorvete'),
('Açaí'),
('Picolé'),
('Milkshake'),
('Sobremesa');

-- SABORES
INSERT INTO tbl_sabor (sabor) VALUES
('Chocolate'),
('Morango'),
('Baunilha'),
('Flocos'),
('Pistache'),
('Limão'),
('Cookies');

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
('Limão');

-- TAGS
INSERT INTO tbl_tag (tag) VALUES
('Premium'),
('Zero Açúcar'),
('Mais Vendido'),
('Promoção'),
('Novo');

-- PRODUTO CATEGORIA
INSERT INTO tbl_produto_categoria (id_categoria, id_produto) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),
(1,6),(1,7),(1,8),(1,9),(2,10);

-- PRODUTO SABOR
INSERT INTO tbl_produto_sabor (id_sabor, id_produto) VALUES
(1,1),(2,2),(3,3),(4,4),(1,5),
(7,6),(1,7),(5,8),(6,9),(2,10);

-- PRODUTO PROMOÇÃO
INSERT INTO tbl_produto_promocao (id_promocao, id_produto) VALUES
(1,1),
(2,5),
(3,8);

-- PRODUTO TAMANHO
INSERT INTO tbl_produto_tamanho (id_tamanho, id_produto) VALUES
(1,1),(2,1),(3,1),
(2,2),(3,2),
(1,3),(2,3),
(3,4),
(2,5),
(3,6),
(1,7),
(2,8),
(1,9),
(3,10);

-- PRODUTO LOTE
INSERT INTO tbl_produto_lote (id_lote, id_produto) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(1,6),
(2,7),
(3,8),
(4,9),
(5,10);

-- PRODUTO INGREDIENTE
INSERT INTO tbl_produto_ingrediente (id_ingrediente, id_produto) VALUES
(1,1),(2,1),
(1,2),(3,2),
(1,3),(4,3),
(1,4),
(1,5),(2,5),(3,5),
(1,6),
(1,7),(2,7),
(1,8),(6,8),
(1,9),(7,9),
(1,10);

-- PRODUTO TAG
INSERT INTO tbl_produto_tag (id_tag, id_produto) VALUES
(3,1),
(4,5),
(1,8),
(5,10),
(2,9);