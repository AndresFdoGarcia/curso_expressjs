import prisma  from '../../lib/prisma.js';

export const createAppointment = async (req, res) => {
  const { timeBlockId, userId } = req.body;
  if(req.user.role !== 0){
    return res.status(403).json({ error: 'Access denied' });
  }
  validateExistingAppointment(timeBlockId)
  .then(existingAppointment => {
    if (existingAppointment) {
      return res.status(400).json({ error: 'Appointment already exists for this date and time block' });
    }
  });
  try {
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(),
        timeBlockId: timeBlockId,
        userId: userId,
      },
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error creating appointment' });
  }
}

export const listReservations = async (req, res) => {
  if(req.user.role !== 0){
    return res.status(403).json({ error: 'Access denied' });
  }
  const reservations = await prisma.appointment.findMany({
    include: {
      user : {
        select: {          
          name: true,
          email: true,
          role: true,
        },
      },
      timeBlock: {
        select: {
          start: true,
          end: true,
        },
      },
    },
  });
  res.status(200).json(reservations);
}

const validateExistingAppointment = async (timeBlockId) => { 
  if (!timeBlockId) {
    throw new Error('TimeBlockId is required');
  }
  const existingAppointment = await prisma.appointment.findFirst({
    where: {      
      timeBlockId: timeBlockId,
    },
  });
  return existingAppointment;
}

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  if(req.user.role !== 0){
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const appointment = await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Error deleting appointment' });
  }
}

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, timeBlockId, userId } = req.body;
  if(req.user.role !== 0){
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        date: date,
        timeBlockId: timeBlockId,
        userId: userId,
      },
    });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Error updating appointment' });
  }
}