var path=require('path');
var express = require('express');
var path = require("path");
//form表单需要的中间件。
var mutipart= require('connect-multiparty');
var fs = require('fs');

var mutipartMiddeware = mutipart();
var app = express();
app.use(mutipart({uploadDir:'./tmpfile'}));

app.use("/staticfile",express.static(path.join(__dirname, '/staticfile')));

app.set('port',process.env.PORT || 3000);
debugger;
app.listen(app.get('port'),function () {
    console.log("http://localhost:" + app.get('port'));
});

app.get('/',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/index.html')
});

app.get('/filereader',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/filereader.html')
});

app.get('/uploadImg',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/uploadImg.html')
});

app.get('/iframe',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/iframe.html')
});
app.get('/ajax',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/ajax.html')
});

app.get('/iframe1',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/iframe1.html')
});

app.get('/formData',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/formData.html');
});
app.get('/change',function (req,res) {
    res.type('text/html');
    res.sendfile('reader/change.html');
});


app.post('/upload',mutipartMiddeware,function (req, res) {
    /*
     * 成功接受到浏览器传来的文件。可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径...
     */
    res.send('上传成功了~~~');
});

app.post('/fileupload',function (req, res) {
    // var form = new formidable.IncomingForm();
    // //设置文件上传存放地址
    // form.uploadDir = "./uploads";
    // //执行里面的回调函数的时候，表单已经全部接收完毕了。
    // form.parse(req, function(err, fields, files) {
    //     //使用第三方模块silly-datetime
    //     var t = sd.format(new Date(),'YYYYMMDDHHmmss');
    //     //生成随机数
    //     var ran = parseInt(Math.random() * 8999 +10000);
    //     //拿到扩展名
    //     var extname = path.extname(files.tupian.name);
    //     //旧的路径
    //     var oldpath = __dirname + "/" + files.tupian.path;
    //     //新的路径
    //     var newpath = __dirname + '/uploads/'+t+ran+extname;
    //     //改名
    //     fs.rename(oldpath,newpath,function (err) {
    //         if(err){
    //             throw  Error("改名失败");
    //         }
    //         res.writeHead(200, {'content-type': 'text/plain'});
    //         res.end("成功");
    //     });
    //     //所有的文本域、单选框，都在fields存放；
    //     //所有的文件域，files
    //     res.writeHead(200, {'content-type': 'text/plain'});

    //     res.end("success");
    // });
});


app.post('/fileuploadChange', function (req, res) {
    var txtFromFront = req.body.name_txt;
    var oriPathOfFile = req.files.name_file.path;
    var oriNameOfFile = req.files.name_file.originalFilename || path.basename(req.files.name_file.ws.path);

    console.log(req.files.name_file);
    console.log('------------------------------------');
    console.log(1);
    console.log('------------------------------------');
    console.log(oriPathOfFile);
    console.log('------------------------------------');
    console.log(oriNameOfFile);
    var targetPathOfFile = './tmpfile/' + oriNameOfFile;
    fs.readFile(oriPathOfFile,function (err, data) {
        fs.writeFile(targetPathOfFile,data,function (err) {
            if(err){
                console.log('文件在存储中出错：' + err);
                res.send({result:"fail",reason:"保存文件失败"});
            }else {
                console.log('success----');
                res.send({result:"success"});
            }
        });
    });
});