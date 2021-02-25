const trimmer = (req, res, next) => {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string' || value instanceof String) {
        req.body[key] = value.trim();
      }        
    }
    next();
  }

module.exports = trimmer;
