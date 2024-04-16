import { Router } from "express";
import {
  getAllGames,
  findGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/game.controller.js";

const router = Router();

router.route("/create").post(createGame);

router.route("/id/:id").get(findGameById);
router.route("/all-games").get(getAllGames);
router.route("/update/:id").patch(updateGame);
router.route("/delete/:id").delete(deleteGame);

export default router;
