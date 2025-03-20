const {Router}=require('express')
const router=Router()
const messages=[
    {
        text:'hi',
        user:'billie',
        added:new Date()
    },
    {
        text:'bye',
        user:'tom',
        added:new Date()
    }
]
router.get('/new',(req,res)=>res.render('form'))
router.post('/new',(req,res)=>{
    messages.push({text:req.body.text,user:req.body.user,added:new Date()})
    res.redirect('/')
})
router.get('/',(req,res)=>res.render('index',{title:'messageboard',messages:messages}))
module.exports=router