const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//middleware
const bodyHasHrefProperty = (req, res, next) => {
  const { data: { href } = {} } = req.body;
  console.log(href);
  if (href) {
    return next();
  }
  next({ status: 400, message: "An 'href' property is required." });
};

const isValidUrlId = (req, res, next) => {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({ status: 404, message: `${urlId} not found.` });
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

//read
const read = (req, res, _next) => {
  const newUse = {
    id: uses.length + 1,
    urlId: res.locals.url.id,
    time: Date.now(),
  };
  uses.push(newUse);
  res.status(200).json({ data: res.locals.url });
};

//update
const update = (req, res, _next) => {
  const { data: { href } = {} } = req.body;
  res.locals.url.href = href;
  res.json({ data: res.locals.url });
};

module.exports = {
  create: [bodyHasHrefProperty, create],
  list,
  read: [isValidUrlId, read],
  update: [isValidUrlId, bodyHasHrefProperty, update],
  isValidUrlId,
};
