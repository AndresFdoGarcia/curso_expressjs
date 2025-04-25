const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname,'users.json');

const getUser = (req, res) => { 
    const userId = req.params.id;
    // Simulate fetching user from a database
    const user = { id: userId, name: 'John Doe' };
    res.status(200).json(user);
  }
  
  const serchQueryParamsUser = (req, res) => {
    const terms = req.query.termino || 'No search term provided';
    const category = req.query.categoria || 'No category provided';
  
    res.send(`
      <h1>Search Results</h1>
      <p>Search Term: ${terms}</p>
      <p>Category: ${category}</p>
      `)
  }
  
  const validateForm = (req, res) => {
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

  const readUserFile = (req,res) => {
    fs.readFile(userFilePath, 'utf8', (err, data) => {
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
  
  module.exports = {
    getUser,
    serchQueryParamsUser,
    validateForm,
    readUserFile
  }