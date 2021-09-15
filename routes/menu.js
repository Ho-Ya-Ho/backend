var express = require('express');
var router = express.Router();
const models = require("../models");

router.get('/', function(req, res){
    models.Menu.findAll().then(res1 => {
        res.json(res1);
    }).catch(err=>{
        console.log(err);
    })

});

router.get('/userinfo', async function(req, res){
    await models.Test.findOne({
        where: {
            nickname: req.query.name
        }
    }).then(res1 => {
        if(res1){
            let likeFood_id = JSON.parse(res1.likeFood);
            let dislikeFood_id = JSON.parse(res1.dislikeFood);
            let likeFood = []
            let dislikeFood = []
            models.Menu.findAll({
                where: {
                    id: likeFood_id
                }
            }).then(res2 => {
                likeFood = res2;
                models.Menu.findAll({
                    where: {
                        id: dislikeFood_id
                    }
                }).then(res3 => {
                    dislikeFood = res3;
                    res.json({
                        like: likeFood,
                        dislike: dislikeFood
                    })
                })
            })
        }
        else {
            console.log("그런 유저는 없습니다..");
        }
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;