$(document).ready(function(){
  var movieId1;
  var movieId2;
  var objCast1 = [];
  var objCast2 = [];
  var objCrew1 = [];
  var objCrew2 = [];
  console.log('sanity check!');
  $('#srchBtn').on('click', function(e){
    console.log('clicked!');
    $('#main').fadeOut('slow', function (e){
      $.get("http://api.themoviedb.org/3/search/movie", {api_key: "a90909dd0e8c2686878fe2e657e00f17", query: $('#searchBox1').val()}, function (response){ 
          console.log(response);
          response.results.forEach(function(val){
            $('#results1').append('<li class="resultlist" data-id="' + val.id + '" data-titleyear="' + val.title + '(' + val.release_date.substr(0,4) + ')">' + val.title + ' (' + val.release_date.substr(0,4) + ')</li>');
          });
        }, "json");

        $.get("http://api.themoviedb.org/3/search/movie", {api_key: "a90909dd0e8c2686878fe2e657e00f17", query: $('#searchBox2').val()}, function (response){ 
          console.log(response);
          response.results.forEach(function(val){
            $('#results2').append('<li class="resultlist" data-id="' + val.id + '" data-titleyear="' + val.title + '(' + val.release_date.substr(0,4) + ')">' + val.title + ' (' + val.release_date.substr(0,4) + ')</li>');
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
          objCast1 = response.cast;
          objCrew1 = response.crew;
          // response.cast.forEach(function(val){
          //   $('#compList').append('<li>' + val.name + '</li>');
          // });
          // response.crew.forEach(function(val){
          //   $('#compList').append('<li>' + val.name + '</li>');
          // });
        }, "json");
        $.get("http://api.themoviedb.org/3/movie/" + movieId2 +"/credits", {api_key: "a90909dd0e8c2686878fe2e657e00f17"}, function (response){ 
          console.log(response);
          objCast2 = response.cast;
          objCrew2 = response.crew;
          // response.cast.forEach(function(val){
          //   $('#compList').append('<li>' + val.name + '</li>');
          // });
          // response.crew.forEach(function(val){
          //   $('#compList').append('<li>' + val.name + '</li>');
          // });
          castComp(objCast1, objCast2);
          crewComp(objCrew1, objCrew2);         
        }, "json");
      $('#compare').fadeIn('slow');
    });
  });



});

function castComp(arr1, arr2){
  console.log("comparing");
  arr1.forEach(function(val){
    arr2.forEach(function(val2){
      if (val.id === val2.id){
        $('#compList').append('<li>' + val.name + ' - ' + val.character + ', ' + val2.character + '</li>');
        console.log('match found for id ' + val.id +", " + val.name + ".");
      }
    });
  });
}

function crewComp(arr1, arr2){
  console.log("comparing");
  arr1.forEach(function(val, idx){
    arr2.forEach(function(val2, idx){
      if (val.id === val2.id){
        $('#compList').append('<li>' + val.name + ' - ' + val.job + ', ' + val2.job + '</li>');
        console.log('match found for id ' + val.id +", " + val.name + ".");
        arr2.splice(idx, 1);
      }
    });
  });
}

