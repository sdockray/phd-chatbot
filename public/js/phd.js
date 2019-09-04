// The Phd module is designed to handle everything to do with displaying
// the artwork.

var Phd = (function() {
	var settings = {
    selectors: {
      viewer: '#lookCloser',
    }
  };

  // Publicly accessible methods defined
  return {
    handlePayload: handlePayload
  };


	function isVisible(elem) {
		return !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	} 

	function hideOnClickOutside(element) {
	    var outsideClickListener = function(event) {
	        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
	          element.style.display = 'none'
	          removeClickListener()
	        }
	    }
	    var removeClickListener = function() {
	        document.removeEventListener('click', outsideClickListener)
	    }
	    document.addEventListener('click', outsideClickListener)
	}

	function playAlwaysLearning(ele) {
		ele.innerHTML = '<iframe id="video-always-learning" src="https://www.youtube.com/embed/sPEci8NjoKQ" frameborder="0" allowfullscreen>';
		ele.style.cssText = "display:block;top:50px;left:50px;"
		hideOnClickOutside(ele);
	}

	function playS2T(ele) {
		ele.innerHTML = '<iframe id="video-s2t" src="https://www.youtube.com/embed/NYzuxpuGk-Q" frameborder="0" allowfullscreen>';
		ele.style.cssText = "display:block;top:50px;left:50px;"
		hideOnClickOutside(ele);
	}

	// Handle a payload response from Watson
  function handlePayload(payload) {
    if (payload.output) {
    	var viewerElement = document.querySelector(settings.selectors.viewer);
      // Look through every intent that is returned
      for (var i = 0; i < payload.output.intents.length; i++) {
        // If we are in a show_artwork intent...
        if (payload.output.intents[i].intent == 'show_artwork') {
          var confidence = payload.output.intents[i].confidence;
          var artwork_entity = payload.output.entities[0].value;
          console.log("confidence = ", confidence);
          console.log("entity = ", artwork_entity);
          if (artwork_entity == 'always learning') {
          	//playAlwaysLearning(viewerElement);
          } else if (artwork_entity == 's2t') {
          	//playS2T(viewerElement);
          }
        }
      }
    }
  }

}());
