const items = require("../models/user_model");
const Detail = items.Detail;

const viewRequestAdmin = async (req, res) => {
  const email = req.body.email;
  const dropVal = req.body.dropVal;
  console.log(email, "  =-= ", dropVal);
  let data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        "mails.toMail": email,
      },
    },
    {$sort: {"mails.sendDateTime": -1}}
  ]);

  if (dropVal === "pending") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
          "mails.pendingFlag": true,
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  } else if (dropVal === "approved") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
          "mails.approvedFlag": true,
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  } else if (dropVal === "rejected") {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
          "mails.rejectedFlag": true,
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  } else {
    data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          "mails.toMail": email,
        },
      },
      {$sort: {"mails.sendDateTime": -1}}
    ]);
  }

  res.render("admin/adminViewRequest.ejs", { data: data, email: email });
};

module.exports = viewRequestAdmin;
