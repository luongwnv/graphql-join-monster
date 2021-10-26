const { pagination } = require('../../utils/joinMonter');
const db = require('../../db/knex');

const resolvers = {
    Query: {
        authors: async(parent, args, context, info) => {
            const data = await pagination(args, context, info);
            return data;
        },
    },

    Mutation: {
        insertAuthor: async(parent, args, context, info) => {
            try {
                const { name } = args;
                console.log(name);
                const data = await db('authors')
                    .insert({ name })
                    .returning('*');
                return {
                    result: data,
                };
            } catch (error) {
                return {
                    result: null,
                };
            }
        },

        updateAuthor: async(parent, args, context, info) => {
            try {
                const { id, name } = args;
                const data = await db('authors')
                    .where({ id })
                    .update({ name })
                    .returning('*');
                return {
                    result: data,
                };
            } catch (error) {
                return {
                    result: null,
                };
            }
        },

        deleteAuthor: async(parent, args, context, info) => {
            try {
                const { id } = args;
                const data = await db('authors')
                    .del()
                    .where({ id });
                return {
                    result: data,
                };
            } catch (error) {
                return { result: null };
            }
        },
    },
};

module.exports = { resolvers };