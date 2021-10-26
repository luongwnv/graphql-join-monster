const { nodeDefinitions, fromGlobalId } = require('graphql-relay');

const joinMonster = require('join-monster').default;

const db = require('../db/knex');

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId, context, resolveInfo) => {
        const { type, id } = fromGlobalId(globalId);
        return joinMonster.getNode(
            type,
            resolveInfo,
            context,
            parseInt(id),
            (sql) => {
                db.raw(sql);
            }
        );
    },
    (obj) => obj.__type__
);

module.exports = { nodeInterface, nodeField };