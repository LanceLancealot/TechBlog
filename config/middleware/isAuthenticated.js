const isAuthenticated = (req, res, next) => {
    // If the user is authenticated, proceed to the next middleware or route
    if (req.isAuthenticated()) {
      return next();
    }
  
    // If not authenticated, redirect to the login page or send an error response
    return res.status(401).json({ error: 'Unauthorized' });
  };
  
  module.exports = isAuthenticated;