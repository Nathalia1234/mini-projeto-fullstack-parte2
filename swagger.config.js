import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
          components: {
                securitySchemes: {
                    bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
    app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }"
  })
);
    console.log("✅  Swagger disponível em /docs");
}
