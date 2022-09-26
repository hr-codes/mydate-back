const Profile = require('../models/Profile')

const profileController = {
  create: async(req, res) => {
    const { name, returns, loves, messages, requests } = req.body;

    if (!name && !returns && !loves && !messages) {
      res.status(400).json({ message: 'required fields not passed.' })

      return;
    }

    const data = {
      name,
      returns,
      loves,
      messages,
      requests
    };

    const profile = await Profile.create(data);

    if (profile) {
      try {
        res.status(201).json({
          data: {
            id: profile.id,
          },
          message: 'profile created successfully.'
        });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  },
  getAll: async (req, res) => {
    try {
      const profiles = await Profile.find();

      res.status(200).json({
        data: profiles,
        message: 'success',
      })
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  get: async (req, res) => {
    const { id } = req.params;

    try {
      const profile = await Profile.findOne({ _id: id })

      if (!profile) {
        res.status(422).json({
          data: {},
          message: 'profile not found',
        });

        return
      }

      res.status(200).json({
        data: profile,
        message: 'success',
      })
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
}

module.exports = profileController;
