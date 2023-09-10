import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class UserController {
  async index(request: Request, response: Response) {
    const user = await prismaClient.user.findMany();

    return response.json(user);
  }

  async get(request: Request, response: Response) {
    const id = request.params;

    const user = await prismaClient.user.findFirst({ where: id });

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const { id_device, name, email, password } = request.body;

    const user = await prismaClient.user.create({
      data: {
        id_device,
        name,
        email,
        password
      },
    });

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { id_device, name, email, password } = request.body;

    const user = await prismaClient.user.update({
      where: { id },
      data: {
        id_device,
        name,
        email,
        password
      },
    });

    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prismaClient.user.delete({
      where: { id },
    });

    return response.json(user);
  }

  async getDataByUser(request: Request, response: Response) {
    const id = request.params;

    const user = await prismaClient.user.findFirst({
      where: id,
      include: {
        device: true,
      }
    });

    return response.json(user);
  }
}
