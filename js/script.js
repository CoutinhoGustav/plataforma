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

// ================== TURMAS ==================
function renderizarTurmas() {
  const container = document.getElementById('lista-turmas');

  // 👇 evita erro se a página não tiver essa div
  if (!container) return;

  container.innerHTML = '';

  Object.keys(alunosData).forEach((turma) => {
    const reg = registros.find((r) => r.turma === turma);

    container.innerHTML += `
      <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold dark:text-white">${turma}</h3>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
            ${reg?.presentes || 0}/${reg?.total || alunosData[turma].length}
          </span>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400">
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

// ================== MODAL ==================
function toggleModal() {
  const modal = document.getElementById('modal-registro');
  const containerChamada = document.getElementById('container-chamada');

  if (!modal) return;

  modal.classList.toggle('hidden');

  if (containerChamada) {
    containerChamada.classList.add('hidden');
  }
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

  const checks = document.querySelectorAll('#lista-alunos input[type="checkbox"]');
  checks.forEach((cb, i) => {
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
        <label class="flex justify-between items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <span class="dark:text-white">${aluno}</span>
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
  const presentes = document.querySelectorAll(
    '#lista-alunos input:checked'
  ).length;
  const total = document.querySelectorAll(
    '#lista-alunos input'
  ).length;

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
}

// ================== INICIALIZA ==================
document.addEventListener('DOMContentLoaded', () => {
  renderizarTurmas();
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('overlay')

  sidebar.classList.toggle('-translate-x-full')
  overlay.classList.toggle('hidden')
}