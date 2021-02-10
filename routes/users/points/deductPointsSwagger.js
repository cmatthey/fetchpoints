module.exports = {
  post: {
    summary: "Deduct the points of the user",
    description: "Deduct the points of the user",
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
          schema: {
            type: "object",
            properties: { points: { type: "integer" } },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Deducting points of the user successful",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
      400: {
        description: "Deduction failed",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/error" },
          },
        },
      },
    },
  },
};
