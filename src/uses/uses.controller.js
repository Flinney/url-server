const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

//middleware
const isValidUseId = (req, res, next) => {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({ status: 404, message: `${useId} not valid.` });
};

const isValideDelete = (req, res, next) => {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({ status: 405, message: `Use id not found: ${req.params.useId}` });
};

const doesUrlMatchUse = (req, res, next) => {
  const { urlId } = req.params;
  if (!urlId) {
    return next();
  }
  if (res.locals.use.urlId !== res.locals.url.id) {
    return next({
      stats: 404,
      message: `Use ${res.locals.use.id} does not match url ${res.locals.url.id}`,
    });
  }
  next();
};

//list
function list(req, res) {
  const { urlId } = req.params;
  let results = [...uses];
  if (urlId) {
    results = results.filter((use) => use.urlId === Number(urlId));
  }
  res.json({ data: results });
}

//read
const read = (req, res, next) => {
  res.status(200).json({ data: res.locals.use });
};

//annihilate
const annihilate = (req, res, next) => {
  const { useId } = req.params;
  const idx = uses.findIndex((use) => use.id === Number(useId));
  uses.splice(idx, 1);
  res.sendStatus(204);
};

module.exports = {
  list,
  read: [isValidUseId, doesUrlMatchUse, read],
  annihilate: [isValidUseId, annihilate],
  isValidUseId,
};
