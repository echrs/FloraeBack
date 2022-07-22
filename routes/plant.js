const router = require('express').Router();
let Plant = require('../models/plant');
let User = require('../models/user');

router.route('/').post(async (req, res) => {
  const { userId, nickname, name, notes, tasks, img } = req.body;
  try {
    const result = await Plant.create({ nickname, name, notes, tasks, img });
    await User.findOneAndUpdate({ _id: userId }, { $push: { plants: result._id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Something went wrong');
    console.log(error);
  }
});

module.exports = router;
