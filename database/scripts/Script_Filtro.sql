USE db_sorvetudos_2026;
DROP VIEW IF EXISTS vw_relatorio;
DROP PROCEDURE IF EXISTS filtro;

create view vw_relatorio as
SELECT tbl_produto.id as id_produto,
tbl_categoria.id as id_categoria,
tbl_sabor.id as id_sabor,
tbl_promocao.id as id_promocao,
tbl_tamanho.id as id_tamanho,
tbl_lote.id as id_lote , 
tbl_ingrediente.id as id_ingrediente,
tbl_tag.id as id_tag

	FROM tbl_produto
		LEFT JOIN tbl_produto_categoria
			ON tbl_produto.id = tbl_produto_categoria.id_produto
		LEFT JOIN tbl_categoria
			ON tbl_categoria.id = tbl_produto_categoria.id_categoria

		LEFT JOIN tbl_produto_sabor
			ON tbl_produto.id = tbl_produto_sabor.id_produto
		LEFT JOIN tbl_sabor
			ON tbl_sabor.id = tbl_produto_sabor.id_sabor

		LEFT JOIN tbl_produto_promocao
			ON tbl_produto.id = tbl_produto_promocao.id_produto
		LEFT JOIN tbl_promocao
			ON tbl_promocao.id = tbl_produto_promocao.id_promocao

		LEFT JOIN tbl_produto_tamanho
			ON tbl_produto.id = tbl_produto_tamanho.id_produto
		LEFT JOIN tbl_tamanho
			ON tbl_tamanho.id = tbl_produto_tamanho.id_tamanho

		LEFT JOIN tbl_produto_lote
			ON tbl_produto.id = tbl_produto_lote.id_produto
		LEFT JOIN tbl_lote
			ON tbl_lote.id = tbl_produto_lote.id_lote

		LEFT JOIN tbl_produto_ingrediente
			ON tbl_produto.id = tbl_produto_ingrediente.id_produto
		LEFT JOIN tbl_ingrediente
			ON tbl_ingrediente.id = tbl_produto_ingrediente.id_ingrediente

		LEFT JOIN tbl_produto_tag
			ON tbl_produto.id = tbl_produto_tag.id_produto
		LEFT JOIN tbl_tag
			ON tbl_tag.id = tbl_produto_tag.id_tag;

DELIMITER $ 
create procedure filtro (in idProduto int ,in idCategoria int ,in idSabor int, in idPromocao int, in idTamanho int, in idLote int, in idIngrediente int, in idTag int)
begin
	select id_produto from vw_relatorio
		where if(idProduto is null, 1=1, id_produto = idProduto) and
		if(idCategoria is null, 1=1, id_categoria = idCategoria) and
		if(idSabor is null, 1=1, id_sabor = idSabor) and
		if(idPromocao is null, 1=1, id_promocao = idPromocao) and
        if(idTamanho is null, 1=1, id_tamanho = idTamanho) and
		if(idLote is null, 1=1, id_lote = idLote) and
		if(idIngrediente is null, 1=1, id_ingrediente = idIngrediente) and
		if(idTag is null, 1=1, id_tag = idTag)
        GROUP BY id_produto;
end $
DELIMITER ; 

CALL filtro(NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);