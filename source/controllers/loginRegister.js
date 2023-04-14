const items = require("../models/user_model");
const Credential = items.Credential;
const Detail = items.Detail;

const RegisterUser = async (req, res) => {
  try {
    const { email, name, rollNo, dept, role } = req.body;
    const password = rollNo;
    const adminMail = req.body.adminMail;
    const userCheck = await Credential.find({ email: email });
    if (userCheck.length == 0) {
      const credential = new Credential({
        email: email,
        name: name,
        rollNo: rollNo,
        dept: dept,
        role: role,
        password: password,
      });
      await credential.save();
      const detail = new Detail({ name: name, email: email });
      await detail.save();
      res.render("admin/adminAddUser.ejs", { email: adminMail });
      // return res.status(200).json({ message: "User registered successfully" });
      // redirect to home / login page
    } else {
      return res.status(200).json({ message: "User already exists" });
      // Redirect to login page
    }
  } catch (error) {
    console.log("Error in Register User");
    console.log(error);
    res.send(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Credential.find({ email: email, password: password });
    // console.log(user[0].role);
    // res.status(200).json({"message":user});
    if (user.length != 0) {
      // res.status(200).json({message: "User login successful"});
      // Redirect to admin/client page

      let u = user[0].role;
      if (u === "student") {
        const data = await Detail.aggregate([
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

        res.render("client/clientViewRequest.ejs", {
          data: data,
          email: email,
        });
      } else if (u == "admin") {
        const data = await Detail.aggregate([
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
        res.render("admin/adminViewRequest.ejs", { data: data , email:email });
      }
    } else {
      // res.status(200).json({message :"Invalid user.Please login again"})
      // Redirect to login page
      res.render("common/login.ejs");
    }
  } catch (error) {
    console.log("Error in login user");
    console.log(error);
    res.send(error);
  }
};

module.exports = { RegisterUser, LoginUser };