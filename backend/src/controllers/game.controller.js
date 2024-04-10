import Game from "../models/game.model.js";
import asyncHandler from "../utils/async-handler.js";

const getAllGames = asyncHandler(async (req, res) => {});
const findGameById = asyncHandler(async (req, res) => {});

const createGame = asyncHandler(async (req, res) => {});

const updateGame = asyncHandler(async (req, res) => {});

const deleteGame = asyncHandler(async (req, res) => {});

export { getAllGames, findGameById, createGame, updateGame, deleteGame };
