const { ObjectId } = require("mongodb");
const LinkModel = require("../models/links.model");
const ObjectID = require("mongoose").Types.ObjectId;
const randomstring = require("randomstring");

module.exports.createLink = async (req, res) => {
  let { url } = req.body;
  //generate random ID
  const randomid = randomstring.generate({
    length: 5,
    charset: "alphabetic",
    capitalization: "lowercase",
  });
  //test if string is null or no point is provided
  const regexpoints = new RegExp("\\.");
  const testregexpoints = regexpoints.test(url);
  if (url === "" || testregexpoints === false) {
    res.send("please specify a valide URL");
    res.end();
    return;
  }
  //test if string start with https or http
  const regex = new RegExp("^(http|https)://", "i");
  const regex_url = regex.test(url);
  if (regex_url === false) {
    url = "https://" + url;
  }
  //test is link is too much long
  if (url.length >= 5000) {
    res.send("please specify a valide URL");
    res.end();
    return;
  }
  //save to DB
  const savelinktodb = new LinkModel({
    _id: randomid,
    url: url,
    created_at: Date.now(),
  });
  savelinktodb.save();
  res.send(process.env.CLIENT_URL + "a/" + randomid);
};

module.exports.redirectToLink = async (req, res) => {
  const short_url = req.params.short_url;
  const query = LinkModel.findOne({ _id: short_url });

  query.exec(function (err, link) {
    if (link === null) {
      res.end();
      return;
    }
    res.redirect(link.url);
  });
};
