const {Client} = require('pg')
const {argv} = require('node:process')
const {body,validationResult} = require("express-validator")
require('dotenv').config()
const alphaNumericErr = "must only contain letters and/or numbers."
const userLengthErr = "must be between 1 and 10 characters."
const textLengthErr = "must be between 1 and 100 characters."
const validateUser = [
  body("name").trim()
    .isAlphanumeric().withMessage(`user ${alphaNumericErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`user ${userLengthErr}`),
  body("text").trim()
    .isAlphanumeric().withMessage(`text ${alphaNumericErr}`)
    .isLength({ min: 1, max: 100 }).withMessage(`text ${textLengthErr}`)
]

exports.postMessage = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "new message",
        user: user,
        errors: errors.array(),
      })
    }
    const client = new Client({
      //connectionString: process.env.DATABASE_URL,
      connectionString:argv[2],//node app.js <connection_string>
    })
    await client.connect()
    await client.query("INSERT INTO messages (text, name,added) VALUES ($1, $2,$3)", [
      req.body.text,
      req.body.name,
      new Date().toISOString()
    ])
    await client.end()
    res.redirect("/")
  }
]
exports.getMessages=async (req, res)=> {
  const client = new Client({
    //connectionString: process.env.DATABASE_URL,
    connectionString:argv[2],//node app.js <connection_string>
  })
  await client.connect()
  const result = await client.query("SELECT * FROM messages ORDER BY added DESC")
  await client.end()
  res.render("index", { messages: result.rows })
}