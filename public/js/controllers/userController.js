// public/js/controllers/userController.js

app.controller('userController', function($scope, spotinderService, Spotify) {

	$scope.selection = "personal";

	$scope.hip_hop_genre = [];
	$scope.pop_genre = [];
	$scope.rock_genre = [];
	$scope.country_genre = [];
	$scope.alternative_genre = [];



	Array.prototype.contains = function(obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] == obj) {
	            return true;
	        }
	    }
	    return false;
	}


    Spotify.search('hip_hop', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.hip_hop_genre.push( { 'genre': 'hip_hop', 'name':name, "artist":artist } );
		$scope.hip_hop_genre = $scope.hip_hop_genre.slice(0,3);
		// console.log("number",$scope.hip_hop_genre.length);
      });
    });


    Spotify.search('pop', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.pop_genre.push( { 'genre': 'pop', 'name':name, "artist":artist } );
		$scope.pop_genre = $scope.pop_genre.slice(0,3);
		
      });
    });

      Spotify.search('rock', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.rock_genre.push( { 'genre': 'rock', 'name':name, "artist":artist } );
		$scope.rock_genre = $scope.rock_genre.slice(0,3);
      });
    });

      Spotify.search('country', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.country_genre.push( { 'genre': 'rock', 'name':name, "artist":artist } );
		$scope.country_genre = $scope.country_genre.slice(0,3);
      });
    });

      Spotify.search('alternative', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.alternative_genre.push( { 'genre': 'rock', 'name':name, "artist":artist } );
		$scope.alternative_genre = $scope.alternative_genre.slice(0,3);
      });
    });


  
	$scope.userData = spotinderService.userData;
	spotinderService.addUser($scope.userData);

	var playlist = null;
	Spotify.getUserPlaylists( $scope.userData.id).then(function (data) {
		playlist = data;
		
		Spotify
		  .getPlaylistTracks($scope.userData.id, String(playlist.items[2].id))
		  .then(function (data) {
		  	console.log("specific playlist");
			console.log(data);
		  });
	});






	getLikes= function (){
		data = {
			username: $scope.userData.display_name
			}
		// console.log("getLikes userController: " + data.username);
		var confirmationPromise = spotinderService.getLikes(data);
		confirmationPromise.then(
	      function(confirmation) {
	        // console.log("getLikes confirmation");
			$scope.likedTracks = confirmation.like.slice();
	        // $scope.likedTracks = confirmation.like;
			// console.log($scope.likedTracks);
			// $scope.likedTracks.push("test");
	      },
	      function(error) {
	        console.log('ERROR: Promise error in TopicController', error);
	      }
	    );		
	};

	getLikes();

	$scope.like = function (dataGenre, dataName, dataArtist){
		// console.log("like button clicked");
		// console.log(typeof($scope.likedTracks));
		if(!$scope.likedTracks.contains(dataName)){
			$scope.likedTracks.push(dataName);
	        }          
		data = {
			genre: dataGenre, 
			name: dataName,
			artist: dataArtist, 
			user: $scope.userData.display_name
			}
		// console.log(data);
		var confirmationPromise = spotinderService.addLike(data);
		confirmationPromise.then(
	      function(confirmation) {
	        // console.log("confirmation");
	        // console.log(confirmation);
	      },
	      function(error) {
	        console.log('ERROR: Promise error in TopicController', error);
	      }
	    );		
	};
	
	$scope.match = function(username, likedTracks){
		// console.log(username);
		// console.log(likedTracks);

		data = {
			username: username,
			like: likedTracks
			}
		var confirmationPromise = spotinderService.match(data);
		confirmationPromise.then(
	      function(confirmation) {
	      	console.log("confirmation");
	      	console.log(confirmation.users);
	      	console.log(confirmation.totalLikes);

	      	spotinderService.matchUsers = confirmation.users;
	      	spotinderService.totalLikes = confirmation.totalLikes;
	      	spotinderService.go('/matchUsers');
	      },
	      function(error) {
	        console.log('ERROR: Promise error in TopicController', error);
	      }
	    );	
	};

});