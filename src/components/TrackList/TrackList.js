import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';


class TrackList extends Component {

/*Using .map() to show each track in the tracks property.
key attribute to track.id, TrackList props sent through to Track component*/

  render() {
    //checking playList prop onAdd pulls through
  //console.log(this.props.onAdd);
    let track;
    if (this.props.tracks){
      track = this.props.tracks.map(track =>{
      return  ( <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove = {this.props.onRemove} isRemoval={this.props.isRemoval}/>)
      });
    }

    return (
      <div className="TrackList">
      {track}
{/*You will add a map method that renders a set of Track components */}
      </div>
    );
  }
}

export default TrackList;
