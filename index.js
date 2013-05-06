
var bouncy = require( 'bouncy')

bouncy(function ( req, bounce ) {
    if( req.headers.host === 'www.mnmt.no' || req.headers.host === 'mnmt.no' ) {
        bounce( 8000 )
    }
    else if( req.headers.host === 'develop.mnmt.no' ) {
        bounce( 8001 )
    }
}).listen( process.env.PORT )
