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
        }
    }
}

export default Spotify;
