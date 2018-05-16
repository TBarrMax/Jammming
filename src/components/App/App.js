import React, { Component } from 'react';
import Spotify from '../util/Spotify.js';
import SearchBar from '../SearchBar/Searchbar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import Track from '../Track/Track.js';
import './App.css'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      /*searchResults:[
   {name:'Test1n',artist:'test1ar',album:'test1al', id:'90001i', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhA6'},
    {name:'Test2n', artist:'test2ar',album:'test2al', id:'90002i', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhB6'},
    {name:'Test3n', artist:'test3ar',album:'test3al', id:'90003i', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhC6'}
  ],*/
  searchResults:[],
  playlistName:'AnyString',
  playlistTracks:[
{name:'Test10n',artist:'test10ar',album:'test10al', id:'900010i', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhD6'},
{name:'Test20n', artist:'test20ar',album:'test20al', id:'900020i', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhE6'},
{name:'Test30n', artist:'test30ar',album:'test30al', id:'900030i', uri:'spotify:track:6rqhFgbbKwnb9MLmUQDhF6'}
]
  };
  this.search = this.search.bind(this);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
 
  };

/* addTrack function: if track.id is not equal to any tracks on Playlist then
can add track to playlist through .push method, then this.setState set the Playlist to
the current state with the new track */
addTrack(track)
  {if (this.state.playlistTracks.find(savedTrack =>
        savedTrack.id === track.id)) {return;}
  else { this.state.playlistTracks.push(track) };
  let playlistTracks = this.state.playlistTracks;
  this.setState({playlistTracks:playlistTracks});
}

/* removeTrack function compares  track id of clicked with playlist id and
returns match index in array from,splice method removes object with matching
index (only 1 object) from playlistTracks array, finally resets
playlistTracks state through setstate*/

removeTrack(track){
let playlistTracks = this.state.playlistTracks;
let index = playlistTracks.findIndex(track => track.id = playlistTracks.id);
playlistTracks.splice(index,1);
this.setState({playlistTracks:playlistTracks});
}

updatePlaylistName(name){
  let playlistName = this.playlistName;
  this.setState({playlistName: name});
}

savePlaylist(){
/*let playlistTracks = this.state.playlistTracks;
const trackURIs = playlistTracks.map(uri => uri.uri);
console.log(trackURIs);*/
Spotify.savePlaylist(trackURIs).then(trackURIs => {this.setState(this.trackURIs:trackURIs)});
//console.log(trackURIs);
}

search(term){
let searchResults = this.state.searchResults;
Spotify.search(term).then(tracks => {this.setState({searchResults});})
}

  render(){
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
  <SearchBar onSearch={this.search} />
    <div className="App-playlist">
<SearchResults searchResults={this.state.track} onAdd={this.addTrack}/>
<PlayList playListName ={this.state.playlistName}
          playListTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
