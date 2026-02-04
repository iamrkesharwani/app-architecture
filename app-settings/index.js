import express from 'express';
const app = express();

app.set('title', 'My App');
app.set('version', '1.0.0');

app.locals.siteName = 'Dev Portal';
app.locals.adminEmail = 'admin@email.com';

const currentEnv = app.get('env');
console.log(`Current Environment: ${currentEnv}`);

app.use((req, res, next) => {
  res.locals.requestTime = new Date().toLocaleTimeString();
  res.locals.user = { id: 101, role: 'moderator' };
  next();
});

app.get('/info', (req, res) => {
  const title = app.get('title');
  res.json({
    appTitle: title,
    siteName: app.locals.siteName,
    userRole: res.locals.user.role,
    timestamp: res.locals.requestTime,
    environment: currentEnv,
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
