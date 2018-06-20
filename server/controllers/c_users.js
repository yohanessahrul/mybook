const User = require('../models/m_users');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

module.exports = {
  allUsers: (req, res) => {
    User.find()
      .then(response => {
        res.status(200).json({
          info: 'Get all data users success!',
          data: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  findUser: (req, res) => {
    User.findById({_id: req.params.id})
      .populate('statuses')
      .then(response => {
        res.status(200).json({
          info: 'Dapat respon',
          data: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  registerUser: (req, res) => {
    User.findOne({email: req.body.email})
      .then(responseUniqueEmail => {
        if (responseUniqueEmail) {
          res.status(409).json({
            info: 'Email sudah terdaftar, daftarkan email lain !'
          })
        } else {
          User.findOne({username: req.body.username})
            .then(responseUniqueUsername => {
              if (responseUniqueUsername) {
                res.status(409).json({
                  info: 'Username harus unik, pikirkan username lain !'
                })
              } else {
                let hash = bcrypt.hashSync(req.body.password, salt);
                let newUser = new User({
                  username: req.body.username,
                  password: hash,
                  email: req.body.email,
                  fullname: req.body.fullname
                })
                newUser.save()
                  .then(responseSave => {
                    res.status(201).json({
                      info: 'Anda berhasil registrasi :)',
                      data: responseSave
                    })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  loginUser: (req, res) => {
    User.findOne({email: req.body.email})
      .then(response => {
        if (!response) {
          res.status(404).json({
            info: 'Email anda tidak terdaftar !'
          })
        } else {
          if (bcrypt.compareSync(req.body.password, response.password)) {
            let createToken = jwt.sign({
              id: response._id,
              email: response.email
            }, 'yosaru');
            let payload = {
              data: response,
              token: createToken
            }
            res.status(200).json({
              info: 'Anda berhasil login',
              data: payload
            })
          } else {
            res.status(404).json({
              info: 'Password anda salah !'
            })
          }
        }
      })
      .catch()
  },
  deleteUser: (req, res) => {
    User.findByIdAndRemove({_id: req.params.id})
      .then(response => {
        res.status(200).json({
          info: `Data dengan ID ${req.params.id} berhasil dihapus !`
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}