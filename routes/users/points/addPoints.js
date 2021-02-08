const sortDate = require("./utils/sortDate");
// Calculation logic to add points
const calc = (data, userId, payer, points, transactionDate) => {
  if (!data.hasOwnProperty(userId)) {
    data[userId] = {
      transactionsByPayer: {},
      transactionsByDate: {},
      dt: [],
      balance: {},
    };
  }
  if (!data[userId]["transactionsByPayer"].hasOwnProperty(payer)) {
    data[userId]["transactionsByPayer"][payer] = {};
  }
  if (!data[userId]["transactionsByDate"].hasOwnProperty(transactionDate)) {
    data[userId]["transactionsByDate"][transactionDate] = {};
  }
  if (points > 0) {
    data[userId]["transactionsByPayer"][payer][transactionDate] =
      data[userId]["transactionsByPayer"][payer][transactionDate] + points ||
      points;
    data[userId]["transactionsByDate"][transactionDate][payer] =
      data[userId]["transactionsByDate"][transactionDate][payer] + points ||
      points;

    data[userId]["balance"][payer] =
      data[userId]["balance"][payer] + points || points;
  } else if (points < 0) {
    if (!data[userId]["transactionsByPayer"].hasOwnProperty(payer)) {
      throw "Points cannot go negative";
    }
    if ((data[userId]["balance"][payer] || 0) + points < 0) {
      throw "Points cannot go negative";
    } else {
      data[userId]["balance"][payer] += points;
    }
    transactionDatesSToL = Object.keys(
      data[userId]["transactionsByPayer"][payer]
    ).sort(sortDate);
    for (let i = 0; i < transactionDatesSToL.length; i++) {
      data[userId]["transactionsByPayer"][payer][
        transactionDatesSToL[i]
      ] += points;
      if (
        data[userId]["transactionsByPayer"][payer][transactionDatesSToL[i]] > 0
      ) {
        data[userId]["transactionsByDate"][transactionDatesSToL[i]][payer] =
          data[userId]["transactionsByPayer"][payer][transactionDatesSToL[i]];
        break;
      } else {
        points =
          data[userId]["transactionsByPayer"][payer][transactionDatesSToL[i]];
        delete data[userId]["transactionsByPayer"][payer][
          transactionDatesSToL[i]
        ];
        if (
          Object.keys(data[userId]["transactionsByPayer"][payer]).length == 0
        ) {
          delete data[userId]["transactionsByPayer"][payer];
        }
        delete data[userId]["transactionsByDate"][transactionDatesSToL[i]][
          payer
        ];
        if (
          Object.keys(
            data[userId]["transactionsByDate"][transactionDatesSToL[i]]
          ).length == 0
        ) {
          delete data[userId]["transactionsByDate"][transactionDatesSToL[i]];
        }
      }
    }
  }
  return data;
};

module.exports = (req, res) => {
  const { userId } = req.params;
  const arr = req.body;
  const payer = arr[0];
  const points = parseInt(arr[1].split(" ")[0]);
  const transactionDate = arr[2];
  const errorResponse = { message: "Points cannot go negative" };

  try {
    let data = req.app.get("data");
    const updatedData = calc(data, userId, payer, points, transactionDate);
    req.app.set("data", updatedData);
    res.status(201).send();
  } catch (e) {
    res.status(400).json(errorResponse);
  }
};
