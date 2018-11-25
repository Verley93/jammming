const clientID = '18995439d9bf4ce2be435d8b4989b1b1';
const redirectURI = 'http://localhost:3000/' //'http://jammming-dverley.surge.sh/';

let accessToken;

const Spotify = {
    // Check to see if accessToken is already set, or set it w/expiresIn otherwise
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        // Check URL if Access Token and expiresIn are set
        const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const matchexpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (matchAccessToken && matchexpiresIn) {
            accessToken = matchAccessToken[1];
            const expiresIn = Number(matchexpiresIn[1]);

            // Set timeout; Wipe accessToken at expiresIn
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            // Clear parameters from URL to prevent the app from grabbing accessToken after expiresIn
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // Redirect users to obtain authorization (Implicit Grant)
            const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = authURL;
        }
    },

    // https://developer.spotify.com/documentation/web-api/reference/object-model/
    search(term) {
        const accessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const init = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        // GET JSON track list
        return fetch(urlToFetch, init).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const endpoint = 'https://api.spotify.com/v1';
        const init = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        // GET current user's ID
        return fetch(`${endpoint}/me`, init).then(response => {
            return response.json();
        }).then(jsonResponse => {
            const userID = jsonResponse.id;

            // POST new playlist w/ input name to user's account, receive playlist ID
            return fetch(`${endpoint}/users/${userID}/playlists`, {
                headers: init.headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                const playlistID = jsonResponse.id;

                // POST track URIs to newly-created playlist referencing user's account and playlist IDs
                return fetch (`${endpoint}/playlists/${playlistID}/tracks`, {
                    headers: init.headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                });
            });
        });
    }
};

export default Spotify;
