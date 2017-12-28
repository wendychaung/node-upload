var http=require("http");
var fs=require("fs");
var parse=require("url").parse;
var join=require("path").join;
var root=__dirname;
var formidable=require("formidable");
var imgs="";
var express=require("express");
var app = express();

app.use("/upload",express.static(join(root, '/upload')));
app.post('/upload', function(req, res) {
    upload(req,res);
})
    app.listen(8888);
function upload(req,res) {
    if(!isFormData(req)){
        res.statusCode=400;
        res.end("bad request:expecting multipart/form-data");
        return;
    }
    var form=new formidable.IncomingForm();
    form.uploadDir='temp';
    form.on("field",function (field,value) {
        console.log(field);
        console.log(value);
    });
    form.on("file",function (name,file) {
        console.log(name);
        console.log(file);
        var currentFile=root+'/upload/'+file.name;
        fs.rename(file.path,currentFile,function (err) {
            if(err){
                console.log(err)
            }
        })
    });
    form.on("progress",function (bytesReceived,bytesExpected) {
        var percent=Math.floor(bytesReceived/bytesExpected *100);
        console.log(percent);
    });
    form.parse(req,function (err,fields,files) {
        imgs="http://localhost:8888/upload/"+files.file.name;
        var data={
            "data":{
                "img":imgs
            }
        };
        res.json(data);
    });
}
function isFormData(req) {
    var type=req.headers['content-type'] || '';
    return 0===type.indexOf('multipart/form-data');
}