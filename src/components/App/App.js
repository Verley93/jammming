import React, {Component} from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import Spotify from './../../util/Spotify';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [], // array of objects, each containing name, artist, album, id
            playlistName: 'New Playlist',
            playlistTracks: [] // array of objects, each containing name, artist, album, id
        };

        this.search = this.search.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }

    // Update the state of searchResults w/ the value resolved from Spotify.search()'s promise
    search(term) {
        Spotify.search(term).then(searchResults => {
            this.setState({searchResults: searchResults});
        });
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }

        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks: tracks});
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playlistTracks: tracks});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    /*{ Pass trackURIs array and playlistName to method that will save
    the user's playlist to their account }*/
    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);

        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: []
            });
        });
    }

    render() {
        return (<div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar
                    onSearch={this.search}/>
                <div className="App-playlist">
                    <SearchResults
                        searchResults={this.state.searchResults}
                        onAdd={this.addTrack}/>
                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}/>
                </div>
            </div>
        </div>);
    }
}

export default App;
