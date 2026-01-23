document.getElementById('formCadastro').addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      senha: document.getElementById('senha').value,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Cadastro realizado com sucesso!');
    window.location.replace('login.html');
  });