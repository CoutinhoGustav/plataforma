import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link for cadastro (optional)
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const success = await login(email, password);
            if (success === true) {
                navigate('/');
            } else if (typeof success === 'string') {
                setError(success); // Mensagem de aprovação pendente ou erro
            } else {
                setError('E-mail ou senha inválidos');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">IBRC</h1>
                    <p className="text-sm text-gray-500">Acesso ao sistema</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600">E-mail</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-xl border-gray-300 focus:ring-primary focus:border-primary"
                            placeholder="admin@ibrc.com.br"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-600">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-xl border-gray-300 focus:ring-primary focus:border-primary"
                            placeholder="••••••"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-semibold">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
                    >
                        Entrar
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Não tem conta?{' '}
                    <Link to="/cadastro" className="text-blue-600 font-bold">Cadastrar</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
