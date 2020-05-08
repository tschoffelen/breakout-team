const { randomBytes } = require('crypto');
const { v4: uuid } = require('uuid');
let arc = require('@architect/functions');

exports.handler = async function http(req) {
    const body = arc.http.helpers.bodyParser(req);

    const slug = randomBytes(5).toString('hex');

    const rooms = body.rooms.map((title) => ([uuid(), title, 0]));

    const data = {
        slug,
        type: body.type,
        maxParticipants: Number(body.maxParticipants) || 99,
        rooms
    };

    const tables = await arc.tables();
    await tables.breakouts.put(data);

    return {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    };
};
