import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectDatabase } from "./services/database.service";
import { songRouter } from "./routes/songs.routes";
import { authRouter } from "./routes/users.routes";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3000);

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shazam API Documentation',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5000/',
            }
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                in: "header",
              },
            },
          },
          security: [
            {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                  },
            },
          ],
    },
    apis: ['./dist/docs/*.js']
    
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))

connectDatabase()
    .then(() => {
        app.use(morgan("dev"));
        app.use("/songs", songRouter)
        app.use("/auth", authRouter)
        app.listen(app.get("port"), () => {
            console.log(`Server running on port ${app.get("port")}`);
        })
    }).catch((error: Error) => {
        console.log("Database connection failed", error);
        process.exit();
    })


