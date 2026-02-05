import express from 'express';
const app = express();

app.use((req, res, next) => {
  console.log(`[GLOBAL] ${req.method} request to ${req.url}`);
  next();
});

const skipableLogger = (req, res, next) => {
  if (req.headers['x-skip-log'] === 'true') {
    console.log('Condition Met: Skipping detailed log');
    return next();
  }
  console.log('Detailed Log: Processing request internals...');
  next();
};

const betaFeature = (req, res, next) => {
  if (req.query.beta !== 'true') {
    return next();
  }
  req.isBetaUser = true;
  console.log('Beta features enabled for this request.');
  next();
};

const verifyApiKey = (req, res, next) => {
  if (req.query.key === 'SECRET123') return next();
  res.status(401).send('Invalid API Key');
};

const checkPermissions = (req, res, next) => {
  if (req.headers['x-admin'] === 'true') return next();
  res.status(403).send('Admin access required');
};

app.get('/profile', skipableLogger, betaFeature, (req, res) => {
  res.json({
    message: 'Profile Data',
    betaAccess: req.isBetaUser || false,
  });
});

app.get('/admin/stats', verifyApiKey, checkPermissions, (req, res) => {
  res.send('Admin Statistics');
});

app.listen(3000, () => console.log('Server running on port 3000'));
