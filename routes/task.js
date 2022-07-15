const router = require("express").Router();
let Task = require('../models/task');

router.route('/').get((req, res) => {
  const userId = req.query.userId;
  Task.find({ userId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;