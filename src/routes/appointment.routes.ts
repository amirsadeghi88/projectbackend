const router = require("express").Router();
const prisma = require("../db");

router.post("/", async (req: any, res: any, next: any) => {
  const { date, vet, notes, petId } = req.body;

  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        vet,
        notes,
        petId,
      },
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req: any, res: any, next: any) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { pet: true },
    });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

router.get("/:appointmentId", async (req: any, res: any, next: any) => {
  try {
    const oneAppointment = await prisma.appointment.findUnique({
      where: { id: req.params },
      include: { pet: true },
    });

    res.json(oneAppointment);
  } catch (error) {
    next(error);
  }
});

router.put("/:appointmentId", async (req: any, res: any, next: any) => {
  const { date, vet, notes, petId } = req.body;

  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id: req.params.appointmentId },
      data: {
        date: date ? new Date(date) : undefined,
        vet,
        notes,
        petId,
      },
    });

    res.json(updatedAppointment);
  } catch (error) {
    next(error);
  }
});

router.delete("/:appointmentId", async (req: any, res: any, next: any) => {
  try {
    await prisma.appointment.delete({
      where: { id: req.params.appointmentId },
    });
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
