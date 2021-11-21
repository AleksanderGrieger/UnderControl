const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Reservation = require('../../models/Reservation');
const Facility = require('../../models/Facility');
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const User = require('../../models/User');

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
// @access Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    let reservations;

    if (user.role === 'admin' && req.params.userId) {
      reservations = await Reservation.find({
        user: req.params.userId,
      })
        .populate('facility')
        .populate('user', ['_id', 'role', 'name']);
    } else {
      reservations = await Reservation.find({
        user: user.id,
      })
        .populate('facility')
        .populate('user', ['_id', 'role', 'name']);
    }

    if (!reservations) {
      return res.status(400).json({
        errors: [
          {
            msg: 'This User does not have any reservation yet',
          },
        ],
      });
    }

    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/reservations
// @desc   Add reservation (Admin can make reservation for every user)
// @access Private
router.post(
  '/',
  [
    auth,
    [
      body('userEmail'),
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

    const { userEmail, facilityName, startDate, endDate } = req.body;

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

      let facility = await Facility.findOne({ name: facilityName });

      if (!facility) {
        return res.status(400).json({
          errors: [{ msg: 'Facility with that name does not exist' }],
        });
      }

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

      let user = await User.findOne({ _id: req.user.id });

      if (user.role === 'admin' && userEmail) {
        let userToReserv = await User.findOne({ email: userEmail });

        if (!userToReserv) {
          return res.status(400).json({
            errors: [{ msg: 'User with that email does not exist' }],
          });
        }

        reservation = new Reservation({
          user: userToReserv.id,
          facility: facility.id,
          startDate: startDate,
          endDate: endDate,
        });
      } else {
        reservation = new Reservation({
          user: req.user.id,
          facility: facility.id,
          startDate: startDate,
          endDate: endDate,
        });
      }

      await reservation.save();
      res.json(reservation);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  POST api/reservations/:id
// @desc   Update reservation by ID (Admin can edit reservation for every user)
// @access Private
router.post(
  '/:id',
  [
    auth,
    [
      body('userEmail'),
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

    const { userEmail, facilityName, startDate, endDate } = req.body;

    try {
      let reservation = await Reservation.findOne({ _id: req.params.id });
      if (!reservation) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Reservation with that ID does not exists',
            },
          ],
        });
      }

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
      let facility = await Facility.findOne({ name: facilityName });
      if (!facility) {
        return res.status(400).json({
          errors: [{ msg: 'Facility with that name does not exist' }],
        });
      }

      let reservations = await Reservation.find({
        facility: { _id: facility.id },
      });

      let flag = 0;
      reservations.forEach((reservationItem) => {
        // if (reservationItem.id !== req.params.id) {
        if (reservationItem.id !== reservation.id) {
          if (
            moment(reservationItem.startDate).isBetween(startDate, endDate) ||
            moment(reservationItem.endDate).isBetween(startDate, endDate) ||
            moment(startDate).isBetween(
              reservationItem.startDate,
              reservationItem.endDate
            ) ||
            moment(startDate).isSame(reservationItem.startDate) ||
            moment(endDate).isSame(reservationItem.endDate)
          ) {
            flag = 1;
          }
        }
      });

      if (flag) {
        return res.status(400).json({
          errors: [{ msg: 'Reservation between this dates already exist' }],
        });
      }

      let user = await User.findOne({ _id: req.user.id });

      if (user.role === 'admin' && userEmail) {
        let userToReserv = await User.findOne({ email: userEmail });

        if (!userToReserv) {
          return res.status(400).json({
            errors: [{ msg: 'User with that email does not exist' }],
          });
        }

        reservation = await Reservation.findOneAndUpdate(
          { _id: reservation.id },
          {
            $set: {
              user: userToReserv.id,
              facility: facility.id,
              startDate: startDate,
              endDate: endDate,
            },
          },
          { new: true }
        );
      } else {
        reservation = await Reservation.findOneAndUpdate(
          { _id: reservation.id },
          {
            $set: {
              user: req.user.id,
              facility: facility.id,
              startDate: startDate,
              endDate: endDate,
            },
          },
          { new: true }
        );
      }

      return res.json(reservation);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  DELETE api/reservations/:id
// @desc   Delete reservation by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Reservation does not exist',
          },
        ],
      });
    }

    if (
      JSON.stringify(user.id) === JSON.stringify(reservation.user) ||
      user.role === 'admin'
    ) {
      await Reservation.findOneAndRemove({
        _id: req.params.id,
      });
      res.json({ msg: 'Reservation deleted' });
    } else {
      return res.status(400).json({
        errors: [
          {
            msg: 'Reservation does not belongs to this User',
          },
        ],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
