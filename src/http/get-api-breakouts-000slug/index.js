let arc = require('@architect/functions');

exports.handler = async function http({ pathParameters }) {
    const tables = await arc.tables();

    try {
        const data = await tables.breakouts.get({
            slug: pathParameters.slug
        });

        // TODO: set presence data for rooms

        return {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (e) {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Room not found'
            })
        };
    }
};
