import React, {Component} from 'react';
import './Track.css';

const track = {
    name: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
};

class Track extends Component {
    renderAction() {
        if (this.props.isRemoval) {
            return (<a className="Track-action" onClick={this.removeTrack}>-</a>)
        }
        return (<a className="Track-action" onClick={this.addTrack}>+</a>)
    }

    render() {
        return (<div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{`${track.artist} | ${track.album}`}</p>
            </div>
            {this.renderAction()}
        </div>);
    }
}

export default Track;
