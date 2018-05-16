let userAccessToken = null; 
const redirectURI= 'http://localhost:3000';
const clientID='306d5e7a66814bd9829ecbbc3f143366';

export const Spotify = {

  getAccessToken (){
  var regex1 = RegExp(/#access_token=([^&]*)/);
  var str1 = window.location.href;
  let urlToken = regex1.test(str1);
  var regex2 = RegExp(/expires_in=([^&]*)/);
  var str2 = window.location.href;
  let urlexpireTime = regex2.test(str2);
  
  if(urlexpireTime===true && urlToken===true){console.log(urlexpireTime,urlToken)
  userAccessToken = window.location.href.match(/#access_token=([^&]*)/)[1];
  console.log(userAccessToken);
   let expireTime = window.location.href.match(/expires_in=([^&]*)/)[1];
    console.log(expireTime);
   window.setTimeout(() => userAccessToken = '', expireTime * 1000);
   window.history.pushState('Access Token', null, '/');
   console.log(userAccessToken);
   return this.search();}
  else if(userAccessToken===null && urlToken===false){
    window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email&response_type=token&state=123`);
	let userAccessToken = window.location.href.match(/#access_token=([^&]*)/)[1];
    let expireTime = window.location.href.match(/expires_in=([^&]*)/)[1];
    window.setTimeout(() => userAccessToken = '', expireTime * 1000);
    window.history.pushState('Access Token', null, '/');
        return this.search();}
  else{console.log('error')}
  },


search(term){
 if(userAccessToken===null){this.getAccessToken()}
 else 
{fetch (`https://api.spotify.com/v1/search?type=track&q=${term}`,
 {headers:{
  Authorization:`Bearer ${userAccessToken}`}})
 .then(response => response.json())
 .then(jsonResponse => {if(jsonResponse.tracks.items){return jsonResponse.tracks.items.map(track => (
	{id:track.id,name:track.name,artist:track.artists[0].name,album:track.album.name,URI:track.uri}))}
	else{return}})
.then(tracks => console.log(tracks))
}
},
 
      
savePlaylist(playlistName,trackURIs){ 
if (userAccessToken===null){this.getAccessToken()}
  else if (!playlistName || !trackURIs){return}
  else {
  	let headers = {headers:{
    Authorization:`Bearer ${userAccessToken}`}};
    let usersId;
    let playlistID;
  return fetch(`https://api.spotify.com/v1/me`,
      {headers:{headers},method:'GET'})
      .then(response => response.json())
      .then(jsonResponse=>{
  if(jsonResponse.id){let usersId = jsonResponse.id;}})
 .then( fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`,
       {method:'POST',
    	headers:{
     	 Authorization:`Bearer ${userAccessToken}`,
      	 Content_type: "application/json"},
         body:JSON.stringify(playlistName)}))
 .then(response => {return response.json();})
 .then(jsonResponse=>{
 if(jsonResponse.id){
          let playlistID = jsonResponse.id;}})
 .then( fetch(`https://api.spotify.com/v1/users/${usersId}/playlists/${playlistID}/tracks`,
       {method:'POST',
        headers:{
     	 Authorization:`Bearer ${userAccessToken}`,
      	 Content_type: "application/json"},
    	 body:JSON.stringify(trackURIs)})
 .then(response => {return response.json();})
 .then(jsonResponse=>{if(jsonResponse.id){
          let playlistID = jsonResponse.id;}}));
    }}
};


export default Spotify;
