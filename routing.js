const http= require('http')

const port= 4000
const hostname= '127.0.0.1'

const server= http.createServer((req,res)=>{
    if(req.url==='/')
        {
            res.writeHead(200, {'Content-Type':'text/plain'})
            res.end('home page')
        }
        else if(req.url==='/about')
            {
                res.writeHead(200, {'Content-Type':'text/plain'})
                res.end('About Page')
            }
            else{
                res.writeHead(400,{'Content-Type':'text/plain'})
                res.end('Page Not Found')
            }
});

server.listen(port, hostname, ()=>{
    console.log(`server is running on http://${hostname}:${port}`);
})