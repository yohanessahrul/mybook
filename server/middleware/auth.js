module.exports = {
  cekToken: (req, res, next) => {
    if (!req.headers.token) {
      res.status(400).json({
        info: 'Anda tidak dikenal'
      })
    } else {
      next()
    }
  }
}