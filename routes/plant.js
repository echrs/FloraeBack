const router = require("express").Router();
let Plant = require("../models/plant");

router.route('/').get((req, res) => {
  const userId = req.query.userId;
  Plant.find({ userId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
