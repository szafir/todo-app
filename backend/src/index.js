const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers").module;
const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

var pool = mysql.createPool({ 
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
server.start(() => console.log(`Server is running at http://localhost:4000`));
