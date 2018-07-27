import React, {Component} from 'react';
import './Track.css';

const track = {
    name: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
};

class Track extends Component {
    render() {
        return (<div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{`${track.artist} | ${track.album}`}</p>
            </div>
            <a className="Track-action">
                +{/* + or - will go here */}
            </a>
        </div>);
    }
}

export default Track;
