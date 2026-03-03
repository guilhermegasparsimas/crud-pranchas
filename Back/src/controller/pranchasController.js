import db from '../config/db.js';


const getPrancha = async (req, res) => {
    try {
        const [resultado] = await db.query("SELECT id, nome, descricao, valor FROM pranchas WHERE ativo = 1");

        if(resultado.length === 0) {
            return res.status(404).json({ message: "Nenhuma prancha encontrada" });
        }
        return res.status(200).json({ message: "Pranchas encontradas", data: resultado });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar pranchas", error: error.message });
    }
};


const adicionarPrancha = async (req, res) => {
    const { nome, descricao, valor } = req.body;

    if (!nome || valor === undefined) {
        return res.status(400).json({ message: "Nome e valor são obrigatórios." });
    }

    try {

        const query = "INSERT INTO pranchas (nome, descricao, valor, ativo) VALUES (?, ?, ?, 1)";
        const [resultado] = await db.query(query, [nome, descricao, valor]);

        return res.status(201).json({ 
            message: "Prancha adicionada com sucesso!", 
            data: { id: resultado.insertId, nome, descricao, valor } 
        });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao adicionar prancha", error: error.message });
    }
};

const editarPrancha = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, valor } = req.body;

    if (!nome || valor === undefined) {
        return res.status(400).json({ message: "Nome e valor são obrigatórios para edição." });
    }

    try {
        const query = "UPDATE pranchas SET nome = ?, descricao = ?, valor = ? WHERE id = ?";
        const [resultado] = await db.query(query, [nome, descricao, valor, id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: "Prancha não encontrada ou não houve mudanças." });
        }

        return res.status(200).json({ message: "Prancha editada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao editar prancha", error: error.message });
    }
};

const excluirPrancha = async (req, res) => {
    const { id } = req.params;

    try {

        const query = "UPDATE pranchas SET ativo = 0 WHERE id = ?";
        const [resultado] = await db.query(query, [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: "Prancha não encontrada." });
        }

        return res.status(200).json({ message: "Prancha excluída com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao excluir prancha", error: error.message });
    }
};

export { getPrancha, adicionarPrancha, editarPrancha, excluirPrancha };