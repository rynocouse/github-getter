$(document).ready( function () {

  // Bind search function to input

  $('#search').on('keypress', function(e) {

    if ( e.which == 13 ) {
      searchQuery();
    }

  });

  // Close Overlay

  $('#overlay-container').on('click', function() {

    $('#overlay-container').removeClass('active');

  });

});


// Get the search query
// from the input

function searchQuery() {

  var query = $('#search').val();

  window.query = query;

  searchGithub(query);

}


// Setup cache array to store searches

var cache = [];

// Set global var to store response

var repoData;


// Search through github repos

function searchGithub(query) {

  // Show Loader
  // Hide when request completes

  $('#loader').addClass('active');

  // Set the url with the search query
  var urlQuery = 'https://api.github.com/legacy/repos/search/' + query;

  // Check cache to see if a
  // query has already been made

  if ( window.cache !== undefined && window.cache.length > 0 ) {

    ajaxRequest();

  }

  // Check if the query has already been made

  else {

    // console.log( "query not found" );

    findQuery( query );

    //return key;

    ajaxRequest();

  }

  // Look for the query in cache

  function findQuery() {

    // This aint working so I need
    // to figure out how to find a
    // query in my cache

    _.find(window.cache, function(v, k) {
      if (v === query) {
        key = k;
        // return true;
        console.log( "query match" );
      } else {
        // return false;
        console.log( "query not found" );
      }

    });

  }

  // The ajax request

  function ajaxRequest() {

    // Make an ajax call to the github api
    $.getJSON( urlQuery, {
      format: "json",
    })
      .done( function(data) {

        // Hide Loader
        $('#loader').removeClass('active');

        // Log the data
        // console.log(data);

        // render the template with
        // the search results
        resultsTemplate( data );
        repoInfo( data );

        // add the query to the response object
        data.query = query;

        // add response to cache
        window.cache.push(data);

        // set to global
        window.repoData = data;

      })
      .fail( function() {

        // Hide Loader
        $('#loader').removeClass('active');

        console.log("error");

      });

  }
}


function resultsTemplate(data, template) {

  // pre-compile the template

  template = _.template(
    '<h2>Search Results for <em>'+ window.query +'</em></h2>'+
    '<div class="repo-list">'+
      '<div class="repo-head"><span class="repo-name">Name</span><span class="repo-owner">Owner</span></div>'+
      '<% _.each( repositories, function( repositories, i ){ %>'+
        '<a id="repo-info" data-index="<%- i %>">'+
          '<div class="repo">'+
            '<span class="repo-name"><%- repositories.name %></span>'+
            '<span class="repo-owner"><%- repositories.owner %></span>'+
          '</div>'+
        '</a>'+
      '<% }); %>'+
    '<div>'
  );

  var compiledtemplate = template;

  // Render the underscore template and
  // inject in our search results.
  $('#results-container').html(

    compiledtemplate( data )

  ).hide().slideDown(500);
}


// Getting More Info on a Repo

function repoInfo(data, repoData) {

  // Click event for the displaying the repo info

  $('#results-container').on('click', '#repo-info', function(e, repoData) {

    var i = $(e.currentTarget).data('index');

    console.log(i);

    var currentRepo = window.repoData.repositories[i];

    displayRepoInfo(currentRepo);

  });

}

// Display a modal and render
// the repo details to template

function displayRepoInfo(currentRepo, template) {

  // pre-compile the template

  template = _.template(
    '<article class="repo-details wrapper">'+
      '<h2>Repository Details for <em><%- name %></em></h2>'+
      '<p>Language: <strong><%- language %></strong></p>'+
      '<p>Owner: <strong><%- owner %></strong></p>'+
      '<p>Followers: <strong><%- followers %></strong></p>'+
      '<p>Description: <%- description %></p>'+
      '<a href="<%- url %>" class="button">GitHub Link</a>'+
    '</article>'
  );

  var compiledtemplate = template;

  // console.log(template);

  // Render the underscore template and
  // inject in our search results.
  $('#overlay-container').html(
    compiledtemplate( currentRepo )
  )
  .addClass('active');

}
