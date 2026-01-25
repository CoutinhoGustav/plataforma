// =======================================================
// DADOS (BANCO SIMULADO)
// =======================================================

let registros = [
  { turma: 'Berçário', professor: 'Ana Paula', data: '2023-10-15', presentes: 8, total: 10, visitantes: 'Laura Mendes' },
  { turma: 'Maternal', professor: 'Carla Souza', data: '2023-10-15', presentes: 12, total: 15, visitantes: '-' },
  { turma: 'Principiantes', professor: 'Rafael Lima', data: '2023-10-15', presentes: 18, total: 20, visitantes: 'João Pedro' },
  { turma: 'Juniores', professor: 'Marcos Silva', data: '2023-10-15', presentes: 22, total: 25, visitantes: '-' },
  { turma: 'Intermediários', professor: 'Luciana Rocha', data: '2023-10-15', presentes: 30, total: 35, visitantes: 'Carlos André' },
  { turma: 'Jovens', professor: 'João Paulo', data: '2023-10-15', presentes: 42, total: 50, visitantes: '-' },
  { turma: 'Adultos', professor: 'Maria Silva', data: '2023-10-15', presentes: 35, total: 40, visitantes: 'Pedro Henrique' },
]

const alunosData = {
  Berçário: ['Lucas Baby', 'Ana Clara', 'Miguelzinho', 'Helena Baby'],
  Maternal: ['Joãozinho', 'Mariana', 'Davi', 'Sofia'],
  Principiantes: ['Cauã Silva', 'Beatriz Santos', 'Daniel Oliveira', 'Enzo Gabriel', 'Helena Costa'],
  Juniores: ['Pedro Lucas', 'Ana Júlia', 'Gustavo Lima', 'Larissa Rocha'],
  Intermediários: ['Lucas Gabriel', 'Mariana Lima', 'Felipe Costa', 'Amanda Rocha'],
  Jovens: ['João Pedro', 'Camila Santos', 'Matheus Oliveira', 'Bianca Lima', 'Gustavo Henrique'],
  Adultos: ['Ricardo Alves', 'Teresa Cristina', 'Marcos Paulo', 'Juliana Nunes'],
}

// =======================================================
// HELPERS
// =======================================================

const $ = (id) => document.getElementById(id)

// =======================================================
// AUTENTICAÇÃO
// =======================================================

function handleLogout() {
  if (confirm('Deseja sair do sistema?')) {
    localStorage.removeItem('auth')
    window.location.href = 'login.html'
  }
}

// =======================================================
// SIDEBAR
// =======================================================

function toggleSidebar() {
  const sidebar = $('sidebar')
  const overlay = $('overlay')
  if (!sidebar || !overlay) return

  sidebar.classList.toggle('-translate-x-full')
  overlay.classList.toggle('hidden')
}

function closeSidebarOnMobile() {
  if (window.innerWidth < 768) toggleSidebar()
}

// =======================================================
// MODAL
// =======================================================

function toggleModal() {
  const modal = $('modal-registro')
  const form = $('formRegistro')
  const chamada = $('container-chamada')

  if (!modal) return

  modal.classList.toggle('hidden')

  if (!modal.classList.contains('hidden')) {
    form?.reset()
    chamada?.classList.add('hidden')
    $('lista-alunos').innerHTML = ''
  }
}

// =======================================================
// TABELA
// =======================================================

function renderizarTabela() {
  const tbody = $('tabela-corpo')
  if (!tbody) return

  tbody.innerHTML = ''

  registros.forEach((r) => {
    tbody.innerHTML += `
      <tr class="border-b">
        <td class="px-6 py-4">${r.turma}</td>
        <td class="px-6 py-4">${r.professor}</td>
        <td class="px-6 py-4">${r.data}</td>
        <td class="px-6 py-4 text-center font-bold">
          ${r.presentes}/${r.total}
        </td>
        <td class="px-6 py-4 text-center">
          ${r.visitantes}
        </td>
        <td class="px-6 py-4 text-right">
          <button
            onclick="abrirPresenca('${r.turma}')"
            class="text-primary font-bold"
          >
            Editar
          </button>
        </td>
      </tr>
    `
  })
}

// =======================================================
// PRESENÇA
// =======================================================

function abrirPresenca(turma) {
  toggleModal()

  const reg = registros.find((r) => r.turma === turma)

  $('reg-turma').value = turma
  $('reg-professor').value = reg?.professor || ''
  $('reg-data').value = reg?.data || new Date().toISOString().split('T')[0]
  $('reg-visitantes').value = reg?.visitantes !== '-' ? reg.visitantes : ''

  carregarAlunos(reg?.presentes || 0)
}

function carregarAlunos(presentes = 0) {
  const turma = $('reg-turma').value
  const lista = $('lista-alunos')
  const container = $('container-chamada')

  if (!lista || !container || !alunosData[turma]) return

  lista.innerHTML = ''
  container.classList.remove('hidden')

  alunosData[turma].forEach((aluno, index) => {
    lista.innerHTML += `
      <label class="flex justify-between items-center p-2 rounded hover:bg-gray-100">
        <span>${aluno}</span>
        <input type="checkbox" ${index < presentes ? 'checked' : ''} class="accent-primary">
      </label>
    `
  })
}

// =======================================================
// SALVAR REGISTRO
// =======================================================

function salvarRegistro(e) {
  e.preventDefault()

  const turma = $('reg-turma').value
  const presentes = document.querySelectorAll('#lista-alunos input:checked').length
  const total = document.querySelectorAll('#lista-alunos input').length

  registros.unshift({
    turma,
    professor: $('reg-professor').value,
    data: $('reg-data').value,
    presentes,
    total,
    visitantes: $('reg-visitantes').value || '-',
  })

  toggleModal()
  renderizarTabela()
}

// =======================================================
// INIT
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
  renderizarTabela()
})
