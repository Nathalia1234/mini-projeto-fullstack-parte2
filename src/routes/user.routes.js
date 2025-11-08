import express from "express";
import * as userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints relacionados a autenticação e gerenciamento de usuários
 */

// Cria o roteador do Express
const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nathalia Ohana
 *               email:
 *                 type: string
 *                 example: nathalia@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: E-mail já cadastrado.
 */

// -----------------------------
// Rota de cadastro (registro)
// -----------------------------
router.post("/register", userController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realizar login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: nathalia@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna token JWT e dados do usuário.
 *       401:
 *         description: Credenciais inválidas.
 */

// -----------------------------
// Rota de login (autenticação)
// -----------------------------
router.post("/login", userController.login);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Retornar informações do perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil retornados com sucesso.
 *       401:
 *         description: Token ausente ou inválido.
 */

// -----------------------------
// Rota protegida - Perfil do usuário
// Só pode ser acessada com token válido
// -----------------------------
router.get("/profile", verifyToken, userController.getProfile);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos os usuários (uso interno)
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 */

// -----------------------------
// Rota para listar todos os usuários (uso interno/teste)
// -----------------------------
router.get("/users", userController.listAll);

// Exporta o roteador
export default router;



