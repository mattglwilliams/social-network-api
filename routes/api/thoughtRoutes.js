const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId/
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/thoughts/:thoughtsId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
