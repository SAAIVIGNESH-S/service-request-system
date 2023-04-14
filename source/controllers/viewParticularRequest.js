const items = require("../models/user_model");
const Detail = items.Detail;
const { ObjectId } = require("mongodb");

// If the user views it , it marked as read...
viewParticularRequest = async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  console.log("CHECK ID & EMAIL", id, email);
  // const data =await Detail.find({"mails.$[].toMail":email})
  const detail = await Detail.updateMany(
    { "mails.toMail": email },
    { $set: { "mails.$[ele].read": true } },
    { arrayFilters: [{ "ele.toMail": email, "ele._id": id }] }
  );

  const data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        "mails._id": new ObjectId(id),
        "mails.toMail": email,
      },
    },
  ]);

  console.log(data);

  res.render("admin/adminViewParticularRequest.ejs", { data: data , email:email });
};

module.exports = viewParticularRequest;

// If possible do view request and read requests
