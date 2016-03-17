$(document).ready(function(){
  console.log('sanity check!');
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://api.themoviedb.org/3/search/movie?api_key=a90909dd0e8c2686878fe2e657e00f17&query=titanic",
    "method": "GET",
    "headers": {
      "accept": "application/json"
    },
    "processData": false,
    "data": ""
  };

  $('#srchBtn').on('click', function(e){
    console.log('clicked!');
    $('#main').fadeOut('slow', function (e){
      


      // $.ajax(settings).done(function (response) {
      //   console.log(response);

      // });

      $.get("http://api.themoviedb.org/3/search/movie", {api_key: "a90909dd0e8c2686878fe2e657e00f17", query: $('#searchBox1').val()}, function (response){ 
          console.log(response);
          response.results.forEach(function(val){
            $('#results1').append('<li>' + val.title + ' (' + val.release_date.substr(0,4) + ')</li>');
          });
        }, "json");      
      $('#results').fadeIn('slow');
    });
  });

});