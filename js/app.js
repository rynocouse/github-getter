var SearchRequest = {

  ui: {
    searchInput: $('#search')
  },

  // Initialize Function
  // Sets up UI and runs any
  // other necessary functions

  init: function() {
    this.bindUIActions();
    // console.log('search module');
  },

  // Bind UI Actions

  bindUIActions: function() {

    // console.log('ui');

    var self = this;

    // Bind search function to input

    $('#search').on('keypress', function(e) {

      if ( e.which == 13 ) {
        // console.log('search submit');
        self.query();
      }

    });

  },

  // Get Query

  query: function() {

    var query = $('#search').val();

    this.searchGithub(query);

  },

  // Ajax search github repos

  searchGithub: function(query) {

    self = this;

    var urlQuery = 'https://api.github.com/legacy/repos/search/' + query;
    // console.log( url );

    $.getJSON( urlQuery, {
      format: "json"
    })
      .done( function(data) {

        // Log the data
        console.log(data);

        // Log the repo names
        // _.each(data.repositories, function( repositories ) {
        //   console.log(repositories.name);
        // });

        // render the template with
        // the search results
        self.resultsTemplate( data );

      })
      .fail( function() {
        console.log( "error" );
      });
  },

  resultsTemplate: function( data, template ) {

    // Grab the HTML out of our
    // template tag and pre-compile it.
    template = _.template(
      $( "script.template" ).html()
    );

    // Render the underscore template and
    // inject in our search results.
    $('#results-container').html(
      template( data )
    );
  }

};




// Getting More Info on a Repo
// ---------------------------

var RepoInfoRequest = {

  // Initialize Function
  // Sets up UI and runs any
  // other necessary functions

  init: function() {
    this.bindUIActions();
  },

  // Bind UI Actions

  bindUIActions: function() {

    var self = this;

    // Click event for repo info

    $('#repo-info').on('click', function() {
      self.getRepoInfo();
    });

  },

  getRepoInfo: function() {
    var index = this.data('index');
    console.log( index );
  }

};




// Initialize the Search App
// -------------------------

$(document).ready( function () {

  SearchRequest.init();
  RepoInfoRequest.init();

});
