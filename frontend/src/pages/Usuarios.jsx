import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const formatDate = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('pt-BR');
};

const Usuarios = () => {
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    const [confirm, setConfirm] = useState(null); // { type: 'reject' | 'remove', target }

    const fetchUsers = useCallback(async () => {
        try {
            setError(null);
            const data = await authService.getUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Não foi possível carregar os usuários.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchUsers();
        }
    }, [fetchUsers, user]);

    // Guard de UI — o backend é a aplicação real do controle de acesso.
    if (user && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const runAction = async (id, action) => {
        setProcessingId(id);
        try {
            await action();
            await fetchUsers();
        } catch (err) {
            const message = err?.response?.data?.message || 'Não foi possível concluir a ação.';
            alert(message);
        } finally {
            setProcessingId(null);
            setConfirm(null);
        }
    };

    const handleApprove = (target) => runAction(target.id, () => authService.approveUser(target.id));
    const handleRoleChange = (target, role) => runAction(target.id, () => authService.updateUserRole(target.id, role));
    const handleDelete = (target) => runAction(target.id, () => authService.deleteUser(target.id));

    const pendingCount = users.filter((u) => !u.isApproved).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            {/* Desktop Header */}
            <header className="hidden md:flex bg-white border-b border-stone-200/60 -mx-8 -mt-8 px-8 h-20 items-center mb-8">
                <h2 className="font-heading text-3xl font-bold text-stone-800">Usuários</h2>
            </header>

            {/* Faixa de resumo */}
            {pendingCount > 0 && (
                <div className="flex items-center gap-3 mb-6 bg-amber-50 border border-amber-200/70 rounded-2xl px-5 py-4">
                    <span className="material-symbols-outlined text-amber-600">notifications_active</span>
                    <p className="text-sm text-amber-800">
                        <strong className="font-semibold">{pendingCount}</strong>{' '}
                        {pendingCount === 1 ? 'usuário aguardando aprovação' : 'usuários aguardando aprovação'}.
                    </p>
                </div>
            )}

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200/70 rounded-2xl px-5 py-4 text-sm text-danger">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-stone-200/60 overflow-x-auto shadow-sm shadow-stone-200/50">
                <table className="min-w-[820px] w-full">
                    <thead>
                        <tr className="border-b border-stone-100">
                            <th className="px-6 py-4 text-xs uppercase tracking-wider text-left font-semibold text-stone-400">Nome</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-wider text-left font-semibold text-stone-400">Email</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-wider text-left font-semibold text-stone-400">Papel</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-wider text-center font-semibold text-stone-400">Status</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-wider text-left font-semibold text-stone-400">Cadastrado em</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-wider text-right font-semibold text-stone-400">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {users.map((u) => {
                            const isSelf = u.id === user?.id;
                            const busy = processingId === u.id;
                            return (
                                <tr key={u.id} className="hover:bg-surface-warm/50 transition-colors duration-150">
                                    <td className="px-6 py-4 font-semibold text-stone-800">
                                        {u.name || '—'}
                                        {isSelf && <span className="ml-2 text-xs font-medium text-stone-400">(você)</span>}
                                    </td>
                                    <td className="px-6 py-4 text-stone-600">{u.email || '—'}</td>
                                    <td className="px-6 py-4">
                                        {u.isApproved && !isSelf ? (
                                            <select
                                                value={u.role}
                                                disabled={busy}
                                                onChange={(e) => handleRoleChange(u, e.target.value)}
                                                className="px-3 py-1.5 rounded-lg border border-stone-200 text-sm text-stone-700 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition disabled:opacity-50"
                                            >
                                                <option value="user">Membro</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-light text-primary">
                                                {u.role === 'admin' ? 'Administrador' : 'Membro'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {u.isApproved ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                                                Ativo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                                                Pendente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-stone-400 text-sm">{formatDate(u.createdAt)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-4">
                                            {!u.isApproved && (
                                                <button
                                                    onClick={() => handleApprove(u)}
                                                    disabled={busy}
                                                    className="text-emerald-600 font-semibold hover:text-emerald-700 text-sm transition disabled:opacity-50"
                                                >
                                                    Aprovar
                                                </button>
                                            )}
                                            {!u.isApproved && (
                                                <button
                                                    onClick={() => setConfirm({ type: 'reject', target: u })}
                                                    disabled={busy}
                                                    className="text-danger font-semibold hover:text-danger-hover text-sm transition disabled:opacity-50"
                                                >
                                                    Rejeitar
                                                </button>
                                            )}
                                            {u.isApproved && !isSelf && (
                                                <button
                                                    onClick={() => setConfirm({ type: 'remove', target: u })}
                                                    disabled={busy}
                                                    className="text-danger font-semibold hover:text-danger-hover text-sm transition disabled:opacity-50"
                                                >
                                                    Remover
                                                </button>
                                            )}
                                            {u.isApproved && isSelf && (
                                                <span className="text-stone-300 text-sm">—</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-stone-400">
                                    <span className="material-symbols-outlined text-4xl text-stone-300 block mb-2">group</span>
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL DE CONFIRMAÇÃO */}
            {confirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-stone-200/60 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-danger">warning</span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-danger">
                                {confirm.type === 'reject' ? 'Rejeitar cadastro' : 'Remover usuário'}
                            </h3>
                        </div>

                        <p className="text-stone-500 text-sm mb-6">
                            {confirm.type === 'reject' ? (
                                <>O cadastro de <strong className="text-stone-700">{confirm.target.name || confirm.target.email}</strong> será removido permanentemente.</>
                            ) : (
                                <>O usuário <strong className="text-stone-700">{confirm.target.name || confirm.target.email}</strong> será removido permanentemente e perderá o acesso.</>
                            )}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirm(null)}
                                disabled={processingId === confirm.target.id}
                                className="flex-1 border border-stone-200 py-2.5 rounded-xl font-semibold text-sm text-stone-600 hover:bg-stone-50 transition disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(confirm.target)}
                                disabled={processingId === confirm.target.id}
                                className="flex-1 bg-danger text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-danger-hover transition disabled:opacity-50"
                            >
                                {confirm.type === 'reject' ? 'Sim, rejeitar' : 'Sim, remover'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usuarios;
