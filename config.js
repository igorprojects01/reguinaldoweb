// ============================================================
// CONFIGURAÇÃO CENTRAL — Site multipágina Assessoria Company
// Edite TODAS as informações aqui. Não é necessário alterar
// outros arquivos para mudar textos, imagens, serviços ou contatos.
// ------------------------------------------------------------
// COMO TROCAR IMAGENS:
// - companyLogo       → logo da Assessoria Company
// - companyBackground → imagem de fundo da seção "Conheça nossa empresa"
// - heroPhoto / aboutPhoto → fotos de Reginaldo
// Basta trocar o caminho do arquivo. Ex.:
// companyBackground: "public/images/minha-foto-formatura.jpg"
// ============================================================

const CONFIG = {

  // ── Site / URLs ──────────────────────────────────────────
  site: {
    baseUrl: "", // ex.: "https://seudominio.com.br" (opcional)
  },

  // ── Identidade — Reginaldo ───────────────────────────────
  professional: {
    name: "Reginaldo Guedes",
    title: "Professor de Filosofia e Ensino Religioso",
    roles: [
      "Professor de Filosofia e Ensino Religioso",
      "Escritor",
      "Foco em apoio acadêmico",
    ],
    email: "professorreginaldoguedes@gmail.com",
    photo: "public/images/reguinaldo1.png",       // FOTO DE REGINALDO — troque aqui se desejar
    aboutPhoto: "public/images/reguinaldo1.png",  // FOTO DE REGINALDO — seção "Conheça nossa empresa"
    photoAlt: "Reginaldo Guedes",
    photoCaption: "Reginaldo Guedes",
    frameNote: "Professor de Filosofia e Ensino Religioso",
    formation: "[EDITAR — Ex.: Licenciatura em Filosofia]", // campo editável: preencha com a sua formação
    experience: "[EDITAR — Ex.: Anos de experiência no ambiente acadêmico]", // campo editável: preencha com a sua experiência
  },

  // ── Empresa — Assessoria Company ───────────────────────────
  // ★ EDITE AQUI: logo, imagem, ano, textos institucionais ★
  company: {
    name: "Assessoria Company",
    shortName: "Assessoria Company",
    foundedYear: "2022",
    foundedLabel: "Início da nossa trajetória",
    foundedBadge: "Desde",
    slogan: "Sua Jornada Acadêmica com Suporte Profissional!",
    // ▼▼▼ TROQUE OS ARQUIVOS AQUI ▼▼▼
    companyLogo: "public/images/logo.png",       // LOGO do navbar (só ícone)
    companyLogoFull: "public/images/logo2.png",  // LOGO completa (ícone + texto)
    companyBackground: "public/images/graduation-bg.jpg",   // Imagem de fundo da seção empresa
    companyBackgroundOverlay: "rgba(6, 42, 22, 0.90)",       // Overlay verde-floresta profundo (0.0–1.0 — ajuste a opacidade)
    // ▲▲▲ FIM DA ÁREA DE TROCA ▲▲▲
    logoAlt: "Logotipo da Assessoria Company",
    eyebrow: "Conheça nossa empresa",
    title: "Suporte, consultoria e orientação para a sua trajetória acadêmica.",
    intro:
      "A Assessoria Company é uma empresa dedicada ao suporte, à consultoria e à orientação acadêmica — criada para acompanhar estudantes na organização e no desenvolvimento de suas atividades ao longo da trajetória educacional.",
    paragraphs: [
      "Nosso trabalho é conduzido com compromisso, qualidade, responsabilidade, sigilo e atendimento personalizado. Oferecemos orientação para TCCs, projetos, artigos, relatórios de estágio, planos de aula, atividades acadêmicas, trabalhos científicos, apresentações e diversos outros serviços.",
      "Antes de cada entrega, buscamos compreender as necessidades de cada estudante para propor um acompanhamento organizado, claro e alinhado às exigências da sua instituição de ensino.",
    ],
    values: [
      { label: "Compromisso", text: "Atenção dedicada a cada etapa do seu trabalho." },
      { label: "Qualidade", text: "Rigor na estrutura, no conteúdo e na escrita." },
      { label: "Responsabilidade", text: "Prazos e exigências institucionais respeitados." },
      { label: "Sigilo", text: "Suas informações tratadas com total confidencialidade." },
      { label: "Atendimento personalizado", text: "Orientação ajustada ao seu curso e objetivo." },
    ],
    coverageLabel: "Áreas de orientação",
    coverage: [
      "TCCs",
      "Projetos",
      "Artigos",
      "Relatórios de estágio",
      "Planos de aula",
      "Atividades acadêmicas",
      "Trabalhos científicos",
      "Apresentações",
    ],
  },

  // ── WhatsApp ───────────────────────────────────────────────
  whatsapp: {
    number: "558381222707",
    display: "83 8122-2707",
  },

  // ── Navegação multipágina ────────────────────────────────
  // page = identificador usado em <body data-page="..."> para marcar o item ativo
  nav: [
    { label: "Início", href: "index.html", page: "inicio" },
    { label: "Conheça nossa empresa", href: "empresa.html", page: "empresa" },
    { label: "Serviços", href: "servicos.html", page: "servicos" },
    { label: "Como funciona", href: "como-funciona.html", page: "processo" },
    { label: "Contato", href: "contato.html", page: "contato" },
  ],

  // ── Hero (Início) ────────────────────────────────────────
  hero: {
    idLine: "Apoio acadêmico para o seu percurso universitário",
    roleLine: "Professor de Filosofia e Ensino Religioso · Escritor",
    subtitle:
      "Suporte na elaboração, revisão e formatação de trabalhos acadêmicos, com o rigor de quem vive o universo acadêmico.",
    cta: "Solicitar orçamento",
    ctaSecondary: "Conhecer serviços",
    ctaSecondaryHref: "servicos.html",
    whatsappMessage:
      "Olá, Reginaldo! Gostaria de saber mais sobre seus serviços de apoio acadêmico.",
    scrollHint: "Role para conhecer o trabalho",
  },

  // ── Home (capa editorial da Assessoria Company) ──────────
  // A frase principal da Home é CONFIG.hero.subtitle (mantida EXATAMENTE como está).
  home: {
    eyebrow: "Assessoria Company · Desde 2022",
    // Espaço do logo: exibe CONFIG.company.companyLogo; se o arquivo
    // ainda não existir, o espaço fica oculto até o logo ser adicionado.
    exploreLine: "Uma porta de entrada — explore o site e conheça o restante.",
    ctaPrimary: { label: "Conheça nossa empresa", href: "empresa.html" },
    ctaSecondary: { label: "Conheça nossos serviços", href: "servicos.html" },
    indexLabel: "Explore",
  },

  // ── Frase / bloco intermediário ─────────────────────────────
  statement: {
    text:
      "O trabalho acadêmico é, antes de tudo, um exercício de pensamento. Meu papel é ajudar você a organizá-lo com clareza e rigor.",
    author: "Reginaldo Guedes",
  },

  // ── Sobre Reginaldo (usado na página Empresa, parte 02) ──
  about: {
    label: "Sobre",
    eyebrowNumber: "02",
    eyebrowText: "Conheça Reginaldo",
    title: "Professor, escritor e apoio acadêmico para quem está na universidade.",
    body:
      "Como professor de Filosofia e Ensino Religioso e escritor, conheço de perto a disciplina que um bom trabalho exige: pesquisa, estrutura, argumento e escrita clara. Dedico essa experiência ao apoio de estudantes universitários que precisam de acompanhamento competente para transformar ideias em trabalhos bem conduzidos.",
    emailLabel: "E-mail para contato",

    // Mini biografia exibida na coluna esquerda acima da foto
    miniBio: {
      kicker: "Mini Biografia",
      title: "Docência, reflexão e rigor na escrita acadêmica.",
      text: "Com trajetória dedicada ao ensino e à produção intelectual, o professor Reginaldo Guedes alia o rigor metodológico a um acompanhamento próximo e individualizado. Seu trabalho orienta estudantes universitários na estruturação de pesquisas, artigos e trabalhos acadêmicos com clareza conceitual e conformidade técnica.",
    },

    // Áreas de atuação — bloco decorativo acima da foto (separadas por "·")
    areas: ["RELIGIOSO", "ESCRITA ACADÊMICA"],

    // Informações de perfil exibidas como lista editorial
    roles: [
      { label: "Atuação", text: "Professor de Filosofia e Ensino Religioso" },
      { label: "Área", text: "Escritor e apoio acadêmico" },
      { label: "Foco", text: "Elaboração, revisão e formatação de trabalhos" },
    ],

    // Campos ainda não preenchidos — editáveis no código
    fields: [
      { label: "Formação", value: "[EDITAR — Ex.: Licenciatura em Filosofia]" },
      { label: "Experiência", value: "[EDITAR — Ex.: Atuação no ensino e apoio acadêmico]" },
    ],
  },

  // ── Serviços ────────────────────────────────────────────────
  services: {
    label: "Serviços",
    title: "Como posso acompanhar o seu trabalho acadêmico",
    subtitle:
      "Uma lista clara de apoio para cada etapa do seu percurso — do planejamento à entrega final.",
    ctaLabel: "Consultar orçamento",
    items: [
      {
        id: "tcc",
        name: "TCC",
        category: "Trabalho de conclusão",
        description:
          "Acompanhamento na elaboração do seu Trabalho de Conclusão de Curso, do planejamento à versão final.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de conversar sobre um orçamento para apoio na elaboração do meu TCC.",
      },
      {
        id: "relatorio-estagio",
        name: "Relatório de estágio",
        category: "Relatório",
        description:
          "Estruturação e revisão de relatórios de estágio, com apresentação clara e profissional.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de conversar sobre um orçamento para apoio no meu relatório de estágio.",
      },
      {
        id: "artigo-academico",
        name: "Artigos acadêmicos",
        category: "Redação",
        description:
          "Apoio na redação e estruturação de artigos, com atenção à metodologia e às normas de publicação.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de conversar sobre um orçamento para apoio com um artigo acadêmico.",
      },
      {
        id: "projeto-pesquisa",
        name: "Projetos de pesquisa",
        category: "Pesquisa",
        description:
          "Elaboração e revisão de projetos de pesquisa, incluindo justificativa, metodologia e cronograma.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de um orçamento para elaboração de projeto de pesquisa.",
      },
      {
        id: "trabalho-academico",
        name: "Trabalhos acadêmicos",
        category: "Entrega",
        description:
          "Elaboração assistida de trabalhos acadêmicos em geral, com estrutura, coerência e conteúdo consistente.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de saber mais sobre seus serviços para trabalhos acadêmicos.",
      },
      {
        id: "revisao-textual",
        name: "Revisão textual",
        category: "Revisão",
        description:
          "Revisão ortográfica, gramatical e de estilo para um texto claro, coeso e profissional.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Preciso de revisão textual em um trabalho acadêmico. Pode me enviar um orçamento?",
      },
      {
        id: "estruturacao",
        name: "Estruturação de trabalhos",
        category: "Organização",
        description:
          "Organização do conteúdo, definição de seções e fluxo argumentativo alinhado ao seu tema.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Preciso de ajuda para estruturar um trabalho acadêmico. Podemos conversar?",
      },
      {
        id: "formatacao-abnt",
        name: "Formatação acadêmica e ABNT",
        category: "Normas",
        description:
          "Formatação completa e adequação às normas ABNT: capa, sumário, referências e espaçamento.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Preciso de formatação acadêmica em normas ABNT. Podemos conversar sobre valores?",
      },
      {
        id: "apresentacoes",
        name: "Apresentações acadêmicas",
        category: "Apresentação",
        description:
          "Criação e organização de slides para defesas, seminários e trabalhos acadêmicos.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de ajuda com uma apresentação acadêmica. Pode me enviar um orçamento?",
      },
      {
        id: "documentos-academicos",
        name: "Organização e revisão de documentos",
        category: "Documentos",
        description:
          "Revisão e adequação de documentos acadêmicos para garantir consistência, clareza e conformidade.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Preciso revisar e adequar um documento acadêmico. Qual seria o orçamento?",
      },
      {
        id: "outros",
        name: "Outros serviços acadêmicos",
        category: "Sob consulta",
        description:
          "Tem uma necessidade específica? Entre em contato para conversarmos sobre como posso ajudar.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Tenho uma demanda acadêmica e gostaria de saber se você pode me ajudar.",
      },
    ],
  },

  // ── Como funciona ───────────────────────────────────────────
  process: {
    label: "Como funciona",
    title: "Um percurso simples, conduzido com atenção",
    note: "Sem compromisso. Conte sua necessidade e receba uma orientação clara pelo WhatsApp.",
    steps: [
      {
        title: "Você explica sua necessidade",
        description:
          "Pelo WhatsApp, conte o tipo de trabalho, o prazo e os detalhes que já tem.",
      },
      {
        title: "Conversamos pelo WhatsApp",
        description:
          "Alinhamos expectativas e você fala diretamente com Reginaldo.",
      },
      {
        title: "Definimos o serviço e o orçamento",
        description:
          "Com base na demanda, você recebe o serviço certo e os valores sem surpresa.",
      },
      {
        title: "Estruturamos o trabalho conforme a sua necessidade",
        description:
          "Acompanhamos a estruturação e a entrega, com revisão atenta até o final.",
      },
    ],
  },

  // ── Contato final ───────────────────────────────────────────
  contact: {
    label: "Contato",
    title: "Vamos conversar sobre o seu próximo trabalho?",
    subtitle:
      "Conte o que você precisa e receba uma orientação pelo WhatsApp.",
    cta: "Falar no WhatsApp",
    whatsappMessage:
      "Olá, Reginaldo! Gostaria de conversar sobre seus serviços de apoio acadêmico.",
  },

  // ── Rodapé ──────────────────────────────────────────────────
  footer: {
    text: "Assessoria Company — Suporte, consultoria e orientação acadêmica",
    credit: "Atendimento para estudantes universitários",
  },
};
