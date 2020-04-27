import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";
import mysql from "promise-mysql";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
});
const context = {
    pool,
};

const server = new GraphQLServer({
    typeDefs: `${__dirname}/schema.graphql`,
    resolvers,
    context, 
});

server.start({ playground: !process.env.PRODUCTION ? "/" : false }, () =>
    console.log(`Server is running at http://localhost:4000`)
);
