module.exports.authenticator = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warningMsg', 'Please Login.')
  res.redirect('/users/login')
}
