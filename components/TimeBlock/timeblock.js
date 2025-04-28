import prisma  from '../../lib/prisma.js';

export const creatTimeBlock = async (req, res) => {
  const { start, end } = req.body;

  try{
    const timeblock = await prisma.timeBlock.create({
      data: {
        start : new Date(start),
        end : new Date(end),       
      },
    });
    res.status(201).json(timeblock);
  }
  catch (error) {
    console.error('Error creating time block:', error);
    res.status(500).json({ error: 'Error creating time block' });
  }
}

