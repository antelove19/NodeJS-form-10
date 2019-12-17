const hostname  = 'localhost';
const port      = 8080;

const http  = require('http');
const fs    = require('fs');

const server = http.createServer( function ( req, res ) {

    if ( req.url == '/' )
    {

        fs.readFile( 'form.html', 'utf8', function ( err, data ) {

            res.writeHead( 200, { 'Content-Type': 'text/html' } );

            res.write( data );

            res.end();

        } );

    }

    else if ( req.url == '/process')
    {

        let body = '';

        req.on( "data" , function ( data ) {
            body += data;
        } );

        req.on( "end" , function () {

            res.write( "Data was sent: " + body ); // string

            res.end();

            console.log( body );

        } );

    }

    else
    {

        res.writeHead( 404, { 'Content-Type': 'text/html' } );

        res.write( '<h1>Page not found</h1>' );

    }

} );

/* port, hostname, callback */
server.listen( port, hostname, function () {
    console.log( `Server running at http://${hostname}:${port}/` );
} );
