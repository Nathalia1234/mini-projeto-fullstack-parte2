import Note from  '../models/note.model.js';
import { logger } from "../middlewares/logger.js";
import mongoose from "mongoose";


// ----------------------
// Criar uma nova nota
// ----------------------
export  async function create(req, res) {
  try {
    const { title, content } = req.body;

    // Validação simples
    if (!title || !content) {
      logger.logError(`Tentativa de criar nota com dados incompletos`);
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }

    const note = new Note({
      userId: req.user.id,
      title,
      content
    });

    await note.save();

    logger.logInfo(
      `🟢 Usuário ${req.user.id} criou nota com sucesso (ID da Nota: ${note._id})`
    );
    return res.status(201).json(note);
  } catch (error) {
    logger.logError(`Erro ao criar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao criar nota.' });
  }
}

// ----------------------
// Listar todas as notas (com ou sem filtro)
// ----------------------
export  async function getAllNotes(req, res) {
  try {
    // Converte o ID do usuário autenticado para ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Filtro base: notas pertencentes ao usuário autenticado
    const filter = { userId };

    // Se tiver parâmetro de título, aplica filtro com regex
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    logger.debug(`🔍 Filtro usado: ${JSON.stringify(filter)}`);

    // Busca notas no MongoDB
    const notes = await Note.find(filter);

    if (notes.length > 0) {
      logger.logInfo(`🟢 Usuário ${req.user.id} encontrou ${notes.length} notas.`);
    } else {
      logger.debug(`🟡 Usuário ${req.user.id} não possui notas com o filtro aplicado.`);
    }

    return res.status(200).json(notes);
  } catch (error) {
    logger.logError(`Erro ao listar notas: ${error.message}`);
    return res.status(500).json({ error: "Erro ao listar notas." });
  }
}


// ----------------------
//  Buscar nota por ID
// ----------------------
export  async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Nota ${req.params.id} não encontrada`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou acessar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado. Esta nota pertence a outro usuário.' });
    }

    logger.logInfo(`🔵 Usuário ${req.user.id} acessou nota ${req.params.id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao buscar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao buscar nota.' });
  }
}

// ----------------------
// Atualizar nota (PUT )
// ----------------------
export  async function updateNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de atualizar nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou atualizar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado. Você não pode editar notas de outro usuário.' });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    logger.logInfo(`🟠 Usuário ${req.user.id} atualizou nota ${note._id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao atualizar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao atualizar nota.' });
  }
}

// Atualizar parcialmente nota (PATCH)
export  async function patchNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de atualização parcial em nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou modificar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado. Você não pode editar notas de outro usuário.' });
    }

    Object.assign(note, req.body);
    await note.save();

    logger.logInfo(`🟣 Usuário ${req.user.id} atualizou parcialmente nota ${note._id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao atualizar parcialmente nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao atualizar nota parcialmente.' });
  }
}

// ----------------------
// Deletar nota
// ----------------------
export  async function deleteNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de deletar nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou deletar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado. Você não pode deletar notas de outro usuário.' });
    }

    await note.deleteOne();

    logger.logInfo(`🔴 Usuário ${req.user.id} deletou nota ${req.params.id}`);
    return res.status(200).json({
  message: `Nota ${req.params.id} deletada com sucesso!`
});
  } catch (error) {
    logger.logError(`Erro ao deletar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao deletar nota.' });
  }
}

