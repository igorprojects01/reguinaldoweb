// ============================================================
// CONFIGURAÇÃO CENTRAL — Reginaldo Guedes Landing Page
// Edite todas as informações aqui. Não é necessário alterar
// outros arquivos para mudar textos, serviços ou contatos.
// ============================================================

const CONFIG = {

  // ── Identidade ─────────────────────────────────────────────
  professional: {
    name: "Reginaldo Guedes",
    title: "Professor de Filosofia e Ensino Religioso",
    roles: [
      "Professor de Filosofia e Ensino Religioso",
      "Escritor",
      "Foco em apoio acadêmico",
    ],
    email: "professorreginaldoguedes@gmail.com",
    heroPhoto: "public/images/professor1.png",   // FOTO DO HERO — primeira seção do site
    aboutPhoto: "public/images/professor2.png",  // FOTO DO SOBRE — seção "Quem é Reginaldo"
    photoAlt: "Retrato do professor Reginaldo Guedes",
    photoCaption: "Professor Reginaldo Guedes",
    frameNote: "Professor de Filosofia e Ensino Religioso",
    formation: "[EDITAR — Ex.: Licenciatura em Filosofia]", // campo editável
    experience: "[EDITAR — Ex.: Anos de experiência no ambiente acadêmico]", // campo editável
  },

  // ── WhatsApp ───────────────────────────────────────────────
  whatsapp: {
    number: "558381222707",
    display: "83 8122-2707",
  },

  // ── Navegação ──────────────────────────────────────────────
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Como funciona", href: "#processo" },
    { label: "Contato", href: "#contato" },
  ],

  // ── Hero ───────────────────────────────────────────────────
  hero: {
    idLine: "Apoio acadêmico para o seu percurso universitário",
    roleLine: "Professor de Filosofia e Ensino Religioso · Escritor",
    subtitle:
      "Suporte na elaboração, revisão e formatação de trabalhos acadêmicos, com a condução e o rigor de quem vive o universo acadêmico.",
    cta: "Solicitar orçamento",
    ctaSecondary: "Como funciona",
    whatsappMessage:
      "Olá, Reginaldo! Gostaria de saber mais sobre seus serviços de apoio acadêmico.",
    scrollHint: "Role para conhecer o trabalho",
  },

  // ── Frase / bloco intermediário ─────────────────────────────
  statement: {
    text:
      "O trabalho acadêmico é, antes de tudo, um exercício de pensamento. Meu papel é ajudar você a organizá-lo com clareza e rigor.",
    author: "Reginaldo Guedes",
  },

  // ── Sobre ───────────────────────────────────────────────────
  about: {
    label: "Sobre",
    title: "Professor, escritor e apoio acadêmico para quem está na universidade.",
    body:
      "Como professor de Filosofia e Ensino Religioso e escritor, conheço de perto a disciplina que um bom trabalho exige: pesquisa, estrutura, argumento e escrita clara. Dedico essa experiência ao apoio de estudantes universitários que precisam de companhia competente para transformar ideias em trabalhos bem conduzidos.",
    emailLabel: "E-mail para contato",

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
    items: [
      {
        id: "tcc",
        name: "TCC",
        category: "Trabalho de conclusão",
        description:
          "Acompanhamento na elaboração do seu Trabalho de Conclusão de Curso, do plano à versão final.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de conversar sobre um orçamento para apoio na elaboração do meu TCC.",
      },
      {
        id: "relatorio-estagio",
        name: "Relatório de estágio",
        category: "Relatório",
        description:
          "Estruturação e revisão de relatórios de estágio com organização e apresentação profissional.",
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
          "Elaboração e revisão de projetos, incluindo justificativa, metodologia e cronograma.",
        whatsappMessage:
          "Olá, Reginaldo! Tudo bem? Gostaria de um orçamento para elaboração de projeto de pesquisa.",
      },
      {
        id: "trabalho-academico",
        name: "Trabalhos acadêmicos",
        category: "Entrega",
        description:
          "Elaboração assistida de trabalhos acadêmicos em geral, com estrutura, conteúdo e coerência.",
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
          "Organização do conteúdo, definição de seções e fluxo argumentativo alinhados ao seu tema.",
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
          "Revisão e adequação de documentos acadêmicos para consistência, clareza e conformidade.",
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
        title: "O trabalho é estruturado conforme a necessidade",
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
    text: "Reginaldo Guedes — Professor · Escritor · Apoio acadêmico",
    credit: "Atendimento para estudantes universitários",
  },
};