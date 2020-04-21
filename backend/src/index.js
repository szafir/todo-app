const { GraphQLServer } = require("graphql-yoga");
const resolvers = require("./resolvers").module;
const mysql = require("promise-mysql");

var pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
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
