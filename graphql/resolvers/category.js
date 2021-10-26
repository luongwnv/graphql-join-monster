const { pagination } = require('../../utils/joinMonter');
const db = require('../../db/knex');

const resolvers = {
    Query: {
        categories: async(parent, args, context, info) => {
            const data = await pagination(args, context, info);
            return data;
        },
    },

    Mutation: {
        insertCategory: async(parent, args, context, info) => {
            try {
                const { name, auth_id, book_id } = args;
                const entity = {
                    name,
                    auth_id,
                    book_id,
                };
                const data = await db('categories')
                    .insert(entity)
                    .returning('*');
                return {
                    result: [data],
                };
            } catch (error) {
                return {
                    result: error,
                };
            }
        },

        updateCategory: async(parent, args, context, info) => {
            try {
                const { id, name, auth_id, book_id } = args;
                const entity = {
                    name,
                    auth_id,
                    book_id,
                };
                const data = await db('categories')
                    .where({ id })
                    .update(entity)
                    .returning('*');
                return {
                    result: data,
                };
            } catch (error) {
                return {
                    result: error,
                };
            }
        },

        deleteCategory: async(parent, args, context, info) => {
            try {
                const { id } = args;
                const data = await db('categories')
                    .del()
                    .where({ id })
                    .returning('*');
                return {
                    result: data,
                };
            } catch (error) {
                return {
                    result: error,
                };
            }
        },
    },
};

module.exports = { resolvers };