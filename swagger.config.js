// swagger.config.js
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const swaggerDocs = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "NotesApp API - MongoDB",
        version: "1.0.0",
        description:
          "API responsável pelo cadastro de usuários, login e gerenciamento de notas pessoais no projeto NotesApp.",
      },
      servers: [
        { url: "http://localhost:3000", description: "Ambiente local" },
        {
          url: "https://mini-projeto-fullstack-parte2.vercel.app",
          description: "Ambiente de produção",
        },
      ],
    },
    apis: ["./src/routes/*.js"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  // Versão com assets servidos via CDN (funciona no Vercel)
  const swaggerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>NotesApp API - Swagger</title>
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              spec: ${JSON.stringify(swaggerSpec)},
              dom_id: '#swagger-ui',
              presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
              layout: "BaseLayout"
            });
          };
        </script>
      </body>
    </html>
  `;

  app.get("/docs", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(swaggerHtml);
  });

  console.log("✅ Swagger disponível em /docs");
};
export default swaggerUi;