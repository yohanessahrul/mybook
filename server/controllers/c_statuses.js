const Status = require('../models/m_statuses');
const User = require('../models/m_users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {
  statusById: (req, res) => {
    Status.findById({_id: req.params.id})
      .populate('userId')
      .populate('commentId')
      .then(response => {
        res.status(200).json({
          info: 'Get status by ID succes !!',
          data: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  statusList: (req, res) => {
    Status.find()
      .populate('userId')
      .populate('commentId')
      .then(response => {
        res.status(200).json({
          info: 'Get all status success !!',
          data: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  allStatusByUserId: (req, res) => {
    Status.find({userId: req.params.id})
      .then(response => {
        res.status(200).json({
          info: `Status berdasarkan ID ${req.params.id} berhasil ditemukan`,
          data: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  createStatus: (req, res) => {
    let decoded = jwt.verify(req.headers.token, 'yosaru');
    // console.log('ID => ', decoded.id)
    
    // add to statuses DB
    let newStatus = new Status({
      status: req.body.status,
      userId: new mongoose.Types.ObjectId(decoded.id)
    })
    newStatus.save()
      .then(response => {
        // add to user DB
        User.findByIdAndUpdate({_id: decoded.id}, {
          $push: { statuses: response._id }
        })
          .then(responsePush => {
            res.status(201).json({
              info: 'Create status success !!',
              data: response
            })
          })
          .catch(err => {
            console.log(err)
          })
        
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteStatusByUserId: (req, res) => {
    let decoded = jwt.verify(req.headers.token, 'yosaru');

    // hapus di table status
    Status.findById({_id: req.params.id})
      .then(response => {
        if (!response) {
          res.status(404).json({
            info: 'Data yang anda maksud tidak ada dalam database !'
          })
        }
        if (decoded.id == response.userId) {
          Status.remove({_id: req.params.id})
            .then(responseRemove => {

              // hapus di table user(field statuses: [array])
              User.findOne({_id: decoded.id})
                .then(responseFindUser => {

                  // buang id status yang sudah terhapus
                  let newStatusesArray = []
                  for (let i = 0; i < responseFindUser.statuses.length; i++) {
                    if (responseFindUser.statuses[i] != req.params.id) {
                      newStatusesArray.push(responseFindUser.statuses[i])
                    }
                  }

                  // update nilai dari statuses di User
                  User.update({_id: decoded.id}, {
                    $set: { statuses: newStatusesArray }
                  })
                    .then(responseUserUpdate => {
                      res.status(200).json({
                        info: 'Data di User berhasil dihapus',
                        data: responseUserUpdate
                      })
                    })
                    .catch(err => {
                      console.log(err)
                    })
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          res.status(401).json({
            info: 'Ini bukan status anda, tidak dapat akses untuk menghapus!!'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}