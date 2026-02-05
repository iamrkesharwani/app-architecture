import express from 'express';
const app = express();

const requireRole = (targetRole) => {
  return (req, res, next) => {
    const userRole = req.headers['x-role'];
    if (userRole === targetRole) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: `Access Denied! You are a '${userRole}'. But this route requires '${targetRole}' permission.`,
      });
    }
  };
};

app.get('/admin', requireRole('admin'), (req, res) => {
  res.send('Welcome to the Admin Dashboard!');
});

app.get('/editor', requireRole('editor'), (req, res) => {
  res.send('Welcome to the Editor Panel!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
