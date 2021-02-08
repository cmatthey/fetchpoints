const sortDate = require("./utils/sortDate");
// Main calculation logic to deduct points
const calc = (data, userId, points) => {
  deductedPoints = {};
  if (points < 0) throw "Cannot deduct negative points";
  if (!data.hasOwnProperty(userId)) {
    throw "User not found";
  }
  const totalBalance = Object.values(data[userId]["balance"]).reduce((a, c) => {
    a + c;
  });
  if (points > totalBalance) throw "Balance cannot go negative";
  if (!data[userId].hasOwnProperty("transactionsByDate")) {
    throw "Data corrupted";
  }
  const transactionDatesSToL = Object.keys(
    data[userId]["transactionsByDate"]
  ).sort(sortDate);
  let payers = [];
  for (let i = 0; i < transactionDatesSToL.length; i++) {
    payers = Object.keys(
      data[userId]["transactionsByDate"][transactionDatesSToL[i]]
    );
    for (let j = 0; j < payers.length; j++) {
      if (
        points <
        data[userId]["transactionsByDate"][transactionDatesSToL[i]][payers[j]]
      ) {
        data[userId]["transactionsByDate"][transactionDatesSToL[i]][
          payers[j]
        ] -= points;
        data[userId]["transactionsByPayer"][payers[j]][
          transactionDatesSToL[i]
        ] -= points;
        deductedPoints[payers[j]] = (deductedPoints[payers[j]] || 0) - points;
        data[userId]["balance"][payers[j]] -= points;
        break;
      } else {
        points -=
          data[userId]["transactionsByDate"][transactionDatesSToL[i]][
            payers[j]
          ];
        deductedPoints[payers[j]] =
          (deductedPoints[payers[j]] || 0) -
          data[userId]["transactionsByDate"][transactionDatesSToL[i]][
            payers[j]
          ];
        delete data[userId]["transactionsByDate"][transactionDatesSToL[i]][
          payers[j]
        ];
        delete data[userId]["transactionsByPayer"][payers[j]][
          transactionDatesSToL[i]
        ];
        data[userId]["balance"][payers[j]] -= points;
      }
    }
  }
  return deductedPoints;
};

module.exports = (req, res) => {
  const { userId } = req.params;
  const { points } = req.body;
  let data = req.app.get("data");
  const errorResponse = { message: "Deduction failed" };
  try {
    const deductedPoints = calc(data, userId, points);
    const successResponse = Object.keys(deductedPoints).map((p) => {
      return [p, `${deductedPoints[p].toLocaleString("en")} points`, "now"];
    });
    req.app.set("data", data);
    res.status(200).json(successResponse);
  } catch (e) {
    res.status(400).json(errorResponse);
  }
  const successResponse = {
    points: deductedPoints,
  };
};
