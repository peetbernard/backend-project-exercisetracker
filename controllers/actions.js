const Exercise = require("../db/model")

const createUser = async (req, res) => {
  const user = await Exercise.create(req.body)
  res.json({ username: user.username, _id: user._id })
}

const getAllUsers = async (req, res) => {
  const user = await Exercise.find({}, { username: 1 })
  res.json(user)
}

const createExercise = async (req, res) => {
  let { duration, description, date } = req.body
  if (!date) {
    date = Date.now()
  }
  const exToSave = {
    description: description,
    duration: duration,
    date: new Date(date).toDateString(),
  }
  await Exercise.updateOne(
    { _id: req.params._id },
    {
      $push: {
        exercise: exToSave,
      },
    }
  )

  res.json(exToSave)
}

const getExPerUser = async (req, res) => {
  const { from, to, limit } = req.query
  const id = req.params._id
  const user = await Exercise.findById(id)
  const final = {
    username: user.username,
    count: user.exercise.length,
    _id: user._id,
    log: user.exercise.map((item) => ({
      description: item.description,
      duration: item.duration,
      date: item.date,
    })),
  }
  if (from) {
    final.from = from
    final.log = final.log.filter(
      (item) => Date.parse(item.date) > Date.parse(from)
    )
    final.count = final.log.length
  }
  if (to) {
    final.to = to
    final.log = final.log.filter(
      (item) => Date.parse(item.date) < Date.parse(to)
    )
    final.count = final.log.length
  }
  if (limit) {
    final.log = final.log.slice(0, limit)
  }
  res.json(final)
}

module.exports = { createUser, getAllUsers, createExercise, getExPerUser }
