import { fastifyCors } from "@fastify/cors";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { subscribeToEvent } from "./routes/subscribe-to-event";
import { env } from "./env";
import { routes } from "./routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:3000",
});

app.register(fastifySwagger, {
  openapi: {
    info: { title: "NLW Connect", version: "0.0.1" },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(routes);

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP server running at http://localhost:${env.PORT}`);
  });
