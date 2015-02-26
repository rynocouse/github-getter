(function(window, $, _) {

  // Setup cache object to store searches
  var cache = {},
      repoData;

  // Cache $ selectors
  var $loader = $('#loader'),
      $search = $('#search'),
      $overlayContainer = $('#overlay-container'),
      $resultsContainer = $('#results-container');


  // Events

  // Bind search function to input
  $search.on('keypress', function(e) {

    if (e.which == 13) {
      searchQuery();
    }

  });

  // Close Overlay
  $overlayContainer.on('click', function() {

    $overlayContainer.removeClass('active');

  });


  // Get the search query from the input
  function searchQuery() {

    var query = $search.val();

    window.query = query;

    searchGithub(query);

  }

  // Search through github repos
  function searchGithub(query) {

    // Show Loader
    $loader.addClass('active');
    // Hide previous results
    $resultsContainer.fadeOut(400);


    // Check if the query has already been made
    console.log(getCache(query));
    if (getCache(query)) {
      renderResults(query, getCache(query));
    } else {
      ajaxRequest(query);
    }
  }

  function slugify(text) {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
  }

  // Look for the query in cache

  function getCache(query) {
    return cache[slugify(query)] || false;
  }

  function renderResults(query, data) {
    console.log(query, data);
    $loader.removeClass('active');

    // add the query to the response object
    data.query = query;

    // render the template with
    // the search results
    resultsTemplate(data);
    repoInfo(data);

    // add response to cache object
    cache[slugify(query)] = data;

    window.repoData = data;

    console.log(window.data);
  };


  // The ajax request

  function ajaxRequest(query) {
    console.log('ajaxRequest', query);

    // Set the url with the search query
    var urlQuery = 'https://api.github.com/legacy/repos/search/' + query;

    // Make an ajax call to the github api
    $.getJSON(urlQuery, {
      format: "json",
    }).done(function(data) {
      renderResults(query, data);
    }).fail(function() {
      // Hide Loader
      $loader.removeClass('active');
    });
  }


  function resultsTemplate(data) {

    // pre-compile the template

    var template = _.template(
      '<h2>Search Results for <em>' + window.query + '</em></h2>' +
      '<div class="repo-list">' +
      '<div class="repo-head"><span class="repo-name">Name</span><span class="repo-owner">Owner</span></div>' +
      '<% _.each( repositories, function( repositories, i ){ %>' +
        '<a id="repo-info" data-index="<%- i %>">' +
          '<div class="repo">' +
            '<span class="repo-name"><%- repositories.name %></span>' +
            '<span class="repo-owner"><%- repositories.owner %></span>' +
          '</div>' +
        '</a>' +
      '<% }); %>' +
      '<div>'
    );

    // Render the underscore template and
    // inject in our search results.
    $resultsContainer.html(template(data)).hide().fadeIn(500);
  }


  // Getting More Info on a Repo
  function repoInfo(data, repoData) {

    // Click event for displaying the repo info
    $resultsContainer.on('click', '#repo-info', function(e, repoData) {

      var i = $(e.currentTarget).data('index');
      var currentRepo = window.repoData.repositories[i];

      displayRepoInfo(currentRepo);

    });

  }

  // Display a modal and render
  // the repo details to template

  function displayRepoInfo(currentRepo) {

    // pre-compile the template
    var template = _.template(
      '<article class="repo-details wrapper">' +
        '<h2>Repository Details for <em><%- name %></em></h2>' +
        '<p>Language: <strong><%- language %></strong></p>' +
        '<p>Owner: <strong><%- owner %></strong></p>' +
        '<p>Followers: <strong><%- followers %></strong></p>' +
        '<p>Description: <%- description %></p>' +
        '<a href="<%- url %>" class="button">GitHub Link</a>' +
      '</article>'
    );

    // Render the underscore template and inject in our search results.
    $overlayContainer.html(template(currentRepo)).addClass('active');
  }

})(window, jQuery, _);
