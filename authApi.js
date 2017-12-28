const express = require('express');
const rp = require('request-promise');

module.exports = express.Router()
  .post('/facebook', (req, res) => {
    const options = {
      method: 'POST',
      uri: 'http://localhost:3300/auth/facebook',
      body: {
          access_token: req.body.accessToken
      },
      json: true // Automatically stringifies the body to JSON
    };
    return rp(options)
      .then((resp) => {
        res.cookie('token', resp.token, {
          maxAge: 86400 * 1000, // 24 hours
          httpOnly: true, // http only, prevents JavaScript cookie access
          secure: false // cookie must be sent over https / ssl
        });
        // return res.status(303).redirect('/')
        return res.json(resp)
      })
      .catch((err) => {
        console.log('err: ',err);
        return res.json({ err })
      })
  })
  .post('/local', (req, res) => {
    const options = {
      method: 'POST',
      uri: 'http://localhost:3300/auth/local',
      body: {
          email: req.body.email,
          password: req.body.password
      },
      json: true // Automatically stringifies the body to JSON
    };
    return rp(options)
      .then((resp) => {
        res.cookie('token', resp.token, {
          maxAge: 86400 * 1000, // 24 hours
          httpOnly: true, // http only, prevents JavaScript cookie access
          secure: false // cookie must be sent over https / ssl
        });
        // return res.status(303).redirect('/')
        return res.json(resp)
      })
      .catch((err) => {
        console.log('err: ',err);
        return res.json({ err })
      })
  })
  .post('/logout', (req, res) => {
    // delete req.session.user;
    return res.json({});
  })
  .post('/me', (req, res) => {
    console.log('request to /me');
    return res.json({ user: req.session.user })
  })
  .patch('/', (req, res) => {
    Object.assign(req.session.user, req.body);
    res.json({});
  });
