const data = require('./spotifyData.json');

const getAuthCode = async () => {
    const url = "https://accounts.spotify.com/authorize";
    const authCode = "";
  
    await fetch(
      url +
        new URLSearchParams({
          client_id: data.client_id,
          response_type: "code",
          redirect_uri: "http://localhost:8888/callback",
          scope: "playlist-read-private",
          show_dialog: "false",
        })
    )
      .then((response) => response.json())
      .then((json) => {
        authCode = json.code;
      })
      .catch((error) => console.error(error));
  
    return authCode;
  };
  
  const getAccessToken = async () => {
    const authCode = await getAuthCode();
    const url = "https://accounts.spotify.com/api/token";
    const accessToken = "";
  
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: "http://localhost:8888/callback",
        client_id: data.client_id,
        client_secret: data.client_secret,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        accessToken = json.access_token;
      })
      .catch((error) => console.error(error));
  
    return accessToken;
  };