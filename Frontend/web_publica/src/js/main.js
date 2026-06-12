
// get/allcategorias
window.categorias = [
    {
        "id": 0,
        "categoria": "Cremosos"
    }, 
    {
        "id": 0,
        "categoria": "Frutas"
    },
    {
        "id": 0,
        "categoria": "Nuts"
    },
    {
        "id": 0,
        "categoria": "Milkshakes"
    },
    {
        "id": 0,
        "categoria": "Sundaes"
    },
    {
        "id": 0,
        "categoria": "Clássicos"
    }
];



// get/alltamanhos
window.SIZES = ["P", "M", "G"];


// get/allingredientes
window.INGREDIENT_OPTIONS = [
    {
        "id": 0,
        "ingrediente": "Leite integral"
    },
    {
        "id": 1,
        "ingrediente": "Creme de leite"
    },
    {
        "id": 2,
        "ingrediente": "Chocolate belga"
    },
    {
        "id": 3,
        "ingrediente": "Baunilha de Madagascar"
    },
    {
        "id": 4,
        "ingrediente": "Pistache siciliano"
    },
    {
        "id": 5,
        "ingrediente": "Cookies"
    },
    {
        "id": 6,
        "ingrediente": "Caramelo salgado"
    },
    {
        "id": 7,
        "ingrediente": "Doce de leite"
    },
    {
        "id": 8,
        "ingrediente": "Frutas vermelhas"
    },
    {
        "id": 9,
        "ingrediente": "Açaí"
    },
    {
        "id": 10,
        "ingrediente": "Menta fresca"
    },
    {
        "id": 11,
        "ingrediente": "Granola crocante"
    },
    {
        "id": 12,
        "ingrediente": "Chantilly"
    },
    {
        "id": 13,
        "ingrediente": "Açúcar orgânico"
    }
];

window.SABORES = [
    {
        id: 0,
        sabor: "chocolate"
    },
    {
        id: 1,
        sabor: "morango"
    },
    {
        id: 2,
        sabor: "pistache"
    },
    {
        id: 3,
        sabor: "chocolate branco"
    },
    {
        id: 4,
        sabor: "milho"
    },
    {
        id: 5,
        sabor: "abacate"
    }
]

window.TAG = [
    {
        id: 0,
        sabor: "Em Alta"
    },
    {
        id: 1,
        sabor: "Mais vendido"
    },
    {
        id: 2,
        sabor: "Sucesso"
    },
    {
        id: 3,
        sabor: "Midia"
    },
    {
        id: 4,
        sabor: "67"
    },
    {
        id: 5,
        sabor: "Insano"
    }
]

// get/allprodutos
window.PRODUTOS = [
 {
    "id": 1,
    "nome": "Milkshake de Chocolate Belga Supremo",
    "descricao": "Cremoso milkshake batido com autêntico chocolate belga e finalizado com uma generosa camada de chantilly.",
    "preco": 24.90,
    "status": true,
    "tamanho": "M",
    "img": "/img/assets/ice-acai.jpg",
    "categorias": [
      { "id": 3, "nome": "Milkshakes" },
      { "id": 0, "nome": "Cremosos" }
    ],
    "sabores": [
      { "id": 0, "sabor": "chocolate" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 2, "ingrediente": "Chocolate belga" },
      { "id": 12, "ingrediente": "Chantilly" }
    ],
    "tags": [
      { "id": 1, "sabor": "Mais vendido" }
    ]
  },
  {
    "id": 2,
    "nome": "Gelato de Pistache Siciliano Premium",
    "descricao": "Gelato artesanal feito com pistache importado da Sicília, textura aveludada e sabor marcante.",
    "preco": 18.50,
    "status": true,
    "tamanho": "P",
    "img": "/img/assets/ice-chocolate.jpg",
    "categorias": [
      { "id": 2, "nome": "Nuts" },
      { "id": 0, "nome": "Cremosos" }
    ],
    "sabores": [
      { "id": 2, "sabor": "pistache" }
    ],
    "ingredientes": [
      { "id": 1, "ingrediente": "Creme de leite" },
      { "id": 4, "ingrediente": "Pistache siciliano" }
    ],
    "tags": [
      { "id": 0, "sabor": "Em Alta" },
      { "id": 2, "sabor": "Sucesso" }
    ]
  },
  {
    "id": 3,
    "nome": "Grand Sundae Frutas Vermelhas",
    "descricao": "Taça grande de sundae com base de baunilha, calda artesanal de morango e frutas vermelhas frescas.",
    "preco": 29.90,
    "status": true,
    "tamanho": "G",
    "img": "/img/assets/ice-cookies.jpg",
    "categorias": [
      { "id": 4, "nome": "Sundaes" },
      { "id": 1, "nome": "Frutas" }
    ],
    "sabores": [
      { "id": 1, "sabor": "morango" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 3, "ingrediente": "Baunilha de Madagascar" },
      { "id": 8, "ingrediente": "Frutas vermelhas" },
      { "id": 12, "ingrediente": "Chantilly" }
    ],
    "tags": [
      { "id": 2, "sabor": "Sucesso" }
    ]
  },
  {
    "id": 4,
    "nome": "Taça Insana de Doce de Leite e Cookies",
    "descricao": "Uma explosão de sabores combinando gelato de chocolate, doce de leite premium e pedaços crocantes de cookies.",
    "preco": 34.00,
    "status": true,
    "tamanho": "G",
    "img": "/img/assets/ice-milkshake.jpg",
    "categorias": [
      { "id": 0, "nome": "Cremosos" },
      { "id": 5, "nome": "Clássicos" }
    ],
    "sabores": [
      { "id": 0, "sabor": "chocolate" }
    ],
    "ingredientes": [
      { "id": 1, "ingrediente": "Creme de leite" },
      { "id": 5, "ingrediente": "Cookies" },
      { "id": 7, "ingrediente": "Doce de leite" }
    ],
    "tags": [
      { "id": 5, "sabor": "Insano" },
      { "id": 3, "sabor": "Mídia" }
    ]
  },
  {
    "id": 5,
    "nome": "Milkshake de Baunilha com Caramelo Salgado",
    "descricao": "Milkshake clássico de Baunilha de Madagascar contrastado perfeitamente com nossa calda de caramelo salgado.",
    "preco": 22.90,
    "status": true,
    "tamanho": "M",
    "img": "/img/assets/ice-pistachio.jpg",
    "categorias": [
      { "id": 3, "nome": "Milkshakes" }
    ],
    "sabores": [
      { "id": 3, "sabor": "chocolate branco" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 3, "ingrediente": "Baunilha de Madagascar" },
      { "id": 6, "ingrediente": "Caramelo salgado" }
    ],
    "tags": [
      { "id": 0, "sabor": "Em Alta" }
    ]
  },
  {
    "id": 6,
    "nome": "Super Açaí Bowl com Granola Orgânica",
    "descricao": "Açaí puro batido na hora, adoçado com açúcar orgânico e servido com uma camada super crocante de granola.",
    "preco": 26.00,
    "status": true,
    "tamanho": "G",
    "img": "/img/assets/ice-strawberry.jpg",
    "categorias": [
      { "id": 1, "nome": "Frutas" }
    ],
    "sabores": [
      { "id": 1, "sabor": "morango" }
    ],
    "ingredientes": [
      { "id": 9, "ingrediente": "Açaí" },
      { "id": 11, "ingrediente": "Granola crocante" },
      { "id": 13, "ingrediente": "Açúcar orgânico" }
    ],
    "tags": [
      { "id": 1, "sabor": "Mais vendido" }
    ]
  },
  {
    "id": 7,
    "nome": "Gelato de Abacate Cremoso Fit",
    "descricao": "Opção leve e extremamente cremosa feita com abacate fresco e açúcar orgânico.",
    "preco": 14.00,
    "status": true,
    "tamanho": "P",
    "img": "/img/assets/ice-sundae.jpg",
    "categorias": [
      { "id": 1, "nome": "Frutas" },
      { "id": 0, "nome": "Cremosos" }
    ],
    "sabores": [
      { "id": 5, "sabor": "abacate" }
    ],
    "ingredientes": [
      { "id": 1, "ingrediente": "Creme de leite" },
      { "id": 13, "ingrediente": "Açúcar orgânico" }
    ],
    "tags": [
      { "id": 4, "sabor": "67" }
    ]
  },
  {
    "id": 8,
    "nome": "Gelato Clássico de Milho Verde",
    "descricao": "Sabor tradicional do interior com o toque gourmet do creme de leite fresco e leite integral selecionado.",
    "preco": 16.50,
    "status": true,
    "tamanho": "M",
    "img": "/img/assets/ice-vanilla.jpg",
    "categorias": [
      { "id": 5, "nome": "Clássicos" }
    ],
    "sabores": [
      { "id": 4, "sabor": "milho" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 1, "ingrediente": "Creme de leite" }
    ],
    "tags": [
      { "id": 2, "sabor": "Sucesso" }
    ]
  },
  {
    "id": 9,
    "nome": "Sundae Menta Choc Refresh",
    "descricao": "Refrescante gelato de menta fresca mesclado com pedaços picados de chocolate belga.",
    "preco": 19.90,
    "status": true,
    "tamanho": "P",
    "img": "/img/assets/ice-acai.jpg",
    "categorias": [
      { "id": 4, "nome": "Sundaes" }
    ],
    "sabores": [
      { "id": 0, "sabor": "chocolate" }
    ],
    "ingredientes": [
      { "id": 1, "ingrediente": "Creme de leite" },
      { "id": 2, "ingrediente": "Chocolate belga" },
      { "id": 10, "ingrediente": "Menta fresca" }
    ],
    "tags": [
      { "id": 3, "sabor": "Mídia" }
    ]
  },
  {
    "id": 10,
    "nome": "Mega Milkshake Chocolate Branco e Cookies",
    "descricao": "Deliciosa combinação de chocolate branco artesanal batido com cookies crocantes e base de leite integral.",
    "preco": 27.90,
    "status": true,
    "tamanho": "G",
    "img": "/img/assets/ice-cookies.jpg",
    "categorias": [
      { "id": 3, "nome": "Milkshakes" },
      { "id": 0, "nome": "Cremosos" }
    ],
    "sabores": [
      { "id": 3, "sabor": "chocolate branco" }
    ],
    "ingredientes": [
      { "id": 0, "ingrediente": "Leite integral" },
      { "id": 5, "ingrediente": "Cookies" },
      { "id": 12, "ingrediente": "Chantilly" }
    ],
    "tags": [
      { "id": 5, "sabor": "Insano" }
    ]
  }
];

// {
//     id: "manga-tropical",
//     name: "Manga Tropical",
//     flavor: "Manga madura",
//     category: "Frutas",
//     price: 18.0,
//     rating: 4.6,
//     image: "/img/assets/ice-acai.jpg",
//     description: "Manga madura selecionada com toque de maracujá. Refrescante e tropical.",
//     ingredients: ["Manga", "Maracujá", "Creme de leite", "Açúcar", "Limão"]
//   }

// Funções utilitárias e manipulações do array
window.PRODUTOS.forEach((p, i) => {
  p.sizes = ["P", "M", "G"];
  if (i % 3 === 0) {
    p.oldPrice = Math.round(p.price * 1.25 * 10) / 10;
  }
});

//substituir pelo search de nome depois
window.getProduct = (id) => window.PRODUTOS.find((p) => p.id === id);


window.formatarPreco = (n) => "R$ " + n.toFixed(2).replace(".", ",");

//Altera certos caracteres em entidades html, impedindo alguns erros de segurança (xss - Cross Site Scripting) que o innerhtml traz
window.escapeHtml = (s) => 
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));