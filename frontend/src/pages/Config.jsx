import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModalFotoPerfil from '../components/ModalFotoPerfil';

const Config = () => {
    const { user, updateUser, logout } = useAuth();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');


    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    useEffect(() => {
        if (user) {
            setNome(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            updateUser({ avatar: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = () => {
        updateUser({ name: nome, email });
        alert('Perfil atualizado!');
    };


    const handleUpdatePassword = () => {
        if (!senha || senha.length < 6) {
            alert('Senha mínima de 6 caracteres');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        alert('Senha atualizada (simulação)');
        setSenha('');
        setConfirmarSenha('');
    };

    // 🔥 EXCLUSÃO + LOGOUT DIRETO (SEM CONFIRMAÇÃO DE SAÍDA)
    const confirmDeleteAccount = () => {
        setShowDeleteModal(false);

        sessionStorage.clear(); // limpa dados
        logout();             // logout direto, sem perguntar nada
    };

    return (
        <div className="p-4 md:p-8">
            <header className="hidden md:flex bg-white border-b -mx-8 -mt-8 px-8 h-20 items-center mb-8">
                <h2 className="text-3xl font-black">Configurações</h2>
            </header>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 space-y-10">

                {/* PERFIL */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Perfil</h2>

                    <div className="flex items-center gap-6">
                        {/* Avatar clicável */}
                        <button
                            onClick={() => setShowAvatarModal(true)}
                            className="relative group focus:outline-none"
                            title="Alterar foto de perfil"
                        >
                            <div
                                className="size-24 rounded-full bg-gray-200 bg-cover bg-center border-4 border-gray-100 shadow transition-transform group-hover:scale-105"
                                style={{ backgroundImage: `url('${user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Usuário')}&background=6C63FF&color=fff&bold=true`}')` }}
                            />
                            {/* Overlay câmera */}
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                            </div>
                        </button>

                        <div>
                            <p className="font-bold text-gray-800">{user?.name || 'Usuário'}</p>
                            <button
                                onClick={() => setShowAvatarModal(true)}
                                className="text-primary text-sm font-bold hover:underline mt-1"
                            >
                                Alterar foto
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                            <label className="font-semibold block mb-1">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-xl"
                            />
                        </div>

                        <div>
                            <label className="font-semibold block mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-xl"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleUpdateProfile}
                        className="mt-4 bg-primary text-white px-6 py-2 rounded-xl font-bold"
                    >
                        Salvar alterações
                    </button>
                </section>


                {/* SEGURANÇA */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Segurança</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="password"
                            placeholder="Nova senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            className="p-2 border border-gray-300 rounded-xl"
                        />

                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmarSenha}
                            onChange={e => setConfirmarSenha(e.target.value)}
                            className="p-2 border border-gray-300 rounded-xl"
                        />
                    </div>

                    <button
                        onClick={handleUpdatePassword}
                        className="mt-4 bg-primary text-white px-6 py-2 rounded-xl font-bold"
                    >
                        Atualizar senha
                    </button>
                </section>

                {/* ZONA DE PERIGO */}
                <section className="border-t pt-6">
                    <h2 className="text-xl font-bold text-red-600 mb-4">
                        Excluir conta
                    </h2>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700"
                    >
                        Excluir conta
                    </button>
                </section>
            </div>

            {/* MODAL FOTO DE PERFIL */}
            <ModalFotoPerfil
                isOpen={showAvatarModal}
                onClose={() => setShowAvatarModal(false)}
            />

            {/* MODAL DE CONFIRMAÇÃO EXCLUSÃO */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-black text-red-600 mb-3">
                            Excluir conta
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Essa ação é <strong>permanente</strong>.
                            Todos os seus dados serão removidos.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 border border-gray-300 py-2 rounded-xl font-bold"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmDeleteAccount}
                                className="flex-1 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700"
                            >
                                Sim, excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Config;
