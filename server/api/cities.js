const router = require("express").Router();

const {
  models: {
    City,
    Healthcare,
    PrimaryStats,
    LivingCost,
    Transportation,
    Weather,
    Pollution,
  },
} = require("../db");

module.exports = router;

//mounted on /api/cities
router.get("/", async (req, res, next) => {
  try {
    const cities = await City.findAll({
      order: [["name", "ASC"]],
    });
    res.send(cities);
  } catch (err) {
    next(err);
  }
});

///THREE CITIES
router.get("/preferences/:model", async (req, res, next) => {
  try {
    let model = req.params.model;
    let { param } = req.query;
    console.log(model, req.query)

    let modelName =
      model === "Healthcare"
        ? Healthcare
        : model === "Pollution"
        ? Pollution
        : model === "Transportation"
        ? Transportation
        : model === "LivingCost"
        ? LivingCost
        : model === "primaryStats"
        ? PrimaryStats
        : model === "Weather"
        ? Weather
        : "NO MODEL ERROR";

    let modelAttr =
      model === "Healthcare"
        ? ["cityId", "index"]
        : model === "Pollution" && param === 'index'
        ? ["cityId", ["indexPollution", "index"]]
        : model === "Pollution" && param === 'green'
        ? ["cityId", ["greenParksQuality", "greenIndex"]]
        : model === "Transportation"
        ? ["cityId", ["trainAndBus", "index"]]
        : model === "LivingCost"
        ? ["cityId", ["daycare", "index"]]
        : model === "primaryStats"
        ? ["cityId", ["rent1br", "index"]]
        : model === "Weather"
        ? ["cityId", ["avgMaxTemp", "index"]]
        : model === "Weather"
        ? ["cityId", ["avgMinTemp", "index"]]
        : "NO ATTR ERROR";

    let modelOrder =
      model === "Healthcare"
        ? [["index", "DESC"]]
        : model === "Pollution" && param === 'index'
        ? [["indexPollution", "ASC"]]
        : model === "Pollution" && param === 'green'
        ? [["greenParksQuality", "DESC"]]
        : model === "Transportation"
        ? [["trainAndBus", "DESC"]]
        : model === "LivingCost"
        ? [["daycare", "ASC"]]
        : model === "primaryStats"
        ? [["rent1br", "ASC"]]
        : model === "Weather" && param === 'warm'
        ? [["avgMaxTemp", "DESC"]]
        : model === "Weather" && param === 'cold'
        ? [["avgMinTemp", "ASC"]]
        : "NO ORDER ERROR";

    let modelWhere =
      param === "warm" ? { month: "July" } : param === 'cold' ? {month: "January"} : "";

    const threeCities = await modelName.findAll({
      where: modelWhere,
      attributes: modelAttr,
      order: modelOrder,
      include: [{ model: City }],
    });
    res.send(threeCities);
  } catch (err) {
    next(err);
  }
});


router.get("/:cityName", async (req, res, next) => {
  try {
    const city = await City.findOne({
      where: {
        name: req.params.cityName,
      },
      include: [
        { model: PrimaryStats },
        { model: Healthcare },
        { model: LivingCost },
        { model: Transportation },
        { model: Pollution },
      ],
    });
    res.send(city);
  } catch (err) {
    next(err);
  }
});

router.get("/cityById/:cityId", async (req, res, next) => {
  try {
    const city = await City.findOne({
      where: {
        id: req.params.cityId,
      },
      include: [
        { model: PrimaryStats },
        { model: Healthcare },
        { model: LivingCost },
        { model: Transportation },
        { model: Weather },
        { model: Pollution },
      ],
    });
    res.send(city);
  } catch (err) {
    next(err);
  }
});


router.get("/:cityId/weather", async (req, res, next) => {
  try {
    const city = await Weather.findAll({
      where: {
        cityId: req.params.cityId,
      },
    });
    res.send(city);
  } catch (err) {
    next(err);
  }
});

