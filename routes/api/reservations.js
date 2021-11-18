const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Reservation = require('../../models/Reservation');
const Facility = require('../../models/Facility');
const { body, validationResult } = require('express-validator');
const moment = require('moment');

// @route  GET api/reservations
// @desc   Get all reservations
// @access Public
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('facility')
      .populate('user', ['_id', 'role', 'name']);
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
    const reservation = await Reservation.findById(req.params.id)
      .populate('facility')
      .populate('user', ['_id', 'role', 'name']);

    if (!reservation) {
      return res.status(404).json({ msg: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Reservation not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  GET api/reservations/facility/:facilityName
// @desc   Get all reservations on specific facility by FacilityName
// @access Public
router.get('/facility/:facilityName', async (req, res) => {
  try {
    const facilityFromDB = await Facility.findOne({
      name: req.params.facilityName,
    });
    const reservations = await Reservation.find({
      facility: facilityFromDB.id,
    })
      .populate('facility')
      .populate('user', ['_id', 'role', 'name']);

    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/reservations/user/:userId
// @desc   Get all reservations of specific user by userId
// @access Public
router.get('/user/:userId', async (req, res) => {
  try {
    const userFromDB = await User.findById(req.params.userId).select(
      '-password'
    );

    const reservations = await Reservation.find({
      user: userFromDB.id,
    })
      .populate('facility')
      .populate('user', ['_id', 'role', 'name']);

    res.json(reservations);
  } catch (err) {
    console.error(err.message);
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
      if (moment(startDate).isBefore(Date.now())) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Start of reservation can not be before present Date (in the past)',
            },
          ],
        });
      } else if (moment(endDate).isBefore(startDate)) {
        return res.status(400).json({
          errors: [
            {
              msg: 'End of reservation can not be before Start of reservation',
            },
          ],
        });
      } else if (startDate === endDate) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Start of reservation can not be equal to End of reservation',
            },
          ],
        });
      }

      // const user = await User.findById(req.user.id).select('-password');

      let facility = await Facility.findOne({ name: facilityName });

      if (!facility) {
        return res.status(400).json({
          errors: [{ msg: 'Facility with that name does not exist' }],
        });
      }

      // let reservation = await Reservation.find({ facility: {name: facilityName }, });
      let reservations = await Reservation.find({
        facility: { _id: facility.id },
      });

      let flag = 0;
      reservations.forEach((reservation) => {
        if (
          moment(reservation.startDate).isBetween(startDate, endDate) ||
          moment(reservation.endDate).isBetween(startDate, endDate) ||
          moment(startDate).isBetween(
            reservation.startDate,
            reservation.endDate
          ) ||
          moment(startDate).isSame(reservation.startDate) ||
          moment(endDate).isSame(reservation.endDate)
        ) {
          flag = 1;
        }
      });

      if (flag) {
        return res.status(400).json({
          errors: [{ msg: 'Reservation between this dates already exist' }],
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

module.exports = router;
