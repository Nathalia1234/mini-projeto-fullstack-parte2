import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NotesApp API",
      version: "1.0.0",
      description: "Documentação da API MongoDB - NotesApp",
    },
    servers: [
      {
        url: "https://notes.nathaliaohana.dev",
        description: "Produção",
      },
      {
        url: "http://localhost:3000",
        description: "Local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
