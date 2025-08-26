const prisma = require("../db");
import { Request, Response, NextFunction } from "express";
const router = require("express").Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, species, breed, age } = req.body;

  try {
    const newPet = await prisma.pet.create({
      data: {
        name,
        species,
        breed, // optional
        age,
      },
    });

    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allPets = await prisma.pet.findMany({
      include: { appointments: true },
    });
    res.json(allPets);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:petId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const onePet = await prisma.pet.findUnique({
        where: { id: req.params.petId },
        include: { appointments: true },
      });

      res.json(onePet);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
