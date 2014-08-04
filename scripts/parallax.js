// init variables
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var topScrollY = 0;
var bottomScrollY = topScrollY + viewportHeight;
var panels, updateThisPanelNow;

var onScroll = function () {
  topScrollY = window.scrollY;
  bottomScrollY = topScrollY + viewportHeight;
  checkPanelInView();
};

var onResize = function () {
  if ( viewportHeight != Math.max(document.documentElement.clientHeight, window.innerHeight || 0) ) {
    viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    bottomScrollY = topScrollY + viewportHeight;
  }
  setupPanels();
};

var checkPanelInView = function () {
  var panel, i, thisPanelTopScrollY, thisPanelBottomScrollY;

  for ( i = 0; i < panels.length; i++ ) {
    thisPanel = panels[ i ];
    thisPanelTopScrollY = thisPanel.panelYPosStart;
    thisPanelBottomScrollY = thisPanel.panelHeight + thisPanelTopScrollY;

    if ( bottomScrollY - (viewportHeight/3) >= thisPanelTopScrollY && topScrollY <= thisPanelBottomScrollY ) {
      thisPanel.inView = true;
      // updateThisPanelNow = i;
      requestAnimationFrame( updatePanel );
    } else {
      thisPanel.inView = false;
    }
  }
};

var updatePanel = function () {
  var i, thisPanel, $element, $elementHeader, animationTiming, positionStart, positionChange, animationDuration;

  for ( i = 0; i < panels.length; i++ ) {
    // need to check if updateThisPanelNow is not null?
    thisPanel = panels[ i ];

    if ( thisPanel.inView === true ) {
      $element = $( '.section-panel--' + thisPanel.panelName );
      $elementHeader = $element.find( '.section-panel__header' );

      if ( bottomScrollY - thisPanel.panelYPosStart - (viewportHeight/3) <= thisPanel.panelHeaderHeight ) {
        animationTiming = bottomScrollY - thisPanel.panelYPosStart - (viewportHeight/3);
        positionStart = -(thisPanel.panelHeaderHeight);
        positionChange = thisPanel.panelHeaderHeight;
        // I found that 32% of the height is the best duration for formula without PI
        animationDuration = thisPanel.panelHeaderHeight * 32 / 100;
        // I found that 100% of the height is the best duration for formula with PI
        // animationDuration = panels[panel].panelHeaderHeight;
        thisPanel.panelHeaderPos = easeInOutQuad( animationTiming, positionStart, positionChange, animationDuration );

        $elementHeader.css(
          'transform', 'translate3d( 0, ' + thisPanel.panelHeaderPos + 'px, 0 )'
        );
      }
    }
  }
};

var easeInOutQuad = function (t, b, c, d) {
  // t = time, b = start value, c = change value, d = duration
  // sinusoadial in and out
  // copied from https://github.com/dhg/davegamache/parallax

  // return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  return -c/2 * (Math.cos(t/d) - 1) + b;
};

var setupPanels = function() {
  var $sectionPanelSpeaker, $sectionPanelSpeakerHeader, sectionPanelSpeakerHeaderHeight, $sectionPanelAuthor, $sectionPanelAuthorHeader, sectionPanelAuthorHeaderHeight, $sectionPanelRadiohost, $sectionPanelRadiohostHeader, sectionPanelRadiohostHeaderHeight, $sectionPanelInnovator, $sectionPanelInnovatorHeader, sectionPanelInnovatorHeaderHeight;

  $sectionPanelSpeaker = $( '.section-panel--speaker' );
  $sectionPanelSpeakerHeader = $sectionPanelSpeaker.find( '.section-panel__header' );
  sectionPanelSpeakerHeaderHeight = $sectionPanelSpeakerHeader.outerHeight();
  $sectionPanelAuthor = $( '.section-panel--author' );
  $sectionPanelAuthorHeader = $sectionPanelAuthor.find( '.section-panel__header' );
  sectionPanelAuthorHeaderHeight = $sectionPanelAuthorHeader.outerHeight();
  $sectionPanelRadiohost = $( '.section-panel--radiohost' );
  $sectionPanelRadiohostHeader = $sectionPanelRadiohost.find( '.section-panel__header' );
  sectionPanelRadiohostHeaderHeight = $sectionPanelRadiohostHeader.outerHeight();
  $sectionPanelInnovator = $( '.section-panel--innovator' );
  $sectionPanelInnovatorHeader = $sectionPanelInnovator.find( '.section-panel__header' );
  sectionPanelInnovatorHeaderHeight = $sectionPanelInnovatorHeader.outerHeight();
  panels = [
    {
      panelName: 'speaker',
      inView: false,
      panelHeight: $sectionPanelSpeaker.outerHeight(),
      panelYPosStart: $sectionPanelSpeaker.offset().top,
      panelHeaderPos: -(sectionPanelSpeakerHeaderHeight),
      panelHeaderHeight: sectionPanelSpeakerHeaderHeight
    },
    {
      panelName: 'author',
      inView: false,
      panelHeight: $sectionPanelAuthor.outerHeight(),
      panelYPosStart: $sectionPanelAuthor.offset().top,
      panelHeaderPos: -(sectionPanelAuthorHeaderHeight),
      panelHeaderHeight: sectionPanelAuthorHeaderHeight
    },
    {
      panelName: 'radiohost',
      inView: false,
      panelHeight: $sectionPanelRadiohost.outerHeight(),
      panelYPosStart: $sectionPanelRadiohost.offset().top,
      panelHeaderPos: -(sectionPanelRadiohostHeaderHeight),
      panelHeaderHeight: sectionPanelRadiohostHeaderHeight
    },
    {
      panelName: 'innovator',
      inView: false,
      panelHeight: $sectionPanelInnovator.outerHeight(),
      panelYPosStart: $sectionPanelInnovator.offset().top,
      panelHeaderPos: -(sectionPanelInnovatorHeaderHeight),
      panelHeaderHeight: sectionPanelInnovatorHeaderHeight
    }
  ];

  $sectionPanelSpeakerHeader.css(
    'transform', 'translate3d( 0, ' + panels[ 0 ].panelHeaderPos + 'px, 0 )'
  );

  $sectionPanelAuthorHeader.css(
    'transform', 'translate3d( 0, ' + panels[ 1 ].panelHeaderPos + 'px, 0 )'
  );

  $sectionPanelRadiohostHeader.css(
    'transform', 'translate3d( 0, ' + panels[ 2 ].panelHeaderPos + 'px, 0 )'
  );

  $sectionPanelInnovatorHeader.css(
    'transform', 'translate3d( 0, ' + panels[ 3 ].panelHeaderPos + 'px, 0 )'
  );
};

if ( mediaQuerySupport ) {
  var mql = window.matchMedia( "(min-width: 50em)" );

  if ( Modernizr.mq('(min-width: 50em)') ) {
    setupPanels();
    window.addEventListener( 'scroll' , onScroll, false );
    window.addEventListener( 'resize' , onResize, false );
  }
}
