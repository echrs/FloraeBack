const router = require('express').Router();
let Plant = require('../models/plant');
let User = require('../models/user');
let auth = require('../auth');

router.route('/').post(auth, async (req, res) => {
  const { nickname, name, notes, tasks, img } = req.body;
  const userId = req.userId;
  try {
    const result = await Plant.create({ nickname, name, notes, tasks, img, userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Something went wrong');
    console.log(error);
  }
});

router.route('/').get(auth, (req, res) => {
  const userId = req.userId;
  Plant.find({ userId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).send('Something went wrong'));
});

router.route('/:id').patch(auth, (req, res) => {
  Plant.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(200).json({ response: "Successfully updated" }))
    .catch((err) => res.status(500).send('Something went wrong'));
});

router.route('/:id').delete(auth, (req, res) => {
  Plant.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ response: 'Successfully deleted' }))
    .catch((err) => res.status(500).send('Something went wrong'));
});

module.exports = router;
