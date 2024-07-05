const http = require('http');
const fs = require('fs');
var mysql = require('mysql');
var formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'itarticles',
  multipleStatements: true
});

const server = http.createServer((request, response) => {

  let url = request.url;

  if (url === '/') {
    mysqlConnection.query('SELECT * FROM articles', (err, rows, fields) => {
      if (!err) {
        let res = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Main page</title>
          </head>
          <body style=" background-color: yellow;">
            <div>
              <div>
                <h1>Welcome to the IT articles site!!<h1>
                <h2>Choose an article<h2> 
              </div>
              <ul>
        `
        for (var i = 0; i < rows.length; i++) {
          res += "<li><a href='/show/"
            + rows[i].id
            + "'>"
            + rows[i].title
            + "</a></li>"
        }
        res += `
            </ul>
            <button>
              <a href='/add' style='text-decoration:none; color:black;'>add article</a>
            </button>
          </div>
        </body>
        </html>
        `
        fs.writeFile('pages/index.html', res, function (error) {
          if (error) {
            response.writeHead(404);
            response.write('Whoops! Page not found!');
          }
        })
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        fs.readFile('pages/index.html', null, function (error, data) {
          if (error) {
            response.writeHead(404);
            response.write('Whoops! Page not found!');
          } else {
            response.write(data);
          }
          response.end();
        })
      }
      else {
        console.log(err);
      }
    })
  }
  else if (url === '/add') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('pages/add_article.html', null, function (error, data) {
      if (error) {
        response.writeHead(404);
        response.write('Whoops! Page not found!');
      } else {
        response.write(data);
      }
      response.end();
    });
  } else if (url === '/add_handler') {
    let form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      let query = "INSERT INTO articles (title,authers, abstract, link) VALUES (?, ?, ?, ?);";
      let values_to_insert = [
        fields.title,
        fields.authers,
        fields.abstract,
        fields.link
      ]
      let c = fields.authentication
      mysqlConnection.query("SELECT count(*) as co FROM authentication where auth_id ='" +c+"'",(err, rows1) => {
      if (rows1[0].co ==1 ) {
        mysqlConnection.query(query, values_to_insert, (err, rows) => {
          if (err) throw err;
        });
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
      }
      else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(`
        <div style="color: red;">Wrong Authentication Code!</div>
        <div><a href="/">Return home</a></div>
        `);
      }
    })
  })
  }
  else if (url.startsWith("/show/")) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    mysqlConnection.query('select * from articles where id=' + article_id, (err, rows, fields) => {
      if (!err) {
        let res = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>show</title>
          </head>
          <body style=" background-color: yellow;">
            <div>
              <h1>article details</h1>
            </div>
            <div><a href ="/" >Return Home</a>
            </div>
            <ul>
        `
        for (var i = 0; i < rows.length; i++) {
          res += "<li>Title: "
            + rows[i].title
            + "</li><li>Authers: "
            + rows[i].authers
            + "</li><li>Abstract: "
            + rows[i].abstract
            + "</li><li>Download the article: <a href='"+ rows[i].link+"'>"
            + rows[i].link
            + "</a></li>"
        }
        res += `
        </ul>
        <div><button><a href='/delete/`+ article_id + `' style='text-decoration:none; color:black;'>delete</a></button></div>
        <div><button><a href='/update/`+ article_id + `' style='text-decoration:none; color:black;'>update</a></button></div>
        </body>
        </html>
        `
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(res)
      } else {
        console.log(err);
      }
    })
  }
  else if (url.startsWith("/delete/")) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    let res = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>delete</title>
    </head>
    <body style=" background-color: yellow;">
        <div>
            <h1>Enter Authentication Code</h1>
        </div>
        <form action='/check/`+ article_id + `' method='post'>
            <div><input type='password' id='auth' name='auth' /></div>
            <div><input type='submit' value='check' /></div>
    </body>
    </html>
    `
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(res)
  }
  else if (url.startsWith("/check/")) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    let form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
      let c = fields.auth
      mysqlConnection.query("SELECT count(*) as co FROM authentication where auth_id ='" +c+"'",(err, rows1) => {
        if (rows1[0].co ==1 ) {
        mysqlConnection.query('DELETE FROM articles WHERE id=' + article_id, (err, rows) => {
          if (err) throw err;
        });
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
      }
      else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(`
  <div style="color: red;">Wrong Authentication Code!</div>
  <div><a href="/">Return home</a></div>
  `);
      }
    })
  })
  }
  else if (url.startsWith("/update/")) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    let res = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>update</title>
    </head>
    <body style=" background-color: yellow;">
        <div>
            <h1>Enter Authentication Code</h1>
        </div>
        <form action='/checkupdate/`+ article_id + `' method='post'>
            <div><input type='password' id='auth' name='auth' /></div>
            <div><input type='submit' value='check' /></div>
    </body>
    </html>
    `
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(res)
  }
  else if (url.startsWith("/checkupdate/")) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    let form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
      let c = fields.auth
      mysqlConnection.query("SELECT count(*) as co FROM authentication where auth_id ='" +c+"'",(err, rows1) => {
        if (rows1[0].co ==1 ) {
        mysqlConnection.query('select * FROM articles WHERE id=' + article_id, (err, rows) => {
          if (!err) {
            let res = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>update</title>
          </head>
          <body style=" background-color: yellow;">
            <div>
              <h1>article details</h1>
            </div>
            <div><a href ="/" >Return Home</a>
            </div>
            <form action='/up/`+ article_id + `' method="post">
        `
            for (var i = 0; i < rows.length; i++) {
              res += `
          <div><br><label for='title'>Title:<pre style="display: inline;">      </pre></label><textarea id='title' name='title'  required/>`+ rows[i].title
                + `</textarea></div>
          <div><br><label for='authers'>Authers:<pre style="display: inline;">   </pre></label><textarea id='authers' name='authers' required>`+ rows[i].authers
                + `</textarea></div>
          <div><br><label for='abstract'>Abstract:<pre style="display: inline;">   </pre></label><textarea id='abstract' name='abstract' required>`+ rows[i].abstract
                + ` </textarea></div>
          <div><br><label for='link'>Link:<pre style="display: inline;">      </pre></label><input type='text' id='link' name='link' size="19" value=`+ rows[i].link + `/></div>
          <div><br><input type='submit' value='update' /></div>
          `
            }
            res += "</body></html>"
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(res)
          }
          else
            throw err;
        });
      }
      else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(`
  <div style="color: red;">Wrong Authentication Code!</div>
  <div><a href="/">Return home</a></div>
  `);
      }
    })
  })
  }
  else if (url.startsWith("/up/")) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    let form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
      mysqlConnection.query("update articles set title='" + fields.title + "' , authers='" + fields.authers + "' , abstract='" + fields.abstract + "' , link='" + fields.link + "' WHERE id=" + article_id, (err, rows) => {
        if (err) throw err;
      });
      response.statusCode = 302; 
      response.setHeader('Location', '/');
      response.end();
    });
  }
  else { 
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.end(`
    <div style="color: red;">Whoops! Page not found!</div>
    <div><a href="/">Return home</a></div>
    `);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
