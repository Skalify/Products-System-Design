const app = require('./index.js');

app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}`);
});