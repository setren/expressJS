const createError = require('http-errors');
const fs = require('fs-extra')
const path = require('path')

const { checkAuth } = require('../helpers/index')
const comments = require('../db/comments.json')

module.exports = function (app) {
  app.get('/comments', checkAuth, (req, res) => {
    res.send(comments);
  });

  app.post('/comments', checkAuth, (req, res) => {
    console.log(req.body)
    comments.push(req.body)
    fs.writeJson(path.join(__dirname, '../db/comments.json'), comments)
    res.json(comments)
  });
  app.put('/comments/:id', checkAuth, (req, res) => {
    const index = comments.findIndex(v => v.id == req.params.id)
    if (index > -1) {
      comments.splice(index, 1)
      comments.push(req.body)
      fs.writeJson(path.join(__dirname, '../db/comments.json'), comments)
      res.json("successful")
    } else {
      const err = createError(410, "Data tidak ditemukan!")
      res.status(err.status).json(err.message)
    }
  });
  app.delete('/comments/:id', checkAuth, (req, res) => {
    const index = comments.findIndex(v => v.id == req.params.id)
    if (index > -1) {
      comments.splice(index, 1)
      fs.writeJson(path.join(__dirname, '../db/comments.json'), comments)
      res.json("successful")
    } else {
      const err = createError(410, "Data tidak ditemukan!")
      res.status(err.status).json(err.message)
    }
  });
}
