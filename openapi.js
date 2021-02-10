const addPointsSwagger = require("./routes/users/points/addPointsSwagger");
const deductPointsSwagger = require("./routes/users/points/deductPointsSwagger");
const balanceSwagger = require("./routes/users/points/balanceSwagger");
const { version } = require("./package.json");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Fetch Points",
    version: version,
    description: "Alow the user to add, deduct points and view point balance.",
    contact: {
      name: "Coco Matthey",
      email: "",
      url: "https://github.com/cmatthey",
    },
    license: {},
  },
  servers: [
    {
      url: "http://localhost:3000/v1",
      description: "Local server",
    },
  ],
  paths: {
    "/users/{userId}/points/add": addPointsSwagger,
    "/users/{userId}/points/deduct": deductPointsSwagger,
    "/users/{userId}/points": balanceSwagger,
  },
  components: {
    schemas: {
      error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
