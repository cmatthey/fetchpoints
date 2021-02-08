module.exports = {
  get: {
    summary: 'Get the points balance of the user',
    description: 'Get the points balance of the user',
    parameters: [],
    responses: {
      200: {
        description: 'Points balance query successful',
      },
      400: {
        description: 'bad request',
      },
      503: {
        description: 'Points balance error',
      },
    },
  },
};
