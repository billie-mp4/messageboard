const controller = require('./controller')
const {Router} = require('express')

const router = Router()

router.get('/new',(req,res)=>res.render('form'))
router.post('/new', controller.postMessage)
router.get('/', controller.getMessages)
module.exports = router