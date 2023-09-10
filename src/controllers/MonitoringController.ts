import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class MonitoringController {
  async index(request: Request, response: Response) {
    const monitoring = await prismaClient.monitoring.findMany();

    return response.json(monitoring);
  }

  async get(request: Request, response: Response) {
    const id = request.params;

    const monitoring = await prismaClient.monitoring.findFirst({ where: id });

    return response.json(monitoring);
  }

  async create(request: Request, response: Response) {
    const { id_device, temperature, humidity } = request.body;

    const monitoring = await prismaClient.monitoring.create({
      data: {
        id_device,
        temperature,
        humidity
      },
    });

    return response.json(monitoring);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { id_device, temperature, humidity } = request.body;

    const monitoring = await prismaClient.monitoring.update({
      where: { id },
      data: {
        id_device,
        temperature,
        humidity
      },
    });

    return response.json(monitoring);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const monitoring = await prismaClient.monitoring.delete({
      where: { id },
    });

    return response.json(monitoring);
  }
}
