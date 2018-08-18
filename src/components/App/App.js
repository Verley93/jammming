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
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(track) {
        let pTracks = this.state.playlistTracks;

        // Check if track exists in Playlist
        if (pTracks.find(savedTrack => {
            savedTrack.id === track.id;
        })) {
            return;
        }

        pTracks.push(track);
        this.setState({playlistTracks: pTracks});
    }

    removeTrack(track) {
        let pTracks = this.state.playlistTracks;

        // Check if track exists in Playlist
        if (pTracks.find(savedTrack => {
            savedTrack.id === track.id;
        })) {
            return;
        }

        pTracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playlistTracks: pTracks});
    }

    render() {
        return (<div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar/>
                <div className="App-playlist">
                    <SearchResults
                        searchResults={this.state.searchResults}
                        onAdd={this.addTrack}
                        onRemove={this.removeTrack}/>
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
