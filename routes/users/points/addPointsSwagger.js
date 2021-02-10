module.exports = {
  post: {
    summary: "Adding the points of the user",
    description: "Adding the points of the user",
    parameters: [
      {
        name: "userId",
        in: "path",
        required: true,
        schema: {
          type: "integer",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { type: "array", items: { type: "string" } },
        },
      },
    },
    responses: {
      200: {
        description: "Adding points of the user successful",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
      400: {
        description: "Points cannot go negative",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/error" },
          },
        },
      },
    },
  },
};
