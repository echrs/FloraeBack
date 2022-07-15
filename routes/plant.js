const router = require("express").Router();
let Plant = require("../models/plant");

// router.route('/').get((req, res) => {
//   Plant.find()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

module.exports = router;
