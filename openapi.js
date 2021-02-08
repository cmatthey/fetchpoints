const balanceSwagger = require('./routes/users/points/balanceSwagger');
module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Points',
        description: 'Update users with points',
        contact: {
            name: 'Coco Matthey',
            email: '',
            url: 'https://github.com/cmatthey',
        },
        license: {},
    },
    servers: [
        {
            url: 'http://localhost:3080/v1',
            description: 'Local server',
        }
    ],
    paths: {
        '/users/{userId}/points': balanceSwagger,
    },
    components: {
        schemas: {
            error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                },
            },
            user: {
                name: 'point',
                in: 'path',
                description: '',
                required: false,
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                },
            },
        },
    },
};