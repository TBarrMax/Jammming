import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    /*created isFalse var to use 'this' otherwise the isRemoval was passed down
    from both SearchResults and Playlist overriding eachother*/
    let isFalse = "false";

    return (
      <div className="SearchResults">
  <h2>Results</h2>
  <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}
                     isRemoval={this.isFalse}/>
</div>
    );
  }
}

export default SearchResults;
