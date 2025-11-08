import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  create,
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote,
  deleteNote
}
from "../controllers/note.controller.js";

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Endpoints para criação, leitura, atualização e exclusão de notas
 */

// Cria o roteador do Express
const router = express.Router();


/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Criar uma nova nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Primeira nota
 *               content:
 *                 type: string
 *                 example: Conteúdo da nota criada pelo usuário.
 *     responses:
 *       201:
 *         description: Nota criada com sucesso.
 *       400:
 *         description: Erro ao criar nota.
 */

//  Criar nota
router.post('/', verifyToken, create);


/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Listar todas as notas do usuário autenticado
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas retornada com sucesso.
 */

//  Listar todas as notas
router.get('/', verifyToken, getAllNotes);


/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Buscar nota específica por ID
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota encontrada com sucesso.
 *       404:
 *         description: Nota não encontrada.
 */

//  Buscar nota por ID
router.get('/:id', verifyToken, getNoteById);


/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Atualizar uma nota existente
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Título atualizado
 *               content:
 *                 type: string
 *                 example: Novo conteúdo da nota.
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso.
 *       404:
 *         description: Nota não encontrada.
 */

//  Atualizar nota (PUT)
router.put('/:id', verifyToken, updateNote);


/**
 * @swagger
 * /api/notes/{id}:
 *   patch:
 *     summary: Atualizar parcialmente uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota a ser atualizada parcialmente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Ajuste rápido no conteúdo da nota.
 *     responses:
 *       200:
 *         description: Nota atualizada parcialmente com sucesso.
 *       404:
 *         description: Nota não encontrada.
 */

//  Atualizar parcialmente nota (PATCH)
router.patch('/:id', verifyToken, patchNote);


/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Excluir uma nota existente
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da nota a ser excluída
 *     responses:
 *       204:
 *         description: Nota excluída com sucesso.
 *       404:
 *         description: Nota não encontrada.
 */

//  Deletar nota
router.delete('/:id', verifyToken, deleteNote);

export default router;
