const mongoose = require("mongoose");

var validateEmail = function (email) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const mailSchema = new mongoose.Schema({
  toMail: {
    // To whom we send the mail..
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sendDateTime: {
    // When the email is send
    type: Date,
    required: true,
    default: Date.now,
  },
  approveOrRejectTime: {
    type: Date,
    // required:true
  },
  approverContent: {
    type: String,
    // required:true
  },
  pendingFlag: {
    type: Boolean,
    required: true,
    default: true, //previously entered false
  },
  // If approvedflag and rejectedflag are empty(false) , we want to display..
  approvedFlag: {
    type: Boolean,
    required: true,
    default: false,
  },
  rejectedFlag: {
    type: Boolean,
    required: true,
    default: false,
  },
  read: {
    // Check whether the mail is read or not..
    type: Boolean,
    default: false,
  },
});

const detailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  mails: {
    type: [mailSchema],
    required: true,
    default: [],
  },
});

const Detail = mongoose.model("Detail", detailSchema);

const credentialSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = { Credential, Detail, mailSchema };
