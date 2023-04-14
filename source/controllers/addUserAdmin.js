const addUser = (req, res) => {
    const email = req.body.email;
    res.render("admin/adminAddUser.ejs", { email: email });
  };
  
  module.exports = addUser;