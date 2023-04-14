const items = require("../models/user_model");
const Detail = items.Detail;

viewAllRequest = async (req, res) => {
  const { mail } = req.body;
  const data = await Detail.aggregate([
    {
      $unwind: "$mails",
    },
    {
      $match: {
        "mails.toMail": mail,
      },
    },
    {$sort: {"mails.sendDateTime": -1}}
  ]);
  // const det = await Detail.findById({'mails._id':id});

  res.status(200).json({ message: data });
};

// viewParticularRequest = async (req, res) => {
//     const { mail, id } = req.body;
//     console.log(id);
//     const data = await Detail.aggregate([
//         {
//             $unwind: '$mails'
//         },
//         {
//             $match: {
//                 'mails._id': new ObjectId(id),
//                 'mails.toMail': mail
//                 // 'mails._id':id
//             }
//         }
//     ])

//     res.status(200).json({ "message": data });
// }

module.exports = { viewAllRequest };
