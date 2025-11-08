import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerDocs = (app) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "NotesApp API - MongoDB",
                version: "1.0.0",
                description: "API responsável pelo cadastro de usuários, login e gerenciamento de notas pessoais no projeto NotesApp.",
            },
            servers: [
                {
                    url: "https://mini-projeto-fullstack-parte2.vercel.app",
                    description: "Ambiente de produção",
                },
                {
                    url: "http://localhost:3000",
                    description: "Ambiente local",
                },
            ],
        },
        apis: ["./src/routes/*.js"],
    };
    const swaggerSpec = swaggerJSDoc(options);

    // Servir arquivos estáticos de forma explícita (corrige erro na Vercel)
  app.use("/swagger-ui", express.static(path.join(__dirname, "../node_modules/swagger-ui-dist")));

  // Endpoint /docs funcionando em local e produção
  app.use(
    "/docs",
    swaggerUi.serveFiles(swaggerSpec, { swaggerOptions: { url: "/swagger.json" } }),
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
    })
  );

  // JSON puro da especificação
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log("✅ Swagger disponível em /docs");
};
        
