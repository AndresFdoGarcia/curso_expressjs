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

module.exports = {
  getUser,
  serchQueryParamsUser
}