import type { Product, ProductCategory } from "@/types";

export const products: Product[] = [
  {
    id: "p1",
    slug: "fermento-quimico-em-po",
    cat: "fermento",
    categoryLabel: "Fermentos",
    name: "Fermento Químico em Pó",
    desc: "Fermento químico em pó indicado para panificação e confeitaria, com uso junto aos ingredientes secos da receita.",
    details:
      "O Fermento Químico em Pó é indicado para aplicações em panificação e confeitaria, contribuindo para a formação de volume e textura em produtos que demandam fermentação química. Recomenda-se adicionar o produto ao C2 e à farinha de trigo, juntamente com os demais ingredientes secos, garantindo melhor distribuição no preparo. É versátil para pães doces, bolos, biscoitos e diferentes massas conforme a formulação.",
    imageSrc: "/Fermento quimico em pó.jpeg",
    imageAlt: "Fermento Químico em Pó",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Amido de milho geneticamente modificado, pirofosfato de sódio, bicarbonato de sódio | Glúten: Não contém | Modo de usar: Adicionar à farinha de trigo (C2) juntamente com os demais ingredientes secos da receita",
    specs2:
      "Sugestão de uso: 2 g a 20 g de fermento químico em pó (C2), conforme a receita e necessidades energéticas | Armazenamento: Manter em local seco e arejado | Peso líquido: 1 kg",
    tags: ["Panificação"],
    badgeClass: "badge-new",
    badgeText: "Lançamento",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p2",
    slug: "melhorador-em-po",
    cat: "melhorador",
    categoryLabel: "Melhoradores",
    name: "Melhorador em Pó",
    desc: "Melhorador em pó para processos de panificação com farinha de trigo, com dosagem ajustável conforme o tempo de fermentação.",
    details:
      "O Melhorador em Pó é formulado para panificação com farinha de trigo e deve ser adicionado diretamente à farinha no início do processo. A dosagem pode ser ajustada de acordo com o tempo de fermentação desejado, permitindo maior controle de desempenho em diferentes rotinas de produção. Atenção à observação de uso: este produto PRECISA DE ÓLEO conforme orientação técnica da linha.",
    imageSrc: "/Melhorador em pó.jpeg",
    imageAlt: "Melhorador em Pó",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Amido de milho, cloreto de sódio, pirofosfato de sódio, ácido ascórbico e polissorbato 80 | Glúten: Não contém | Aplicação: 500 g por saco de 50 kg de farinha; adicionar 1 a 2 litros de água por saco de 50 kg",
    specs2:
      "Modo de usar: Adicionar diretamente à farinha de trigo | Fermentação: até 6 horas — 500 g / até 18 horas — 650 g | Armazenamento: Local fresco | Observação: PRECISA DE ÓLEO | Peso líquido: 1 kg",
    tags: ["Panificação"],
    badgeClass: "badge-new",
    badgeText: "Lançamento",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p12",
    slug: "melhorador-em-po-10kg",
    cat: "melhorador",
    categoryLabel: "Melhoradores",
    name: "Melhorador em Pó (10 kg)",
    desc: "Lançamento em embalagem de 10 kg para panificação, de aplicação direta na farinha e sem necessidade de óleo.",
    details:
      "O Melhorador em Pó (10 kg) é um lançamento voltado à panificação, com aplicação direta do C2 na farinha de trigo. A formulação foi pensada para simplificar o processo e manter consistência na produção, com a observação importante de que NÃO PRECISA DE ÓLEO. Recomenda-se seguir a dosagem indicada para cada saco de farinha, conforme ficha técnica.",
    imageSrc: "/Lançamento melhorador em pó.jpeg",
    imageAlt: "Melhorador em Pó 10 kg — lançamento",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Amido de milho, cloreto de sódio, ácido ascórbico e polissorbato 80 | Glúten: Não contém | Aplicação: 500 g por saco de 50 kg de farinha de trigo; adicionar 1 a 2 litros de água para cada saco de 50 kg",
    specs2:
      "Modo de usar: Adicionar diretamente o C2 à farinha de trigo | Armazenamento: Local fresco | Observação: NÃO PRECISA DE ÓLEO | Peso líquido: 10 kg",
    tags: ["Panificação"],
    badgeClass: "badge-new",
    badgeText: "Lançamento",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p3",
    slug: "anti-mofo-conservante-alimenticio",
    cat: "conservante",
    categoryLabel: "Conservantes",
    name: "Anti Mofo",
    desc: "Conservante alimentício para panificação que inibe mofo e rope (bactérias) e auxilia no aumento da vida de prateleira.",
    details:
      "O Anti Mofo é um conservante alimentício indicado para aplicações em panificação. Sua função principal é inibir o desenvolvimento de mofo e rope (bactérias), contribuindo para aumentar a vida de prateleira de pães, bolos, biscoitos e produtos crescidos por leveduras. Recomenda-se misturar junto com a farinha na masseira, respeitando a dosagem indicada e as condições de armazenamento em local fresco.",
    imageSrc: "/Anti mofo.jpeg",
    imageAlt: "Anti Mofo",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Amido de milho e propionato de cálcio INS 282 | Aplicação: Misturar junto com a farinha na masseira | Dosagem: 0,3% a 0,4% ou 150 g a 200 g para cada 50 kg de farinha",
    specs2:
      "Armazenamento: Local fresco | Benefícios: Inibe mofo e rope (bactérias); aumenta vida de prateleira de pães, bolos, biscoitos e produtos crescidos por leveduras",
    tags: ["Pães", "Bolos", "Biscoitos"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p4",
    slug: "propionato-de-calcio",
    cat: "conservante",
    categoryLabel: "Conservantes",
    name: "Propionato de Cálcio",
    desc: "Conservante para panificação que, na quantidade adequada, não altera cor, volume ou sabor dos alimentos.",
    details:
      "O Propionato de Cálcio é um conservante amplamente utilizado em panificação. Quando aplicado na quantidade adequada, não altera cor, volume ou sabor dos alimentos, preservando as características sensoriais do produto final. É fundamental respeitar o limite máximo estabelecido pela ANVISA para uso em farinha e seguir as orientações de aplicação e armazenamento conforme a ficha técnica.",
    imageSrc: "/Propionato de Cálcio.jpeg",
    imageAlt: "Propionato de Cálcio",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Propionato de cálcio | Glúten: Não contém | Como usar: Limite ANVISA — máximo 0,1 g de propionato para cada 100 g de farinha",
    specs2:
      "Observação: Na quantidade adequada, não altera cor, volume ou sabor dos alimentos | Peso líquido: 1 kg",
    tags: ["Panificação"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p5",
    slug: "amoníaco",
    cat: "ingrediente",
    categoryLabel: "Ingredientes",
    name: "Amoníaco",
    desc: "Fermento químico (carbonatos de amônio) para pães e biscoitos, versátil para confeitaria e outras aplicações.",
    details:
      "O Amoníaco (carbonatos de amônio) é utilizado como fermento químico em pães e biscoitos, com ampla versatilidade para produtos de confeitaria e outros segmentos. Seu uso deve considerar a formulação e o perfil de processo, com dosagem aproximada de 1% a 4% sobre o peso da farinha de trigo, conforme necessidade de desempenho e características do produto final.",
    imageSrc: "/Amoníaco.jpeg",
    imageAlt: "Amoníaco",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Carbonato ácido de amônio, hidrogenocarbonato de amônio | Glúten: Não contém | Como usar: Fermento para pães e biscoitos; versátil para produtos de confeitaria e outros segmentos",
    specs2: "Dosagem: Aproximadamente 1% a 4% sobre o peso da farinha de trigo | Peso líquido: 1 kg",
    tags: ["Biscoitos", "Confeitaria", "Panificação"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p6",
    slug: "preparado-para-produtos-de-panificacao",
    cat: "preparado",
    categoryLabel: "Preparados",
    name: "Preparado para Produtos de Panificação",
    desc: "Preparado líquido para apoio ao processamento em panificação, com aplicação direta na água da masseira.",
    details:
      "O Preparado para Produtos de Panificação é um preparado líquido utilizado para apoio ao processamento, com aplicação direta na água da masseira. Recomenda-se seguir a dosagem de 100 g do produto para cada 50 kg de farinha de trigo, garantindo padronização e melhor controle no preparo. Armazenar e manipular conforme boas práticas de produção.",
    imageSrc: "/Preparado para produtos da panificação.jpeg",
    imageAlt: "Preparado para Produtos de Panificação",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Água, polissorbato 80, cloreto de sódio, ácido cítrico e álcool hidratado | Glúten: Não contém | Dosagem: 100 g do produto para cada 50 kg de farinha de trigo",
    specs2: "Aplicação: Diretamente na água da masseira",
    tags: ["Panificação"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p7",
    slug: "preparado-para-untar-forma-desmoldante",
    cat: "preparado",
    categoryLabel: "Preparados",
    name: "Preparado para Untar Forma",
    desc: "Desmoldante para formas e assadeiras, com aplicação direta na quantidade necessária para a operação.",
    details:
      "O Preparado para Untar Forma é um desmoldante destinado a formas e assadeiras, facilitando a remoção do produto após o forneamento. A aplicação é feita diretamente sobre a forma/assadeira, na quantidade necessária, conforme o tipo de preparo e superfície. Recomenda-se manter em local fresco, seco e limpo, com a tampa sempre fechada, e observar as informações de alergênicos e registro aplicável.",
    imageSrc: "/Preparado para untar forma.jpeg",
    imageAlt: "Preparado para Untar Forma",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Água, óleo de soja, emulsificante lecitina de soja e éster de poliglicerol e ácido ricinoléico interesterificado | Alérgicos: Contém derivado de soja; pode conter trigo, cevada, aveia, leite e ovo | Glúten: Contém glúten",
    specs2:
      "Modo de preparo: Aplicar diretamente sobre a forma ou assadeira na quantidade necessária | Conservação: Local fresco, seco e limpo; manter tampa fechada | Registro: Dispensado de registro — ANVISA RDC nº 23, DOU 16/03/2000 | Volume: 5 L",
    tags: ["Desmoldante", "Formas"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p8",
    slug: "cacau-em-po",
    cat: "ingrediente",
    categoryLabel: "Ingredientes",
    name: "Cacau em Pó",
    desc: "Cacau em pó a partir de cacau in natura, indicado para preparos de confeitaria, sobremesas e bebidas.",
    details:
      "O Cacau em Pó é obtido a partir de cacau in natura e é indicado para formulações de confeitaria, sobremesas e bebidas. Pode ser utilizado em diferentes receitas conforme o perfil desejado de cor, sabor e intensidade, mantendo a versatilidade para uso profissional.",
    imageSrc: "/Cacau em Pó.jpeg",
    imageAlt: "Cacau em Pó",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1: "Ingredientes: Cacau in natura | Glúten: Não contém | Peso líquido: 1 kg",
    specs2: "",
    tags: ["Confeitaria"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p9",
    slug: "chocolate-em-po",
    cat: "confeitaria",
    categoryLabel: "Confeitaria",
    name: "Chocolate em Pó",
    desc: "Chocolate em pó para aplicações profissionais em confeitaria e panificação, indicado para massas, coberturas e bebidas.",
    details:
      "O Chocolate em Pó é indicado para cobrir, decorar e incorporar em massas de pães doces, folhados, brownies, bolos e tortas. Também pode ser utilizado em sobremesas, pizza e em bebidas quentes e frias, conforme a necessidade de sabor e cor do produto final. Recomenda-se seguir a dosagem e aplicação conforme a formulação desejada, observando a tabela nutricional e composição.",
    imageSrc: "/Chocolate em pó.jpeg",
    imageAlt: "Chocolate em Pó",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Cacau alcalino, açúcar refinado, soro de leite em pó, gordura de cacau e aromatizante idêntico ao natural | Glúten: Não contém | Aplicações: Cobrir, decorar e misturar à massa de pães doces, folhados, brownies, bolos, tortas, sobremesas, pizza e bebidas quentes e frias",
    specs2:
      "Tabela nutricional (por 100 g) — Valor energético: 348 kcal (17% VD) | Carboidratos: 63 g (21% VD) | Proteínas: 12 g (16% VD) | Gorduras totais: 5,4 g (10% VD) | Gorduras saturadas: 3,4 g (15% VD) | Gordura trans: 0 g (0% VD) | Fibra alimentar: 9,5 g (38% VD) | Sódio: 340 mg (14% VD) | Peso líquido: 1 kg",
    tags: ["Bolos", "Bebidas", "Confeitaria"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p10",
    slug: "creme-de-confeiteiro",
    cat: "confeitaria",
    categoryLabel: "Confeitaria",
    name: "Creme de Confeiteiro",
    desc: "Mistura em pó à base de amido para recheios e coberturas, estável, forneável e com boa retenção de água no preparo.",
    details:
      "O Creme de Confeiteiro é uma mistura em pó à base de amido, indicada para recheio e cobertura em pães, tortas, bolos, sonhos, bombas, éclair e carolinas. Após o preparo, mantém suas propriedades por longo período, não libera água e é forneável. Para melhor acabamento, recomenda-se polvilhar açúcar sobre o creme quente ou cobrir parcialmente com plástico, evitando a formação de película superficial.",
    imageSrc: "/Creme de confeiteiro.jpeg",
    imageAlt: "Creme de Confeiteiro",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Açúcar, amido de milho, sal, aromatizante e corantes artificiais | Características: Mistura em pó à base de amido; mantém propriedades inalteradas por longo período; não libera água; forneável",
    specs2:
      "Aplicações: Recheio e cobertura em pães, tortas, bolos, sonhos, bombas, éclair e carolinas | Dica: Polvilhar açúcar sobre o creme quente ou cobrir parcialmente com plástico para evitar película superficial | Peso líquido: 1 kg",
    tags: ["Recheios", "Coberturas"],
    rating: 0,
    reviewCount: 0,
  },
  {
    id: "p11",
    slug: "amido-de-milho",
    cat: "ingrediente",
    categoryLabel: "Ingredientes",
    name: "Amido de Milho",
    desc: "Amido de milho para uso em panificação e confeitaria, com armazenamento recomendado em local seco, coberto e ventilado.",
    details:
      "O Amido de Milho é indicado para uso em panificação e confeitaria, contribuindo em diferentes formulações conforme a aplicação. Recomenda-se armazenar em local seco, coberto e ventilado, em temperatura ambiente, mantendo o produto sobre estrados afastados no mínimo 40 cm das paredes. Após o uso, manter a embalagem sempre fechada para preservar as características do ingrediente.",
    imageSrc: "/Amido de milho.jpeg",
    imageAlt: "Amido de Milho",
    price: "",
    priceNumber: 0,
    priceLabel: "Consulte condições",
    specs1:
      "Ingredientes: Milho transgênico (espécies doadoras de gene: Agrobacterium tumefaciens, Bacillus thuringiensis, Streptomyces viridochromogenes, Sphingobium herbicidovorans e Zea mays) | Glúten: Não contém | Peso líquido: 1 kg",
    specs2:
      "Armazenamento: Local seco, coberto e ventilado, temperatura ambiente; manter sobre estrados afastados no mínimo 40 cm das paredes; manter embalagem fechada após o uso",
    tags: ["Confeitaria", "Panificação"],
    rating: 0,
    reviewCount: 0,
  },
];

export function getNewProducts(limit = 4): Product[] {
  return products.filter((p) => p.badgeClass === "badge-new").slice(0, limit);
}

export function getTopProducts(limit = 4): Product[] {
  return products
    .filter((p) => p.badgeClass === "badge-top" || p.badgeClass === "badge-pro")
    .slice(0, limit);
}

export function getProductsByCategory(cat: ProductCategory): Product[] {
  if (cat === "all") return products;
  return products.filter((p) => p.cat === cat);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "fermento", label: "Fermentos" },
  { key: "melhorador", label: "Melhoradores" },
  { key: "preparado", label: "Preparados" },
  { key: "conservante", label: "Conservantes" },
  { key: "confeitaria", label: "Confeitaria" },
  { key: "ingrediente", label: "Ingredientes" },
];
