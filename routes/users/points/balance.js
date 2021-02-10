// Get balance
const getBalance = (data, userId) => {
  try {
    if (!data.hasOwnProperty(userId)) {
      throw "User not found";
    }
    // return data[userId]["balance"];
    return Object.keys(data[userId]["balance"]).map((x) => [
      x,
      `${data[userId]["balance"][x].toLocaleString("en")} points`,
    ]);
  } catch (e) {
    console.warn(e);
    throw "User not found";
  }
};

module.exports = (req, res) => {
  const { userId } = req.params;
  const data = req.app.get("data");
  const errorResponse = [{ message: "User not found" }];
  try {
    const successResponse = getBalance(data, userId);
    res.status(200).json(successResponse);
  } catch (e) {
    console.warn(e);
    res.status(404).json(errorResponse);
  }
};
