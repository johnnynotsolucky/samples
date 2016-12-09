var express = require('express');
var bodyParser = require('body-parser');

const data = [];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.post('/auth-token', (req, res) => {
  if (req.body && req.body.username === 'user' && req.body.password === 'passwd') {
    res.send({ 'auth-token': 'secret' });
  } else {
    res.status(401).send();
  }
});

const authenticated = (req) => {
  var auth = req.get('Authorization');
  if (auth && auth.match(/^Token secret$/)) {
    return true;
  }
};

app.post('/items', (req, res) => {
  if (authenticated(req) === true) {
    const item = { id: data.length + 1, name: req.body.name };
    console.log(item);
    data.push(item);
    res.send({ id: `/items/${item.id}` });
  } else {
    res.status(401).send();
  }
});

app.param('id', (req, res, next, id) => {
  req.id = id;
  next();
});

app.get('/items/:id', (req, res) => {
  if (authenticated(req) === true) {
    const filtered = data.filter((item) => item.id === parseInt(req.id, 10));
    if (filtered.length === 1) {
      const item = filtered[0];
      console.log(item);
      res.send({
        id: `/items/${item.id}`,
        name: item.name,
      });
    } else {
      res.status(404).send();
    }
  } else {
    res.status(401).send();
  }
});

app.listen(8080);
