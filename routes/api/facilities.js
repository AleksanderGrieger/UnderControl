const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Facility = require('../../models/Facility');
const { body, validationResult } = require('express-validator');

// @route  GET api/facilities
// @desc   Get all facilities
// @access Public
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/facilities/:id
// @desc   Get facility by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({ msg: 'Facility not found' });
    }

    res.json(facility);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Facility not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  POST api/facilities
// @desc   Add facility
// @access Private
router.post(
  '/',
  auth,
  [
    body('name', 'Name is required').not().isEmpty(),
    // body('available', 'Availability is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      if (user.role === 'admin') {
        let facility = await Facility.findOne({ name });

        if (facility) {
          return res.status(400).json({
            errors: [{ msg: 'Facility with that name already exist' }],
          });
        }

        facility = new Facility({
          name,
        });

        await facility.save();

        res.json(facility);
      } else {
        console.error('Unauthorized action');
        res.status(401).send('Unauthorized action');
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
