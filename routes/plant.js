const router = require('express').Router();
let Plant = require('../models/plant');
let auth = require('../auth');
let axios = require('axios')

router.route('/').post(auth, async (req, res) => {
  try {
    let bulkOps = [];
    req.body?.forEach((plant) => {
      let obj = {
        updateOne: {
          filter: { _id: plant._id },
          update: plant,
          upsert: true,
        },
      };
      bulkOps.push(obj);
    });
    await Plant.bulkWrite(bulkOps);
    const userId = req.userId;
    let result = await Plant.find({ userId });
    const toDelete = result.filter((x) => !req.body.some((y) => x._id.toString() === y._id.toString()));
    if (toDelete.length) {
      toDelete.forEach(async (plant) => {
        await Plant.findByIdAndDelete(plant._id);
      });
      result = await Plant.find({ userId });
    }
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
    .then(() => res.status(200).json({ response: 'Successfully updated' }))
    .catch((err) => res.status(500).send('Something went wrong'));
});

router.route('/:id').delete(auth, (req, res) => {
  Plant.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ response: 'Successfully deleted' }))
    .catch((err) => res.status(500).send('Something went wrong'));
});

router.route('/identify').post(async (req, res) => {
  try {
    let result = await getData(req.body.plant);
    res.status(200).send(result.data);
  } catch (error) {
    res.status(500).send('Something went wrong');
    console.log(error);
  }
});

const getData = async (plant) => {
  let key = process.env.API_KEY;
  let options = {
    method: 'POST',
    url: 'https://api.plant.id/v2/identify',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': key,
    },
    data: {
      images: [plant],
      modifiers: ['crops_simple'],
      plant_details: ['common_names', 'wiki_description'],
    },
  };

  try {
    let result = await axios(options);
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = router;
