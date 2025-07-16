import prisma  from '../../lib/prisma.js';

export const creatTimeBlock = async (req, res) => {
  const { start, end } = req.body;
  if(req.user.role !== 0){
    return res.status(403).json({ error: 'Access denied' });
  }
  if (!start || !end) {
    return res.status(400).json({ error: 'Start and end times are required' });
  }

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

export const listTimeBlocks = async (req, res) => {
  if(req.user.role !== 0){
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const timeBlocks = await prisma.timeBlock.findMany();
    res.status(200).json(timeBlocks);
  } catch (error) {
    console.error('Error fetching time blocks:', error);
    res.status(500).json({ error: 'Error fetching time blocks' });
  }
}