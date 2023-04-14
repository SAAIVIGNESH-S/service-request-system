const items = require("../models/user_model");
const Detail = items.Detail;
const moment = require('moment');

const addDetail = async (req, res) => {
  try {
    const { email, toMail,priority, subject, content } = req.body;
    console.log(email,toMail,priority,subject,content);
    const detail = await Detail.updateOne(
      { email: email },
      {
        $push: {
          mails: {
            toMail: toMail,
            priority:priority,
            sendDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            approverContent: "",
            content: content,
            subject: subject,
          },
        },
      }
    );

    const data = await Detail.aggregate([
      {
        $unwind: "$mails",
      },
      {
        $match: {
          email: email,
        },
      },
    ]);

    res.render("client/clientViewRequest.ejs", {
      data: data,
      email: email,
    });
    // res.status(200).json({ message: "Added Detail" });

    
  } catch (error) {
    console.log("Error in add Detail");
    console.log(error);
    res.send(error);
  }
};

module.exports = addDetail;
