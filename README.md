# node-upload
适用于做前后端分离时，前端调试上传接口

uploadDemo 文件夹存放前端ajax上传的内容，
本地运行app.js,其中通过http-proxy-middleware进行模拟转发后地址为http://localhost:8000

formidableUpload 文件夹存放ajax上传内容后，server端获取的内容并返回地址 
本地运行app.js后地址为 http://localhost:8888
