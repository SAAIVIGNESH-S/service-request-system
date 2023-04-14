const newReq = (req, res) => {
  const email = req.body.email;
  res.render("client/clientAddRequest.ejs", { email: email });
};

module.exports = newReq;