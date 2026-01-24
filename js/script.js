// ================== BANCO DE DADOS (SIMULADO) ==================
let registros = [
  {
    turma: 'Berçário',
    professor: 'Ana Paula',
    data: '2023-10-15',
    presentes: 8,
    total: 10,
    visitantes: 'Laura Mendes',
  },
  {
    turma: 'Maternal',
    professor: 'Carla Souza',
    data: '2023-10-15',
    presentes: 12,
    total: 15,
    visitantes: '-',
  },
  {
    turma: 'Principiantes',
    professor: 'Rafael Lima',
    data: '2023-10-15',
    presentes: 18,
    total: 20,
    visitantes: 'João Pedro',
  },
  {
    turma: 'Juniores',
    professor: 'Marcos Silva',
    data: '2023-10-15',
    presentes: 22,
    total: 25,
    visitantes: '-',
  },
  {
    turma: 'Intermediários',
    professor: 'Luciana Rocha',
    data: '2023-10-15',
    presentes: 30,
    total: 35,
    visitantes: 'Carlos André',
  },
  {
    turma: 'Jovens',
    professor: 'João Paulo',
    data: '2023-10-15',
    presentes: 42,
    total: 50,
    visitantes: '-',
  },
  {
    turma: 'Adultos',
    professor: 'Maria Silva',
    data: '2023-10-15',
    presentes: 35,
    total: 40,
    visitantes: 'Pedro Henrique',
  },
];

const alunosData = {
  Berçário: ['Lucas Baby', 'Ana Clara', 'Miguelzinho', 'Helena Baby'],
  Maternal: ['Joãozinho', 'Mariana', 'Davi', 'Sofia'],
  Principiantes: [
    'Cauã Silva',
    'Beatriz Santos',
    'Daniel Oliveira',
    'Enzo Gabriel',
    'Helena Costa',
  ],
  Juniores: ['Pedro Lucas', 'Ana Júlia', 'Gustavo Lima', 'Larissa Rocha'],
  Intermediários: [
    'Lucas Gabriel',
    'Mariana Lima',
    'Felipe Costa',
    'Amanda Rocha',
  ],
  Jovens: [
    'João Pedro',
    'Camila Santos',
    'Matheus Oliveira',
    'Bianca Lima',
    'Gustavo Henrique',
  ],
  Adultos: [
    'Ricardo Alves',
    'Teresa Cristina',
    'Marcos Paulo',
    'Juliana Nunes',
  ],
};

// ================== AUTENTICAÇÃO ==================
function handleLogout() {
  if (confirm('Deseja sair do sistema?')) {
    localStorage.removeItem('auth');
    window.location.replace('login.html');
  }
}

// ================== MODAL REGISTRO ==================
function toggleModal() {
  const modal = document.getElementById('modal-registro');
  const containerChamada = document.getElementById('container-chamada');

  if (!modal) return;

  modal.classList.toggle('hidden');
  containerChamada?.classList.add('hidden');
}

// ================== TURMAS (CARDS) ==================
function renderizarTurmas() {
  const container = document.getElementById('lista-turmas');
  if (!container) return;

  container.innerHTML = '';

  Object.keys(alunosData).forEach((turma) => {
    const reg = registros.find((r) => r.turma === turma);

    container.innerHTML += `
      <div class="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">${turma}</h3>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
            ${reg?.presentes || 0}/${reg?.total || alunosData[turma].length}
          </span>
        </div>

        <p class="text-sm text-gray-600">
          Professor: ${reg?.professor || '-'}
        </p>

        <button
          type="button"
          onclick="abrirPresenca('${turma}')"
          class="mt-auto h-10 bg-primary text-white rounded-xl font-bold"
        >
          Abrir Presença
        </button>
      </div>
    `;
  });
}

// ================== ABRIR PRESENÇA ==================
function abrirPresenca(turma) {
  toggleModal();

  const reg = registros.find((r) => r.turma === turma);

  document.getElementById('reg-turma').value = turma;
  document.getElementById('reg-professor').value = reg?.professor || '';
  document.getElementById('reg-data').value =
    reg?.data || new Date().toISOString().split('T')[0];
  document.getElementById('reg-visitantes').value =
    reg?.visitantes !== '-' ? reg.visitantes : '';

  carregarAlunos();

  document
    .querySelectorAll('#lista-alunos input[type="checkbox"]')
    .forEach((cb, i) => {
      cb.checked = i < (reg?.presentes || 0);
    });
}

// ================== CARREGAR ALUNOS ==================
function carregarAlunos() {
  const turma = document.getElementById('reg-turma').value;
  const lista = document.getElementById('lista-alunos');
  const container = document.getElementById('container-chamada');

  if (!lista || !container) return;

  lista.innerHTML = '';

  if (alunosData[turma]) {
    container.classList.remove('hidden');

    alunosData[turma].forEach((aluno) => {
      lista.innerHTML += `
        <label class="flex justify-between items-center p-2 rounded hover:bg-gray-100">
          <span>${aluno}</span>
          <input type="checkbox" class="size-5 rounded text-primary" />
        </label>
      `;
    });
  }
}

// ================== SALVAR REGISTRO ==================
function salvarRegistro(e) {
  e.preventDefault();

  const turma = document.getElementById('reg-turma').value;
  const presentes = document.querySelectorAll('#lista-alunos input:checked').length;
  const total = document.querySelectorAll('#lista-alunos input').length;

  registros.unshift({
    turma,
    professor: document.getElementById('reg-professor').value,
    data: document.getElementById('reg-data').value,
    presentes,
    total,
    visitantes: document.getElementById('reg-visitantes').value || '-',
  });

  toggleModal();
  renderizarTurmas();
  renderizarListaPresencas();
}

// ================== LISTA DE PRESENÇAS ==================
function renderizarListaPresencas() {
  const tabela = document.getElementById('tabela-corpo');
  if (!tabela) return;

  tabela.innerHTML = '';

  registros.forEach((reg, index) => {
    tabela.innerHTML += `
      <tr class="border-t hover:bg-gray-50">
        <td class="px-6 py-4 font-semibold">${reg.turma}</td>
        <td class="px-6 py-4">${reg.professor}</td>
        <td class="px-6 py-4">${formatarData(reg.data)}</td>
        <td class="px-6 py-4 text-center font-bold text-green-600">
          ${reg.presentes}/${reg.total}
        </td>
        <td class="px-6 py-4 text-center">
          ${reg.visitantes}
        </td>
        <td class="px-6 py-4 text-right flex justify-end gap-3">

          <button
            onclick="abrirModalVisualizar(${index})"
            class="text-primary hover:text-blue-700"
            title="Visualizar"
          >
            <span class="material-symbols-outlined">visibility</span>
          </button>

          <button
            onclick="removerRegistro(${index})"
            class="text-red-500 hover:text-red-700"
            title="Excluir"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>

        </td>
      </tr>
    `;
  });
}

// ================== MODAL VISUALIZAR ==================
function abrirModalVisualizar(index) {
  const reg = registros[index];
  if (!reg) return;

  document.getElementById('view-turma').innerText = reg.turma;
  document.getElementById('view-professor').innerText = reg.professor;
  document.getElementById('view-data').innerText = formatarData(reg.data);
  document.getElementById('view-presentes').innerText =
    `${reg.presentes}/${reg.total}`;
  document.getElementById('view-visitantes').innerText =
    reg.visitantes && reg.visitantes !== '-' ? reg.visitantes : 'Nenhum';

  document.getElementById('modal-visualizar').classList.remove('hidden');
}

function fecharModalVisualizar() {
  document.getElementById('modal-visualizar').classList.add('hidden');
}

// ================== REMOVER REGISTRO ==================
function removerRegistro(index) {
  if (!confirm('Deseja excluir este registro?')) return;

  registros.splice(index, 1);
  renderizarListaPresencas();
  renderizarTurmas();
}

// ================== UTIL ==================
function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

// ================== SIDEBAR MOBILE ==================
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('-translate-x-full');
  document.getElementById('overlay').classList.toggle('hidden');
}

// ================== INICIALIZA ==================
document.addEventListener('DOMContentLoaded', () => {
  renderizarTurmas();
  renderizarListaPresencas();
});
