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

// ================== FUNÇÕES ==================
function handleLogout() {
  if (confirm('Deseja sair do sistema?')) {
    alert('Logout realizado');
  }
}

function renderizarTurmas() {
  const container = document.getElementById('lista-turmas');
  container.innerHTML = '';

  Object.keys(alunosData).forEach((turma) => {
    const reg = registros.find((r) => r.turma === turma);

    container.innerHTML += `
      <div class="bg-white rounded-2xl p-6 shadow flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">${turma}</h3>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-gray-200">
            ${reg?.presentes || 0}/${reg?.total || alunosData[turma].length}
          </span>
        </div>

        <p class="text-sm text-gray-600">
          Professor: ${reg?.professor || '-'}
        </p>

        <button
          onclick="abrirPresenca('${turma}')"
          class="mt-auto h-10 bg-blue-600 text-white rounded-xl font-bold"
        >
          Abrir Presença
        </button>
      </div>
    `;
  });
}

function toggleModal() {
  document.getElementById('modal-registro').classList.toggle('hidden');
  document.getElementById('container-chamada').classList.add('hidden');
}

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

  const checks = document.querySelectorAll('#lista-alunos input');
  checks.forEach((c, i) => (c.checked = i < (reg?.presentes || 0)));
}

function carregarAlunos() {
  const turma = document.getElementById('reg-turma').value;
  const lista = document.getElementById('lista-alunos');
  const container = document.getElementById('container-chamada');

  lista.innerHTML = '';

  if (alunosData[turma]) {
    container.classList.remove('hidden');

    alunosData[turma].forEach((aluno) => {
      lista.innerHTML += `
        <label class="flex justify-between items-center p-2 rounded hover:bg-gray-100">
          <span>${aluno}</span>
          <input type="checkbox" class="size-5">
        </label>
      `;
    });
  }
}

function salvarRegistro(e) {
  e.preventDefault();

  const turma = document.getElementById('reg-turma').value;
  const presentes = document.querySelectorAll(
    '#lista-alunos input:checked'
  ).length;
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
}

document.addEventListener('DOMContentLoaded', renderizarTurmas);
