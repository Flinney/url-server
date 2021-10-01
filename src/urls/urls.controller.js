const urls = require("../data/urls-data");

//middleware
const bodyHasHrefProperty = (req, res, next) => {
  const { data: { href } = {} } = req.body;
  console.log(href);
  if (href) {
    return next();
  }
  next({ status: 400, message: "An 'href' property is required." });
};

//create
const create = (req, res, _next) => {
  const { data: { href } = {} } = req.body;
  const newId = urls.length + 1;
  const newUrl = { id: newId, href: href };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
};

//list
const list = (req, res, _next) => {
  const currentUrls = urls;
  res.status(200).json({ data: currentUrls });
};

module.exports = {
  create: [bodyHasHrefProperty, create],
  list,
};
