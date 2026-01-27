// =======================================================
// HELPERS
// =======================================================
const $ = (id) => document.getElementById(id)

// =======================================================
// DADOS (BANCO SIMULADO)
// =======================================================
const registrosDefault = [
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
// LOCALSTORAGE – REGISTROS
// =======================================================
function getRegistros() {
  return JSON.parse(localStorage.getItem('registros')) || registrosDefault
}

function setRegistros(data) {
  localStorage.setItem('registros', JSON.stringify(data))
}

// =======================================================
// PERFIL (LOCALSTORAGE)
// =======================================================
const defaultUser = {
  nome: 'Admin IBRC',
  email: 'admin@ibrc.com.br',
  foto: 'https://ui-avatars.com/api/?name=Admin+IBRC',
  notificacoes: { email: true, sistema: false },
}

function getUser() {
  return JSON.parse(localStorage.getItem('user')) || defaultUser
}

function setUser(data) {
  localStorage.setItem('user', JSON.stringify(data))
}

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
  if (!modal) return

  modal.classList.toggle('hidden')

  if (!modal.classList.contains('hidden')) {
    $('formRegistro')?.reset()
    $('container-chamada')?.classList.add('hidden')
    $('lista-alunos') && ($('lista-alunos').innerHTML = '')
  }
}

// =======================================================
// TABELA
// =======================================================
function renderizarTabela() {
  const tbody = $('tabela-corpo')
  if (!tbody) return

  const registros = getRegistros()
  tbody.innerHTML = ''

  registros.forEach((r) => {
    tbody.innerHTML += `
      <tr class="border-b">
        <td class="px-6 py-4">${r.turma}</td>
        <td class="px-6 py-4">${r.professor}</td>
        <td class="px-6 py-4">${r.data}</td>
        <td class="px-6 py-4 text-center font-bold">${r.presentes}/${r.total}</td>
        <td class="px-6 py-4 text-center">${r.visitantes}</td>
        <td class="px-6 py-4 text-right">
          <button onclick="abrirPresenca('${r.turma}')" class="text-primary font-bold">
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

  const registros = getRegistros()
  const reg = registros.find(r => r.turma === turma)

  if (!reg) return

  $('reg-turma').value = turma
  $('reg-professor').value = reg.professor
  $('reg-data').value = reg.data
  $('reg-visitantes').value = reg.visitantes !== '-' ? reg.visitantes : ''

  carregarAlunos(reg.presentes)
}

function carregarAlunos(presentes = 0) {
  const turma = $('reg-turma')?.value
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

  const registros = getRegistros()
  const turma = $('reg-turma').value

  registros.unshift({
    turma,
    professor: $('reg-professor').value,
    data: $('reg-data').value,
    presentes: document.querySelectorAll('#lista-alunos input:checked').length,
    total: document.querySelectorAll('#lista-alunos input').length,
    visitantes: $('reg-visitantes').value || '-',
  })

  setRegistros(registros)
  toggleModal()
  renderizarTabela()
}

// =======================================================
// CONFIGURAÇÕES – PERFIL
// =======================================================
function carregarPerfil() {
  const user = getUser()

  document.querySelectorAll('[data-user-nome]').forEach(el => el.textContent = user.nome)
  document.querySelectorAll('[data-user-email]').forEach(el => el.textContent = user.email)
  document.querySelectorAll('[data-user-foto]').forEach(el => {
    el.style.backgroundImage = `url('${user.foto}')`
  })

  $('perfil-nome') && ($('perfil-nome').value = user.nome)
  $('perfil-email') && ($('perfil-email').value = user.email)
}

function salvarPerfil() {
  const user = getUser()
  user.nome = $('perfil-nome').value
  user.email = $('perfil-email').value
  setUser(user)
  alert('Perfil atualizado!')
  carregarPerfil()
}

function alterarFoto(input) {
  const file = input.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const user = getUser()
    user.foto = reader.result
    setUser(user)
    carregarPerfil()
  }
  reader.readAsDataURL(file)
}

// =======================================================
// CONFIGURAÇÕES – NOTIFICAÇÕES
// =======================================================
function salvarNotificacoes() {
  const user = getUser()
  user.notificacoes.email = $('notif-email')?.checked
  user.notificacoes.sistema = $('notif-sistema')?.checked
  setUser(user)
  alert('Notificações salvas!')
}

// =======================================================
// SEGURANÇA
// =======================================================
function atualizarSenha() {
  const senha = $('nova-senha')?.value
  const confirmar = $('confirmar-senha')?.value

  if (!senha || senha.length < 6) {
    alert('Senha mínima de 6 caracteres')
    return
  }

  if (senha !== confirmar) {
    alert('As senhas não coincidem')
    return
  }

  alert('Senha atualizada (simulação)')
}

// =======================================================
// ZONA DE DESATIVAÇÃO
// =======================================================
function desativarConta() {
  if (!confirm('Deseja desativar a conta?')) return
  localStorage.setItem('contaDesativada', 'true')
  handleLogout()
}

function excluirConta() {
  if (!confirm('Essa ação é permanente. Continuar?')) return
  localStorage.clear()
  window.location.href = 'login.html'
}

// =======================================================
// INIT
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
  setUser(getUser())
  setRegistros(getRegistros())
  carregarPerfil()
  renderizarTabela()
})
