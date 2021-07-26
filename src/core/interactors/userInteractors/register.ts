import { Request, Response } from "express";

import UserRepository from "../../repositories/userRepository";
import User from "../../entities/userEntity";

export default (userRepository: UserRepository) =>
  async (user: User): Promise<User> => {
    const registeredUser = await userRepository.addUser(user);
    console.log(registeredUser);
    return registeredUser;
  };
