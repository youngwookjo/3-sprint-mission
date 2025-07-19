import e from 'express';
import userService from '../services/userService.js';

const creteUser = async (req, res, next) => {
  try {
    const user = req.body;
    const createdUser = await userService.userCreate(user);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
}

export default {
  creteUser,
}
