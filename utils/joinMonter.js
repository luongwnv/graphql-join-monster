const { connectionFromArray } = require('graphql-relay');
const joinMonster = require('join-monster').default;

const db = require('../db/knex');

const options = { dialect: 'pg' };

const pagination = async(args, context, resolveInfo) => {
    const data = await joinMonster(
        resolveInfo,
        context,
        async(sql) => {
            return await db.raw(sql);
        },
        options
    );
    return data;
};

module.exports = { pagination };