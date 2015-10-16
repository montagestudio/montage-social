/**
 * @module ui/icons.reel
 */
var AbstractButton = require("montage/ui/base/abstract-button").AbstractButton;
var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
    windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
    width = 550,
    height = 420,
    PARAM_ATTRIBUTE = "data-param";

/**
 * @class Icons
 * @extends Component
 */

/*
(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;

  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;

        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }

        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

*/


exports.TweetButton = AbstractButton.specialize(/** @lends Icons# */ {
  // "prepareForActivationEvents": {
  //   value: function() {
  //       this.tweetTriggerElement.addEventListener("click",this,false);
  //   }
  // },
  "hasTemplate": {
    value: true
  },
  templateDidLoad:{
      value: function (documentPart) {
          if (this._element && this._element.children.length === 0) { // Content by default
              var element = documentPart.fragment.querySelector("div[" + PARAM_ATTRIBUTE + "]"),
                  range = this._element.ownerDocument.createRange();

              range.selectNodeContents(element);
              element.parentNode.replaceChild(range.extractContents(), element);

              documentPart.parameters = {}; // no more parameters
              this.hasTemplateArgument = false;
          }
      }
  },
  "hasTemplateArgument": {
    value: true
  },
  "_referer": {
    value: null
  },
  "referer": {
    get: function() {
      return this._referer || window.location.href;
    },
    set: function(value) {
      if(value !== this._referer) {
        this._referer = value;
        this._tweetURL = null;
      }
    }
  },
  "_text": {
    value: null
  },
  "text": {
    value: null
  },
  "_url": {
    value: null
  },
  "url": {
    get: function() {
      return this._url || this.referer;
    },
    set: function(value) {
      if(value !== this._url) {
        this._url = value;
        this._tweetURL = null;
      }
    }  },
  "_hashtags": {
    value: null
  },
  "hashtags": {
    value: null
  },
  "via": {
    value: null
  },
  "_via": {
    value: null
  },
  "_tweetURL": {
    value: null
  },

  "handlePress": {
    value: function(event) {
      var winHeight = screen.height,
      winWidth = screen.width,
      top, left;
      console.log(event.target.identifier);

      left = Math.round((winWidth / 2) - (width / 2));
      top = 0;

      if (winHeight > height) {
        top = Math.round((winHeight / 2) - (height / 2));
      }

      event.returnValue = false;
      event.preventDefault && event.preventDefault();

      window.open('https://twitter.com/intent/tweet?original_referer='+encodeURIComponent(this.referer)+'&amp;ref_src=twsrc%5Etfw&amp;text='+encodeURIComponent(this.text)+'&amp;tw_p=tweetbutton&amp;url='+encodeURIComponent(this.url)+'&amp;via='+encodeURIComponent(this.via),'intent','width='+width+',height='+height+',left=' + left + ',top=' + top+',toolbar=no,location=yes,directories=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes');

    }
  },
  "hasTemplate": {
    "value": true
  },
  draw: {
      value: function (firstTime) {
          if (!this.hasTemplateArgument) {
            this.element.classList.add("btn");
          }
      }
  },

});
