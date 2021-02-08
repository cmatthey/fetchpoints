/* middleware to validate and sanitize adding points requests
 */
module.exports = (req, res, next) => {
  const arr = req.body;
  // Validate adding points requests contains payer, points, transactionsDate only
  if (arr.length != 3) {
    return res.status(400).json({
      message: "Invalid request body. The input array length should be 3.",
    });
  }
  // Validate adding points requests contains correct transactionDate date
  const rePt = /[0-9]+\ +points$/;
  if (!rePt.test(arr[1].toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Invalid request body. Incorrect point format" });
  }
  // Validate adding points requests contains correct transactionDate time
  const reDt = /[0-9]{1,2}\/[0-9]{1,2}\ +[0-9]{1,2}[APap][Mm]$/;
  if (!reDt.test(arr[2].toLowerCase())) {
    return res.status(400).json({
      message: "Invalid request body. Incorrect transaction date format",
    });
  }
  // Sanitize the adding points requests
  req.body = [
    arr[0].trim().toUpperCase(),
    arr[1].trim().replace(/\ +/, " ").toLowerCase(),
    arr[2].trim().replace(/\ +/, " ").toUpperCase(),
  ];
  next();
};
