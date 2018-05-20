let userAccessToken = null;
const redirectURI = 'http://localhost:3000';
const clientID ='306d5e7a66814bd9829ecbbc3f143366';
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private'

 const Spotify = {

  getAccessToken (){
  var regex1 = RegExp(/#access_token=([^&]*)/);
  var str1 = window.location.href;
  let urlToken = regex1.test(str1);
  var regex2 = RegExp(/expires_in=([^&]*)/);
  var str2 = window.location.href;
  let urlexpireTime = regex2.test(str2);

if(urlexpireTime===true && urlToken===true){
  console.log(urlexpireTime,urlToken);
  userAccessToken = window.location.href.match(/#access_token=([^&]*)/)[1];
   let expireTime = window.location.href.match(/expires_in=([^&]*)/)[1];
   window.setTimeout(() => userAccessToken = '', expireTime * 1000);
   window.history.pushState('Access Token', null, '/');}
  else if(userAccessToken===null && urlToken===false)
  {window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=token`;}
    },

search(term){
this.getAccessToken();
 return fetch (`https://api.spotify.com/v1/search?type=track&q=${term}`,
 {headers:{
  Authorization:`Bearer ${userAccessToken}`}
  })
.then(response => {
   if (response.ok) {
   return response.json();
   } throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message))
.then(jsonResponse => {
  if(jsonResponse.tracks){
 	return jsonResponse.tracks.items.map(track => (
			{id:track.id,
			 name:track.name,
			 artist:track.artists[0].name,
			 album:track.album.name,
			 URI:track.uri}
));}else {return [];}
}
)
},




 savePlaylist(listname, URIs){
    this.getAccessToken();
    let user_id
    let playlist_id
    if (listname && URIs)
    {console.log(listname);
      return fetch('https://api.spotify.com/v1/me', {
        headers: {Authorization: `Bearer ${userAccessToken}`}})
     .then(response => {
        if (response.ok) {return response.json();}
        throw new Error('Request Failed!');},
        networkError => console.log(networkError.message))
     .then(jsonResponse => {
        return user_id = jsonResponse.id; })
     .then(()=> {
        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
          headers: {Authorization: `Bearer ${userAccessToken}`},
          method: 'POST',
          body: JSON.stringify({name: listname})})
      .then(response => {
          if (response.ok) {return response.json();}
          throw new Error('Request Failed!');},
         networkError => console.log(networkError.message))
      .then(jsonResponse => {return playlist_id = jsonResponse.id;});})
      .then(()=> {
        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
          headers: {Authorization: `Bearer ${userAccessToken}`,'content-type':'application/json'},
          method: 'POST',
          body: JSON.stringify({uris: URIs})})
      .then(response => {
          if (response.ok) {
           return response.json();
          }throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
        });
      });
    } else {return;
      //console.log(listname);
    }
  }

 }


export default Spotify;
