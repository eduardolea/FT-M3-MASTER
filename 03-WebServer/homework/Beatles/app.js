var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer(function(req, res){
  if(req.url === '/api'){
    res.writeHead(200 , {'Content-Type':'application/json'})
    return res.end(JSON.stringify(beatles))
  }
  if(req.url.slice(0,5) ==='/api/' ){
    let beatle = req.url.split('/').pop();
    let singer = beatles.find( s => encodeURI(s.name) === beatle)
    if(singer){
      res.writeHead(200, {'Content-type' : 'application/json'})
      return res.end(JSON.stringify(singer));
    }
      res.writeHead(404, {'Content-type' : 'text/plain'})
      return  res.end(`${decodeURI(beatle)} no es un mienbro de la banda!`);
  }
  if(req.url === '/'){
    fs.readFile('./index.html', function(err,data){
      if(err){
        res.writeHead(404, {'Content-type' : 'text/plain'})
        return  res.end(`Ruta no existente`);
      }
        res.writeHead(200, {'Content-type' : 'text/html'})
        return res.end(data);
    })
  }
  if(req.url.length > 1){
    let beatle = req.url.split('/').pop();
    let singer = beatles.find( s => encodeURI(s.name) === beatle);
    if(singer){
      fs.readFile('./beatle.html', 'utf8', function(err, data){
        if(err){
          res.writeHead(404, {'Content-type' : 'text/plain'})
          return  res.end(`Ruta no existente`);
        }else{
          data = data.replace('{name}', singer.name);
          data = data.replace('{birthdate}', singer.birthdate);
          data = data.replace('{profilePic}', singer.profilePic);
          res.writeHead(200, {'Content-type' : 'text/html'})
          return res.end(data);
        }
      })
    }else{
      res.writeHead(404, {'Content-type' : 'text/plain'})
      return  res.end(`Ruta no existente`);
    }
  }
}).listen(3000, '127.0.0.1');