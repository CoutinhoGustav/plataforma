import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ModalFotoPerfil = ({ isOpen, onClose }) => {
    const { user, updateUser } = useAuth();
    const [tab, setTab] = useState('upload'); // 'upload' | 'url'
    const [preview, setPreview] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [urlError, setUrlError] = useState('');
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    const userName = user?.name || user?.username || 'Usuário';
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=137fec&color=fff&bold=true`;

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setTab('upload');
            setPreview(user?.avatar || '');
            setUrlInput('');
            setUrlError('');
        }
    }, [isOpen, user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setUrlError('Selecione um arquivo de imagem válido.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setUrlError('A imagem deve ter no máximo 2MB.');
            return;
        }

        setUrlError('');
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleUrlChange = (e) => {
        const val = e.target.value;
        setUrlInput(val);
        setUrlError('');
        if (val.trim()) setPreview(val.trim());
    };

    const handleUrlError = () => {
        setUrlError('URL inválida ou imagem não encontrada.');
        setPreview('');
    };

    const handleSave = async () => {
        if (!preview) {
            setUrlError('Nenhuma imagem selecionada.');
            return;
        }
        setSaving(true);
        try {
            await updateUser({ avatar: preview });
            onClose();
        } catch {
            setUrlError('Erro ao salvar a foto. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    const handleRemove = async () => {
        setSaving(true);
        try {
            await updateUser({ avatar: null });
            setPreview('');
            onClose();
        } catch {
            setUrlError('Erro ao remover a foto.');
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4"
                    style={{ background: 'linear-gradient(135deg, #0a2540 0%, #137fec 100%)' }}>
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-lg">add_a_photo</span>
                        </div>
                        <h2 className="text-white font-bold text-base">Foto de Perfil</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition"
                        title="Fechar"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-5 space-y-4">

                    {/* Preview */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative group">
                            <div
                                className="size-24 rounded-full bg-cover bg-center border-4 shadow-lg transition-transform group-hover:scale-105"
                                style={{
                                    backgroundImage: `url('${preview || fallbackAvatar}')`,
                                    borderColor: '#137fec33'
                                }}
                            />
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400">Pré-visualização</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex rounded-xl bg-gray-100 p-1 gap-1">
                        <button
                            onClick={() => { setTab('upload'); setUrlError(''); }}
                            className="flex-1 text-xs font-bold py-2 rounded-lg transition-all"
                            style={tab === 'upload'
                                ? { background: '#fff', color: '#137fec', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                                : { color: '#6b7280' }
                            }
                        >
                            <span className="material-symbols-outlined text-sm align-middle mr-1">upload</span>
                            Upload
                        </button>
                        <button
                            onClick={() => { setTab('url'); setUrlError(''); }}
                            className="flex-1 text-xs font-bold py-2 rounded-lg transition-all"
                            style={tab === 'url'
                                ? { background: '#fff', color: '#137fec', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                                : { color: '#6b7280' }
                            }
                        >
                            <span className="material-symbols-outlined text-sm align-middle mr-1">link</span>
                            URL
                        </button>
                    </div>

                    {/* Tab Content */}
                    {tab === 'upload' ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all"
                            style={{ borderColor: '#137fec55' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#137fec';
                                e.currentTarget.style.background = '#137fec0a';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#137fec55';
                                e.currentTarget.style.background = '';
                            }}
                        >
                            <span className="material-symbols-outlined text-4xl" style={{ color: '#137fec80' }}>image</span>
                            <p className="text-xs font-bold text-gray-500">Clique para selecionar</p>
                            <p className="text-[10px] text-gray-400">PNG, JPG, WEBP — máx. 2MB</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">URL da imagem</label>
                            <input
                                type="url"
                                value={urlInput}
                                onChange={handleUrlChange}
                                placeholder="https://exemplo.com/foto.jpg"
                                className="w-full rounded-xl border border-gray-200 text-sm px-3 py-2 focus:outline-none"
                                style={{ '--tw-ring-color': '#137fec' }}
                                onFocus={e => e.target.style.borderColor = '#137fec'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                            {/* Hidden img to validate URL */}
                            {urlInput.trim() && (
                                <img
                                    src={urlInput.trim()}
                                    alt=""
                                    className="hidden"
                                    onError={handleUrlError}
                                    onLoad={() => setUrlError('')}
                                />
                            )}
                        </div>
                    )}

                    {/* Error */}
                    {urlError && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {urlError}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-1 border-t border-gray-100">
                        {user?.avatar && (
                            <button
                                onClick={handleRemove}
                                disabled={saving}
                                className="px-3 py-2 text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">delete</span>
                                Remover
                            </button>
                        )}
                        <div className="flex-1" />
                        <button
                            onClick={onClose}
                            disabled={saving}
                            className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || !preview}
                            className="px-5 py-2 rounded-xl text-white text-xs font-bold shadow transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: 'linear-gradient(135deg, #0a2540 0%, #137fec 100%)' }}
                        >
                            {saving
                                ? <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> Salvando...</>
                                : <><span className="material-symbols-outlined text-sm">check</span> Confirmar</>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFotoPerfil;
