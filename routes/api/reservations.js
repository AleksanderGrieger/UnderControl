const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Reservation = require('../../models/Reservation');
const Facility = require('../../models/Facility');
const { body, validationResult } = require('express-validator');

// @route  GET api/reservations
// @desc   Get all reservations
// @access Public
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();//.populate('facility');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/reservations/:id
// @desc   Get reservation by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ msg: 'Facility not found' });
    }

    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Facility not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  POST api/reservations
// @desc   Add reservation
// @access Public
router.post(
  '/',
  [
    auth,
    [
      body('facilityName', 'Facility name is required').not().isEmpty(),
      body('startDate', 'Start date is required').not().isEmpty(),
      body('endDate', 'End date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { facilityName, startDate, endDate } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');
      console.log(facilityName);
      let facility = await Facility.findOne({ name: facilityName });
      console.log(facility);

      if (!facility) {
        return res.status(400).json({
          errors: [{ msg: 'Facility with that name does not exist' }],
        });
      }

      reservation = new Reservation({
        user: req.user.id,
        facility: facility.id,
        startDate: startDate,
        endDate: endDate,
      });

      await reservation.save();

      res.json(reservation);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// router.post(
//     "/",
//     [auth, [check("text", "Text is required").not().isEmpty()]],
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       try {
//         const user = await User.findById(req.user.id).select("-password");

//         const newPost = new Post({
//           text: req.body.text,
//           name: user.name,
//           avatar: user.avatar,
//           user: req.user.id,
//         });

//         const post = await newPost.save();

//         res.json(post);
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//       }
//     }
//   );

module.exports = router;
