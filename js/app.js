$( document ).ready( function() {

  // Search Request
  var SearchRequest = {

    ui: {
      search: $('#search')
    },

    // Initialize Fuction
    // Sets up UI and run any necessary functions for the view
    init: function() {
      this.bindUIActions();
    },

    bindUIActions: function() {

      var self = this;

      this.ui.menuToggle.on('click', function() {
        self.menuToggle();
      });

      // 'click @ui.menuToggle': 'menuToggle',
      // 'click @ui.shareWidget': 'shareToggle',
      // 'click @ui.subMenuToggle': 'subMenuToggle'

    },

    menuToggle: function() {
      this.ui.menuToggle.toggleClass('active');
      this.ui.menu.toggleClass('active');
      this.ui.body.toggleClass('scroll-lock');
    }

  };

  return GlobalView;



});


/*
    # Endpoint URL #

    https://api.github.com/legacy/repos/search/{query}

    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.

    # Example Response JSON #

    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/
