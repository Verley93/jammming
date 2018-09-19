const clientID = '';
const redirectURI = 'http://localhost:3000/';

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

        if (matchAcessToken && matchexpiresIn) {
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

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const init = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

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
                URI: track.uri
            }));
        });
    }
}

export default Spotify;
