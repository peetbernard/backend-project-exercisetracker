const express = require("express")
const router = express.Router()

const {
  createUser,
  getAllUsers,
  createExercise,
  getExPerUser,
} = require("../controllers/actions")

router.route("/").post(createUser).get(getAllUsers)
router.route("/:_id/logs").get(getExPerUser)
router.route("/:_id/exercises").post(createExercise)

module.exports = router
