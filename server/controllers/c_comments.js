const Comment = require('../models/m_comments');
const Status = require('../models/m_statuses');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {
  createComment: (req, res) => {
    let decoded = jwt.verify(req.headers.token, 'yosaru');
    console.log('ID => ', decoded.id)
    
    // 1. masukkan ke table comment
    let newComment = new Comment({
      comment: req.body.comment,
      statusId: new mongoose.Types.ObjectId(req.params.id),
      userId: new mongoose.Types.ObjectId(decoded.id)
    })
    newComment.save()
      .then(responseSave => {
        
        // 2. masukkan ke array commentID di table status
        Status.findByIdAndUpdate({_id: req.params.id}, {
          $push: { commentId: responseSave._id }
        })
          .then(responsePushToStatus => {
            res.status(201).json({
              info: 'Anda berhasil memasukkan data ke table Comment dan push ke table Status sebagai array ID',
              data: responseSave
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
  readAllUsersComments: (req, res) => {
    Comment.find()
      .populate('statusId')
      .populate('userId')
      .then(response => {
        res.status(200).json({
        info: 'Get all data comments success !',
        data: response
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteCommentById: (req, res) => {
    let decoded = jwt.verify(req.headers.token, 'yosaru');

    // 1. hapus komen dari table comment
    Comment.findById({_id: req.params.id})
      .then(response => {
        if (!response) {
          res.status(404).json({
            info: 'Data yang anda maksud tidak ada didalam database'
          })
        }
        if (decoded.id == response.userId) {
          Comment.remove({_id: req.params.id})
            .then(responseRemove => {

              // 2. hapus di array commentId pada table status
              Status.findById({_id: response.statusId})
                .then(responseFindStatus => {

                  if (!responseFindStatus) {
                    res.status(404).json({
                      info: 'Data yang anda cari tidak ada !'
                    })
                  }

                  let newCommentArray = [];
                  for (let i = 0; i < responseFindStatus.commentId.length; i++) {
                    if (responseFindStatus.commentId[i] != req.params.id) {
                      newCommentArray.push(responseFindStatus.commentId[i])
                    }
                  }

                  Status.update({_id: response.statusId}, {
                    $set: { commentId: newCommentArray }
                  })
                    .then(responseStatusUpdate => {
                      res.status(200).json({
                        info: 'Data di Status berhasil duhapus',
                        data: responseStatusUpdate
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
            info: 'Ini bukan coment anda, tidak dapat akses untuk menghapus!!'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
}