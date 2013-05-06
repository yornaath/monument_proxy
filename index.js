
var bouncy  = require( 'bouncy'),
    routes  = require( './routes' ),
    fs      = require( 'fs' ),
    path    = require( 'path' )

var proxy, publicRoot


proxy = bouncy(function ( req, res, bounce ) {
  var forwardPort
  
  forwardPort = routes[ req.headers.host ]

  if( forwardPort > 0 ) {
    bounce( forwardPort )
  }
  else {
    forOfour( req, res )
  }

})


publicRoot = path.join( __dirname, 'public' )


function forOfour( req, res ) {

  res.statusCode = 404

  if( req.url === '/' ) {

    fs.readFile(path.join(publicRoot, 'index.html'), function( err, data ) {
      res.end( data )
    })

  }
  else {

    var filename = path.join( publicRoot, req.url )
    
    if( filename.indexOf(publicRoot) !== 0 ) {
      res.end( "sneaky bastard ;)" )
      return
    }

    fs.createReadStream( filename )
      .pipe( res ) 

  }


}


proxy.listen( process.env.PORT )
