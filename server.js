const http = require('http');
const fs = require('fs');
const path = require('path');
let mes = '';

http 
    .createServer(function (req, res) {
    if (req.url==='/') {
        //readFile = Asynchronously reads the entire contents of a file.
        fs.readFile('index.html', function (err, data) {
            if (err) {
                res.end(err)
            } else {
                //writeHead = property is an inbuilt property of the ‘http’ module which sends a response header to the request
                res.writeHead(200, {"content-Type":"text/html"})
                //write = is used to specify the position in a file to begin writing at a buffer to write, as well as which part of the buffer to write out to the file
                res.write(data)
                return res.end();
            }
        })
    }
    if (req.url==='/create-directory') {
        let body = "";
        req.on("data", function (data) {
            body += data.toString();
        });
        req.on("end", function () {
            fs.mkdir('/Users/ruthmoyano/Documents/code-immersives/Term-2/week-2/node-fs-hw'), function (err) {
                if (err) {
                    res.end(err)
                } else {
                    res.end('content created')
                }
            }
        })
    }
    })
    if (req.url==='/create-text' && req.method==="POST"){
        let body = ""
        req.on("data", function (data) {
            body += data.toString();
        });
        req.on("end", function () {
            fs.writeFile('randomText.txt','random text file is created 1', function(err){
                if(err){
                    res.end(err)
                } else {
                    res.end(`randomText.txt is created ${mes}`)
                }
            })
        })
    }
    if (req.url==='/new-folder-and-file' && req.method === "POST"){
        fs.readFile('randomText.txt', function(err, data){
            if(err){
                res.end(err)
            } else {
                res.writeHead(200, {"content-Type":"text/html"})
                mes = data
                fs.writeFile('some-folder/verbage.txt',mes, function(err){
                    if(err){
                        res.end(err)
                    } else{
                        res.end(`verbage.txt is created ${mes}`)
                    }
                })
            }
        })
        setTimeout(function(){
            fs.unlinkSync('some-folder/verbage.txt')
            fs.rmdir('/Users/ruthmoyano/Documents/code-immersives/Term-2/Week-2/node-fs-hw', {recursive:true}, function(err){
                if(err){
                    return err
                } else{
                    console.log('directory successfully removed')
                }
            })
        }, 7000)
    }
})
.listen(3000, function(){
    console.log('Server started')
})