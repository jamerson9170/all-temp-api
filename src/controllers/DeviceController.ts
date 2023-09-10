import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class DeviceController {
  async index(request: Request, response: Response) {
    const device = await prismaClient.device.findMany();

    return response.json(device);
  }

  async get(request: Request, response: Response) {
    const id = request.params;

    const device = await prismaClient.device.findFirst({ where: id });

    return response.json(device);
  }

  async create(request: Request, response: Response) {
    const { name } = request.body;

    const device = await prismaClient.device.create({
      data: { name },
    });

    return response.json(device);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const device = await prismaClient.device.update({
      where: { id },
      data: { name },
    });

    return response.json(device);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const device = await prismaClient.device.delete({
      where: { id },
    });

    return response.json(device);
  }

  async getMonitoringDataByDevice(request: Request, response: Response) {
    const id = request.params;

    const device = await prismaClient.device.findFirst({
      where: id,
      include: {
        _count: true,
        User: {
          select: {
            name: true,
            email: true,
            id_device: true
          }
        },
        Settings: true,
        Monitoring: {
          // take: 2,
          orderBy: {
            create_at: "desc"
          },
        },
      }
    });

    return response.json(device);
  }
}
