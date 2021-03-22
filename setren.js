const db = require('./setren.json')
const fs = require('fs-extra')
const path = require('path')
const createError = require('http-errors');


module.exports = function (setren) {
  setren.get('/:data', (req, res) => {
    const endpoint = req.params.data
    const data = db.data[endpoint]
    res.send(data);
  });
  setren.post('/:data', (req, res) => {
    const endpoint = req.params.data
    const data = db.data[endpoint]
    const index = data.findIndex(v => v.id == req.body.id)
    if (index < 0) {
      data.push(req.body)
      fs.writeJson(path.join(__dirname, './setren.json'), db)
      res.json("successful")
    } else {
      const err = createError(406, "Data ditolak!")
      res.status(err.status).json(err.message)
    }
  });
  setren.delete('/:data/:id', (req, res) => {
    const endpoint = req.params.data
    const data = db.data[endpoint]
    const index = data.findIndex(v => v.id == req.params.id)
    console.log(index)
    if (index > -1) {
      data.splice(index, 1)
      fs.writeJson(path.join(__dirname, './setren.json'), db)
      res.json("successful")
    } else {
      const err = createError(410, "Data tidak ditemukan!")
      res.status(err.status).json(err.message)
    }
  });
  setren.put('/:data/:id', (req, res) => {
    const endpoint = req.params.data
    const data = db.data[endpoint]
    const index = data.findIndex(v => v.id == req.params.id)
    console.log(index)
    if (index > -1) {
      data.splice(index, 1)
      data.push(req.body)
      fs.writeJson(path.join(__dirname, './setren.json'), db)
      res.json("successful")
    } else {
      const err = createError(410, "Data tidak ditemukan!")
      res.status(err.status).json(err.message)
    }
  });
}