module.exports = {
  get: {
    summary: "Get the points balance of the user",
    description: "Get the points balance of the user",
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
    responses: {
      200: {
        description: "Points balance query successful",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
      404: {
        description: "User not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/error" },
          },
        },
      },
    },
  },
};
