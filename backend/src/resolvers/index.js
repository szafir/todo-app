const queries = require("./Queries").module;
const mutations = require("./Mutations").module;

exports.module = {
    Query: queries,
    Mutation: mutations,
};
