import prisma  from '../../lib/prisma.js';

export const createAppointment = async (req, res) => {
  const { date, time, userId } = req.body;

  try {
    const appointment = await prisma.cita.create({
      data: {
        fecha: date,
        hora: time,
        usuarioId: userId,
      },
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error creating appointment' });
  }
}