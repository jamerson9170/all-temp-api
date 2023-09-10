import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class SettingsController {
  async index(request: Request, response: Response) {
    const settings = await prismaClient.settings.findMany();

    return response.json(settings);
  }

  async get(request: Request, response: Response) {
    const id = request.params;

    const settings = await prismaClient.settings.findFirst({ where: id });

    return response.json(settings);
  }

  async create(request: Request, response: Response) {
    const {
      id_device,
      temperature_max,
      temperature_min,
      humidity_max,
      humidity_min,
      interval_monitoring 
    } = request.body;

    const settings = await prismaClient.settings.create({
      data: {
        id_device,
        temperature_max,
        temperature_min,
        humidity_max,
        humidity_min,
        interval_monitoring
      },
    });

    return response.json(settings);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      id_device,
      temperature_max,
      temperature_min,
      humidity_max,
      humidity_min,
      interval_monitoring 
    } = request.body;

    const settings = await prismaClient.settings.update({
      where: { id },
      data: {
        id_device,
        temperature_max,
        temperature_min,
        humidity_max,
        humidity_min,
        interval_monitoring
      },
    });

    return response.json(settings);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const settings = await prismaClient.settings.delete({
      where: { id },
    });

    return response.json(settings);
  }
}
