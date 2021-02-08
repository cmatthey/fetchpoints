// TODO: error handling
// TODO: confirm the requirement

module.exports = (req, res) => {
  res.type("application/json");
  const successResponse = [{payer: 'DANNON', points: 1000}];
  res.status(200);
  return res.json(successResponse);
};
