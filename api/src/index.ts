import "reflect-metadata";
import express, { Express } from 'express';
import { ApolloServer } from "apollo-server-express";
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';
import { AccountRelationsResolver, ProjectRelationsResolver } from '@generated/type-graphql'
import { buildSchema } from "type-graphql";
import { db } from "../db";

// API Routes
// import { metadataRouter } from './routes/metadata';

// GraphQL Resolvers
import { AuthResolver } from "../graphql/resolvers/Auth";
import { authChecker } from "./authChecker";
import { ProjectResolver } from "../graphql/resolvers/Project";
import { ProjectAPIResolver } from "../graphql/resolvers/ProjectAPI";
import { IpfsResolver } from "../graphql/resolvers/Ipfs";


dotenv.config();

export const bootstrap = async () => {
  // GraphQL Setup
  const schema = await buildSchema({
    resolvers: [
      AccountRelationsResolver,
      AuthResolver,
      ProjectResolver,
      ProjectRelationsResolver,
      ProjectAPIResolver,
      IpfsResolver,
    ],
    validate: false,
    authChecker,
  });
  const server = new ApolloServer({
    schema,
    context: (ctx) => ({ ...ctx, prisma: db }),
  });

  // Express Setup
  const app: Express = express();
  app.use(express.json({ limit: '10mb' }));
  const port = process.env.PORT || 4000;
  app.use(cors())
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' });

  // Custom API Routes
  // app.use('/route', router)

  // // Serve static builded webapp or proxy to local webapp for development mode
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static('../webapp/build'));
  // } else {
  //   app.use(proxy('http://localhost:3000', {
  //     filter: function(req, res) {
  //       return !req.path.includes('/api')
  //     }
  //   }));
  // }
  
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
  
}

bootstrap()
