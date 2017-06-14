"use strict";

let fs = require('fs');
let Mock = require('mockjs');
let express = require('express');
let app = express();
let port = 8081;

//process.env.NODE_ENV

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use("/", express.static(__dirname + "/dist/"));


app.get('/user/welcome', function(req, res){
	res.send({code: '0000',message:'ok',data:'Welcome to Your Vue.js App'});
});

app.get('/user/menu', function(req, res){
	res.send({
		code: '0000',
	});
});

/*readdir读取目录下所有文件*/
fs.readdir('./testData', function(err, files) {
    if(err) {
        console.log(err);
    } else {
        /*成功读取文件，取得文件名，拼接生成对应action，监听对应接口并返回对应文件数据*/
        files.forEach(function(v, i) {
            app.all(`/${v.replace(/json/, 'api')}`, function(req, res) {
                fs.readFile(`./testData/${v}`, 'utf-8', function(err, data) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.json(Mock.mock(JSON.parse(data)));
                    }
                })
            })
        })
    }
})



app.listen(port);
console.log("server start at " + port);
