exports.signup = (req, res, next) => {
  console.log(req.body)
  res.send({ success: true })
}