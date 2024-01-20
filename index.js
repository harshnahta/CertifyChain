'use strict';
const express = require('express');
require('dotenv').config();
const bodyparser = require('body-parser');
const app = express();
const next = require('next');

const certificateMethods = require('./certificates');
const { generateUniqueId } = require('./uniqueId');
const certificate = certificateMethods();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET , POST , PUT , PATCH , DELETE,OPTIONS,OPTION'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Max-Age,Accept-Encoding,Content-Type, X-Requested-With , Accept , Origin,authorization,tokens'
  );
  res.setHeader('Access-Control-Expose-Headers', 'authorization,tokens');
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Api to create certificate
app.post('/create', (req, res) => {
  try {
    const uniqueId = generateUniqueId();
    certificate.insert(uniqueId, req.body);
    res.status(201).send({ message: 'Inserted Succesfully', id: uniqueId });
  } catch (e) {
    res.status(500).send(e);
  }
});

// api to get data of certificate
app.get('/get-certificate/:id', (req, res) => {
  try {
    const data = certificate.get(req.params.id);
    if (Object.keys(data).length) {
      res.status(200).send({ data });
    } else {
      res.status(404).send({ message: 'Invalid certificate ID' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

const port = process.env.PORT || 3000;
const appNext = next({ port });
const handle = appNext.getRequestHandler();

// Use to run next build and node api server together combined, to run project easily
appNext.prepare().then(() => {
  const server = express();

  // Use your API server middleware before Next.js handler
  server.use('/api', app);

  // Use Next.js handler for everything else
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
