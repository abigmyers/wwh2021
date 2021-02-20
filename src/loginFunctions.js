const getAuthCode = async () => {
    const url = "https://accounts.spotify.com/authorize";
    const authCode = "";
  
    await fetch(
      url +
        new URLSearchParams({
          client_id: "d6556825427049c48a53aa561f582fd2",
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
        client_id: "d6556825427049c48a53aa561f582fd2",
        client_secret: "34fc0f48ba974b30b8c7bb2388b4a149",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        accessToken = json.access_token;
      })
      .catch((error) => console.error(error));
  
    return accessToken;
  };