const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send({title : "test title" , description : "test description"});
})



module.exports = router;