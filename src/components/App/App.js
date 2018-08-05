import React, {Component} from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import Track from './../Track/Track';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [], // array of objects, each containing name, artist, album, id
            playlistName: 'New Playlist',
            playlistTracks: [] // array of objects, each containing name, artist, album, id
        }
    }

    render() {
        return (<div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar/>
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults}/>
                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}/>
                    <Track/>
                </div>
            </div>
        </div>);
    }
}

export default App;
