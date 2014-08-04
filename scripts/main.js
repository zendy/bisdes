$( '.nav-primary' ).waypoint( function( direction) {
  $this = $( this );
  if ( direction === 'down' ) {
    $this.addClass( 'nav-primary--fixed' );
  } else if ( direction === 'up' ) {
    $this.removeClass( 'nav-primary--fixed' );
  }
});
