// ================== DARK MODE ==================
const theme = localStorage.getItem('theme');
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}

// ================== LOGIN ==================
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // ===== LOGIN SIMULADO =====
  if (email === 'admin@ibrc.com.br' && senha === '123456') {
    localStorage.setItem('auth', 'true');

    alert('Login realizado com sucesso!');
    window.location.href = 'index.html'; // dashboard
  } else {
    alert('Email ou senha inválidos');
  }
});
