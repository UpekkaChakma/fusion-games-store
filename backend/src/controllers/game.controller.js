import { isValidObjectId } from "mongoose";

import Game from "../models/game.model.js";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/error/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAllGames = asyncHandler(async (_req, res) => {
  const result = await Game.find().select(
    "title developer publisher images price"
  );

  if (!result || result?.length === 0) {
    throw new ApiError().serverError();
  }

  res.status(200).json(new ApiResponse({ statusCode: 200, data: result }));
});

const findGameById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError().invalidMongodbObjectId();
  }

  const result = await Game.findById(id);
  if (!result) {
    throw new ApiError().notFound();
  }

  res.status(200).json(new ApiResponse({ statusCode: 200, data: result }));
});

const createGame = asyncHandler(async (req, res) => {
  const newGame = new Game(req.body);
  newGame.body = req.body;

  const result = await newGame.save();

  if (!result) {
    throw new ApiError().serverError();
  }

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Successfully created",
      data: result,
    })
  );
});

const updateGame = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError().invalidMongodbObjectId();
  }

  const game = await Game.findById(id);
  if (!game) {
    throw new ApiError({ message: "Nothing to update" }).notFound();
  }

  const parsedData = game.validateData(req.body);

  const result = await Game.findByIdAndUpdate(
    id,
    { $set: parsedData },
    { new: true }
  );

  if (!result?._id) {
    throw new ApiError().serverError();
  }

  res.status(200).json(
    new ApiResponse({
      statusCode: 204,
      message: "Document updated successfully",
      data: result,
    })
  );
});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError().invalidMongodbObjectId();
  }

  const deletedDoc = await Game.findByIdAndDelete(id);

  if (!deletedDoc?._id) {
    throw new ApiError({ message: "Nothing to delete." }).notFound();
  }
  res.status(200).json(
    new ApiResponse({
      statusCode: 204,
      message: "Document deleted successfully",
    })
  );
});

export { findGameById, getAllGames, createGame, updateGame, deleteGame };
