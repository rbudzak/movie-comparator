$(document).ready(function(){
  var movieId1;
  var movieId2;
  console.log('sanity check!');
  $('#srchBtn').on('click', function(e){
    console.log('clicked!');
    $('#main').fadeOut('slow', function (e){
      $.get("http://api.themoviedb.org/3/search/movie", {api_key: "a90909dd0e8c2686878fe2e657e00f17", query: $('#searchBox1').val()}, function (response){ 
          console.log(response);
          response.results.forEach(function(val){
            $('#results1').append('<li class="resultlist" data-id="' + val.id + '">' + val.title + ' (' + val.release_date.substr(0,4) + ')</li>');
          });
        }, "json");

        $.get("http://api.themoviedb.org/3/search/movie", {api_key: "a90909dd0e8c2686878fe2e657e00f17", query: $('#searchBox2').val()}, function (response){ 
          console.log(response);
          response.results.forEach(function(val){
            $('#results2').append('<li class="resultlist" data-id="' + val.id + '">' + val.title + ' (' + val.release_date.substr(0,4) + ')</li>');
          });
        }, "json");        
      $('#results').fadeIn('slow');
    });
  });

  $('#results1').on('click', function (e){
    $('#results1').children('.selected').removeClass('selected');
    $(e.target).addClass('selected');
    movieId1 = $(e.target).attr('data-id');
    console.log(movieId1);
  });

  $('#results2').on('click', function (e){
    $('#results2').children('.selected').removeClass('selected');
    $(e.target).addClass('selected');
    movieId2 = $(e.target).attr('data-id');
    console.log(movieId2);
  });

  $('#btnCompare').on('click', function (e){
    $('#results').fadeOut('slow', function (e){
        $.get("http://api.themoviedb.org/3/movie/" + movieId1 +"/credits", {api_key: "a90909dd0e8c2686878fe2e657e00f17"}, function (response){ 
          console.log(response);
          response.cast.forEach(function(val){
            $('#compList').append('<li>' + val.name + '</li>');
          });
          response.crew.forEach(function(val){
            $('#compList').append('<li>' + val.name + '</li>');
          });
        }, "json");      
      $('#compare').fadeIn('slow');
    });
  });



});