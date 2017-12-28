var http=require("http");
var parse=require("url").parse;
var join=require("path").join;
var fs=require("fs");
var root=__dirname;
var formidable=require("formidable");

const server=http.createServer(function (req,res) {
    var url = parse(req.url);
    var path =(url.pathname==="/"?join(root,"index.html"): join(root, url.pathname));
    var stream = fs.createReadStream(path);
    stream.pipe(res);
    stream.on("error",function (err) {
        res.statusCode=500;
        res.end("internal server error")
    });
    switch(req.method){
        case "POST":
            upload(req,res);
            break;
    }

}).listen(8888);

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
        console.log(fields);
        console.log(files);
        console.log("http://localhost:8888/upload/"+files.file.name)
        // res.end("http://localhost:8888/upload/"+file.name)
    });
}
function isFormData(req) {
    var type=req.headers['content-type'] || '';
    return 0===type.indexOf('multipart/form-data');
}
