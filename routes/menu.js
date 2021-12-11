var express = require('express');
var router = express.Router();
const models = require("../models");

router.get('/', function(req, res){
    models.Menu.findAll({
        order: [['id']]
        }).then(res1 => {
            res.json(res1);
        }).catch(err=>{
            console.log(err);
    })
});

router.post('/modify', function(req, res){

    console.log(req.body.dislike_check.toString());
    models.Test.update({
        likeFood: "["+req.body.like_check.toString()+"]",
        dislikeFood: "["+req.body.dislike_check.toString()+"]"
    },{
        where:{
            nickname:req.body.name
        }
    }).then(res1=>{
            console.log(res1);
            res.status(200).send();
        }).catch(e=>{console.log(e)});
})

router.get('/userinfo', function(req, res){
    models.Test.findOne({
        where: {
            nickname: req.query.name
        }
    }).then(res1 => {
        if(res1){
            let likeFood_id = JSON.parse(res1.likeFood);
            let dislikeFood_id = JSON.parse(res1.dislikeFood);
            let likeFood = [];
            let dislikeFood = [];
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
