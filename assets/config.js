/* =========================================================
   CONFIG ÚNICA DO SITE — mude aqui o nome da marca e links.
   (Para os <title>/meta estáticos, corra: python3 tools/rebrand.py)
   ========================================================= */
window.SITE_CONFIG = {
  brand: "Quiet Margin Studio",                 // nome da marca (placeholder)
  siteUrl: "https://guilhermegarcia-pascoa.github.io/quietmarginstudio",   // domínio final (TBD)
  shopUrl: "#",                     // loja Etsy/Payhip (TBD)
  contactEmail: "",                 // opcional
  products: [
    { id: "orcamento",   url: "#", icon: "💶", pt: ["Folha de orçamento mensal", "Excel / Google Sheets com regra 50/30/20, gráficos e resumo anual."], en: ["Monthly budget spreadsheet", "Excel / Google Sheets with 50/30/20 rule, charts and yearly summary."] },
    { id: "candidaturas",url: "#", icon: "📋", pt: ["Tracker de candidaturas", "Organize candidaturas a empregos e estágios, entrevistas e follow-ups."], en: ["Job & internship tracker", "Track job and internship applications, interviews and follow-ups."] },
    { id: "cv",          url: "#", icon: "📄", pt: ["Modelos de CV (PT/EN)", "Modelos editáveis em Word e Google Docs, prontos para ATS."], en: ["CV templates (PT/EN)", "Editable Word and Google Docs templates, ATS-friendly."] },
    { id: "estudo",      url: "#", icon: "🎓", pt: ["Planner de estudo universitário", "Semestres, cadeiras, avaliações, horários e média."], en: ["University study planner", "Semesters, courses, exams, timetables and GPA."] },
    { id: "produtividade",url:"#", icon: "✅", pt: ["Planner de produtividade", "Planeamento semanal, prioridades e objetivos."], en: ["Productivity planner", "Weekly planning, priorities and goals."] },
    { id: "habitos",     url: "#", icon: "🔁", pt: ["Tracker de hábitos", "Acompanhe hábitos diários com sequências e estatísticas."], en: ["Habit tracker", "Track daily habits with streaks and stats."] },
    { id: "faturas",     url: "#", icon: "🧾", pt: ["Controlo de faturas e despesas", "Registe faturas e despesas por categoria e mês."], en: ["Invoice & expense tracker", "Log invoices and expenses by category and month."] },
    { id: "refeicoes",   url: "#", icon: "🥗", pt: ["Planner de refeições", "Menu semanal e lista de compras automática."], en: ["Meal planner", "Weekly menu and automatic shopping list."] }
  ]
};
