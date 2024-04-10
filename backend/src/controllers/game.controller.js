import { isValidObjectId } from "mongoose";

import Game from "../models/game.model.js";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/error/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAllGames = asyncHandler(async (req, res, next) => {});
const findGameById = asyncHandler(async (req, res, next) => {});

const createGame = asyncHandler(async (req, res) => {
  const newGame = new Game(req.body);
  newGame.body = req.body;
  const result = await newGame.save();
  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Successfully created",
      data: result,
    })
  );
});

const updateGame = asyncHandler(async (req, res, next) => {});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError({
      statusCode: 400,
      message: "id is not valid.",
    });
  }

  const deletedDoc = await Game.findByIdAndDelete(id);

  if (!deletedDoc?._id) {
    throw new ApiError({ statusCode: 404, message: "Nothing to delete." });
  }
  res.status(200).json(
    new ApiResponse({
      statusCode: 204,
      message: "Document deleted successfully",
    })
  );
});

export { findGameById, getAllGames, createGame, updateGame, deleteGame };
