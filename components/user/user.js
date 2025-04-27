import { fstat, readFile,writeFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import prisma  from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userFilePath = join(__dirname,'users.json');

export const getUser = (req, res) => { 
    const userId = req.params.id;
    // Simulate fetching user from a database
    const user = { id: userId, name: 'John Doe' };
    res.status(200).json(user);
}

export const getUserByEmail = (req, res) => {
    const userEmail = req.query.email;
    readFile(userFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading user data' });
      }
      const users = JSON.parse(data);
      const user = users.find(user => user.email === userEmail);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    }
    );
}
  
export const serchQueryParamsUser = (req, res) => {
    const terms = req.query.termino || 'No search term provided';
    const category = req.query.categoria || 'No category provided';
  
    res.send(`
      <h1>Search Results</h1>
      <p>Search Term: ${terms}</p>
      <p>Category: ${category}</p>
    `);
}
  
export const validateForm = (req, res) => {
    const name = req.body.name || 'No name provided';
    const email = req.body.email || 'No email provided';
  
    res.json({
      message: 'Form submitted successfully',
      data: {
        name,
        email
      }
    });
}

export const readUserFile = (req,res) => {
    readFile(userFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading user data' });
      }
      try {
        const users = JSON.parse(data);
        res.status(200).json(users);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Error parsing user data' });
      }
    }); 
}

export const createUser = (req, res) => {
  const _user = req.body;
  
  try {
    validateUser(_user);
    readFile(userFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Error reading user data' });
      }
      const users = JSON.parse(data);
      
      users.push(newUser);
      const jsonData = JSON.stringify(users, null, 2);
      writeFile(userFilePath, jsonData, (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ error: 'Error saving user data' });
        }
        console.log('User data saved successfully');
        res.status(201).json(newUser);
      });
    });    
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  
  readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading user data' });
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    
    const jsonData = JSON.stringify(users, null, 2);
    writeFile(userFilePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Error saving user data' });
      }
      console.log('User data updated successfully');
      res.status(200).json(users[userIndex]);
    });
  });
}

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  
  readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Error reading user data' });
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    
    const jsonData = JSON.stringify(users, null, 2);
    writeFile(userFilePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Error saving user data' });
      }
      console.log('User data deleted successfully');
      res.status(200).json({ message: 'User deleted successfully' });
    });
  });
}

export const dbUsers = async (req, res) => {
  try{
    const users = await prisma.usuario.findMany();
    res.status(200).json(users);
  }
  catch (error) {
    console.error('Error fetching users from database:', error);
    res.status(500).json({ error: 'Error fetching users from database' });
  }
}

export const dbRegister = async (req, res) => {
  const user = req.body;
  validateUser(user);
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  try {
    await prisma.usuario.create({
      data: newUser
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user in database:', error);
    res.status(500).json({ error: 'Error creating user in database' });
  }
}

export const dbLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.usuario.findUnique({
      where: { email }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate JWT token here
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login' });
  }
}


const validateUser = (user) => {
  const { name, email,role, password } = user;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  
  if (!name || typeof name !== 'string' || name?.length < 3) {
    console.log('Invalid user data:', user);
    throw new Error('Name must be a string with at least 3 characters');    
  }

  if (!email || !regex.test(email)) {
    console.log('Invalid user data:', user);
    //throw new Error('Invalid email format');    
  }

  if(!typeof role === "integer" || role < 0 || role > 2) {
    console.log('Invalid user data:', user);    
  }
  if (!password || password.length < 6) {
    console.log('Invalid user data:', user);    
  }
  
  return true;
}