const classes = [
  {
    id: "A1",
    name: "Oficina Criativa",
    schedule: "Segundas e quartas · 14h",
    color: "purple",
  },
  {
    id: "B2",
    name: "Expressão Corporal",
    schedule: "Terças e quintas · 16h",
    color: "teal",
  },
  {
    id: "C3",
    name: "Teatro Inicial",
    schedule: "Sextas · 10h",
    color: "orange",
  },
];
const students = [
  {
    id: "Aluno Demo 001",
    classId: "A1",
    state: "Ativo",
    payment: "Pago",
    amount: 180,
  },
  {
    id: "Aluno Demo 002",
    classId: "A1",
    state: "Ativo",
    payment: "Pendente",
    amount: 180,
  },
  {
    id: "Aluno Demo 003",
    classId: "B2",
    state: "Ativo",
    payment: "Pago",
    amount: 210,
  },
  {
    id: "Aluno Demo 004",
    classId: "B2",
    state: "Experimental",
    payment: "Não se aplica",
    amount: 0,
  },
  {
    id: "Aluno Demo 005",
    classId: "C3",
    state: "Ativo",
    payment: "Pendente",
    amount: 160,
  },
  {
    id: "Aluno Demo 006",
    classId: "C3",
    state: "Ativo",
    payment: "Pago",
    amount: 160,
  },
];
const contacts = [
  {
    ref: "Contato Demo 001",
    type: "Mensalidade",
    context: "Revisar situação de pagamento no exemplo.",
  },
  {
    ref: "Contato Demo 002",
    type: "Participação",
    context: "Entender interesse em uma turma fictícia.",
  },
  {
    ref: "Contato Demo 003",
    type: "Mensalidade",
    context: "Confirmar uma informação do cadastro fictício.",
  },
];
const money = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
const className = (id) =>
  classes.find((item) => item.id === id)?.name ?? "Sem turma";
const textCell = (text) => {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
};
const badgeCell = (text) => {
  const cell = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `badge ${text === "Pago" || text === "Ativo" ? "success" : text === "Pendente" ? "pending" : "neutral"}`;
  badge.textContent = text;
  cell.append(badge);
  return cell;
};
function renderStudents() {
  const query = document
    .querySelector("#student-search")
    .value.trim()
    .toLocaleLowerCase("pt-BR");
  const matches = students.filter((student) =>
    `${student.id} ${className(student.classId)} ${student.state}`
      .toLocaleLowerCase("pt-BR")
      .includes(query),
  );
  const rows = matches.map((student) => {
    const row = document.createElement("tr");
    row.append(
      textCell(student.id),
      textCell(className(student.classId)),
      badgeCell(student.state),
      badgeCell(student.payment),
    );
    return row;
  });
  document.querySelector("#student-rows").replaceChildren(...rows);
  document
    .querySelector("#students-empty")
    .classList.toggle("hidden", matches.length > 0);
}
function renderClasses() {
  const root = document.querySelector("#class-grid");
  root.replaceChildren();
  const overview = document.querySelector("#overview-classes");
  overview.replaceChildren();
  for (const course of classes) {
    const count = students.filter(
      (student) => student.classId === course.id,
    ).length;
    const card = document.createElement("article");
    card.className = `class-card ${course.color}`;
    card.innerHTML = `<span class="class-icon" aria-hidden="true">✦</span><span class="class-id">TURMA ${course.id}</span><h2>${course.name}</h2><p>${course.schedule}</p><div><span>${count} alunos fictícios</span><span>Ver detalhes no painel</span></div>`;
    root.append(card);
    const line = document.createElement("div");
    line.className = "overview-class";
    const name = document.createElement("strong");
    name.textContent = course.name;
    const details = document.createElement("span");
    details.textContent = `${count} alunos · ${course.schedule}`;
    line.append(name, details);
    overview.append(line);
  }
}
function renderFinance() {
  const billable = students.filter((student) => student.amount > 0);
  const paid = billable.filter((student) => student.payment === "Pago");
  const pending = billable.filter((student) => student.payment === "Pendente");
  document.querySelector("#finance-total").textContent = money(
    billable.reduce((sum, student) => sum + student.amount, 0),
  );
  document.querySelector("#finance-paid").textContent = money(
    paid.reduce((sum, student) => sum + student.amount, 0),
  );
  document.querySelector("#finance-pending").textContent = money(
    pending.reduce((sum, student) => sum + student.amount, 0),
  );
  document.querySelector("#finance-rows").replaceChildren(
    ...billable.map((student) => {
      const row = document.createElement("tr");
      row.append(
        textCell(student.id),
        textCell(className(student.classId)),
        textCell(money(student.amount)),
        badgeCell(student.payment),
      );
      return row;
    }),
  );
}
let recoveryFilter = "Todos";
function renderRecovery() {
  const matches = contacts.filter(
    (contact) => recoveryFilter === "Todos" || contact.type === recoveryFilter,
  );
  document.querySelector("#recovery-count").textContent =
    `${matches.length} itens fictícios`;
  const root = document.querySelector("#recovery-list");
  root.replaceChildren(
    ...matches.map((contact) => {
      const row = document.createElement("article");
      row.className = "recovery-item";
      const badge = document.createElement("span");
      badge.textContent = contact.type;
      const title = document.createElement("strong");
      title.textContent = contact.ref;
      const detail = document.createElement("p");
      detail.textContent = contact.context;
      row.append(badge, title, detail);
      return row;
    }),
  );
}
const pages = {
  overview: [
    "Visão geral",
    "Bem-vindo ao seu painel.",
    "Uma visão clara das rotinas para organizar o dia a dia da escola.",
  ],
  students: [
    "Alunos",
    "Cadastros organizados.",
    "Encontre rapidamente os registros fictícios desta demonstração.",
  ],
  classes: [
    "Turmas",
    "Cada turma em seu lugar.",
    "Horários e participantes reunidos em uma visualização simples.",
  ],
  finance: [
    "Financeiro",
    "Visão financeira sem ruído.",
    "Valores ilustrativos para demonstrar organização e status.",
  ],
  recovery: [
    "Recuperação",
    "Acompanhe os próximos contatos.",
    "Uma fila visual para revisão manual, sem disparos automáticos.",
  ],
};
function showView(view, focus = true) {
  document
    .querySelectorAll(".view")
    .forEach((section) =>
      section.classList.toggle("hidden", section.id !== `${view}-view`),
    );
  document
    .querySelectorAll(".nav-item")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.view === view),
    );
  const [label, title, subtitle] = pages[view];
  document.querySelector("#view-label").textContent = label;
  document.querySelector("#page-title").textContent = title;
  document.querySelector("#page-subtitle").textContent = subtitle;
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#menu-button").setAttribute("aria-expanded", "false");
  if (focus) document.querySelector("#main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelector("#stat-students").textContent = String(students.length);
document.querySelector("#stat-classes").textContent = String(classes.length);
document.querySelector("#stat-open").textContent = String(
  students.filter((student) => student.payment === "Pendente").length,
);
document.querySelector("#stat-recovery").textContent = String(contacts.length);
document
  .querySelector("#student-search")
  .addEventListener("input", renderStudents);
document
  .querySelectorAll("[data-view]")
  .forEach((button) =>
    button.addEventListener("click", () => showView(button.dataset.view)),
  );
document.querySelectorAll("[data-recovery-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    recoveryFilter = button.dataset.recoveryFilter;
    document.querySelectorAll("[data-recovery-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderRecovery();
  }),
);
document.querySelector("#menu-button").addEventListener("click", (event) => {
  const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
  event.currentTarget.setAttribute("aria-expanded", String(!expanded));
  document.querySelector("#sidebar").classList.toggle("open", !expanded);
});
renderStudents();
renderClasses();
renderFinance();
renderRecovery();
showView("overview", false);
