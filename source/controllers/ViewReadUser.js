const { ObjectId } = require("mongodb");
const items = require("../models/user_model");
const Detail = items.Detail;

const viewReadUser = async (req, res) => {
  const email = req.body.email;
  const choice = req.body.choice;
  console.log(email, "+", choice);
  let data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        email: email,
      },
    },
    {$sort: {"mails.sendDateTime": -1}}
  ]);
  if (choice === "read") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
          "mails.read":true
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  } else if (choice === "notRead") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
          "mails.read": false
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  }
  else {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  }
  res.render("client/clientViewRequest.ejs", { data: data, email: email });
  // res.status(200).json({ message: data });
};

module.exports = viewReadUser;