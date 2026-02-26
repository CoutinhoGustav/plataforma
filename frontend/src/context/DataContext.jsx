import { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../services/api.js';
import alunoService from '../services/alunoService';
import turmaService from '../services/turmaService';

const DataContext = createContext();

// 🔹 Converte YYYY-MM-DD → DD/MM/YYYY
const formatDateBR = (dateISO) => {
    if (!dateISO) return '';
    const [year, month, day] = dateISO.split('-');
    if (!year || !month || !day) return '';
    return `${day}/${month}/${year}`;
};

// 🔹 Normaliza data (evita undefined/undefined)
export const normalizeDate = (date) => {
    if (!date) return '';
    if (date.includes('/')) return date;
    if (date.includes('-')) return formatDateBR(date);
    return date;
};

export const TURMAS_DISPONIVEIS = [
    'Berçário',
    'Maternal',
    'Primários',
    'Principiantes',
    'Juniores',
    'Intermediários',
    'Jovens',
    'Adultos'
];

export const DataProvider = ({ children }) => {
    const [registros, setRegistros] = useState([]);
    const [alunosData, setAlunosData] = useState(
        TURMAS_DISPONIVEIS.reduce((acc, t) => ({ ...acc, [t]: [] }), {})
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [alunos, turmasRecords] = await Promise.all([
                alunoService.findAll(),
                turmaService.findAll()
            ]);

            // Organizar alunos por turma, garantindo que todas as turmas oficiais existam
            const organizedAlunos = {};
            TURMAS_DISPONIVEIS.forEach(t => {
                organizedAlunos[t] = [];
            });

            alunos.forEach(aluno => {
                const t = aluno.turma;
                if (t && organizedAlunos[t]) {
                    organizedAlunos[t].push(aluno.name);
                } else if (t) {
                    // Se houver uma turma customizada no banco que não está na lista oficial
                    if (!organizedAlunos[t]) organizedAlunos[t] = [];
                    organizedAlunos[t].push(aluno.name);
                }
            });

            setAlunosData(organizedAlunos);
            setRegistros(turmasRecords.map(r => ({
                ...r,
                data: normalizeDate(r.data?.split('T')[0] || r.data)
            })));
            setLoading(false);
        } catch (err) {
            console.error('Erro ao buscar dados:', err);
            setError('Não foi possível carregar os dados do servidor.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addRegistro = async (novoRegistro) => {
        try {
            const saved = await turmaService.create(novoRegistro);
            setRegistros(prev => [{ ...saved, data: normalizeDate(saved.data?.split('T')[0] || saved.data) }, ...prev]);
            return saved;
        } catch (err) {
            console.error('Erro ao adicionar registro:', err);
            throw err;
        }
    };

    const updateRegistro = async (updatedRegistro) => {
        try {
            const { id, ...data } = updatedRegistro;
            const saved = await turmaService.update(id, data);
            setRegistros(prev =>
                prev.map(r => r.id === id ? { ...saved, data: normalizeDate(saved.data?.split('T')[0] || saved.data) } : r)
            );
            return saved;
        } catch (err) {
            console.error('Erro ao atualizar registro:', err);
            throw err;
        }
    };

    const deleteRegistro = async (id) => {
        try {
            await turmaService.delete(id);
            setRegistros(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error('Erro ao excluir registro:', err);
            throw err;
        }
    };

    const getAlunosByTurma = (turma) => {
        const list = alunosData[turma] || [];
        return [...list].sort((a, b) => a.localeCompare(b));
    };

    const addAluno = async (turma, nome) => {
        try {
            const saved = await alunoService.create({ name: nome, turma });
            setAlunosData(prev => ({
                ...prev,
                [turma]: [...(prev[turma] || []), saved.name]
            }));
            return saved;
        } catch (err) {
            console.error('Erro ao adicionar aluno:', err);
            throw err;
        }
    };

    const updateAluno = async (turmaOld, nomeOld, turmaNew, nomeNew) => {
        // Esta lógica depende de encontrar o ID do aluno pelo nome, 
        // o que não é ideal. Mas para manter compatibilidade:
        try {
            const allAlunos = await alunoService.findAll();
            const aluno = allAlunos.find(a => a.name === nomeOld && a.turma === turmaOld);
            if (aluno) {
                await alunoService.update(aluno.id, { name: nomeNew, turma: turmaNew });
                await fetchData(); // Recarrega tudo para garantir consistência
            }
        } catch (err) {
            console.error('Erro ao atualizar aluno:', err);
            throw err;
        }
    };

    const removeAluno = async (turma, nome) => {
        try {
            const allAlunos = await alunoService.findAll();
            const aluno = allAlunos.find(a => a.name === nome && a.turma === turma);
            if (aluno) {
                await alunoService.delete(aluno.id);
                setAlunosData(prev => ({
                    ...prev,
                    [turma]: prev[turma].filter(a => a !== nome)
                }));
            }
        } catch (err) {
            console.error('Erro ao remover aluno:', err);
            throw err;
        }
    };

    return (
        <DataContext.Provider value={{
            registros,
            alunosData,
            loading,
            error,
            addRegistro,
            updateRegistro,
            deleteRegistro,
            getAlunosByTurma,
            addAluno,
            updateAluno,
            removeAluno,
            refreshData: fetchData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
