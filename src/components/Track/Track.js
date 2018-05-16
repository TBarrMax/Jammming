import React, { Component } from 'react';
import './Track.css';
import TrackList from '../TrackList/TrackList.js';


class Track extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  };
/* method called renderAction that displays a - anchor tag if the
isRemoval property is true, and a + anchor tag if
the isRemoval property is false.*/
renderAction(props){
const isRemoval = this.props.isRemoval;
  if(isRemoval)
  {return <a onClick={this.removeTrack} className="Track-action"> - </a>;}
  {return <a onClick={this.addTrack} className="Track-action"> + </a>;}
  };

addTrack(){
    this.props.onAdd(this.props.track)
};

removeTrack(){
  this.props.onRemove(this.props.track)
};

  render() {
    //console.log(this.props.onAdd);
    return (
  <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist} | {this.props.track.album}</p>
  </div>

  {this.renderAction()}
</div>
);
  }
}

export default Track;
