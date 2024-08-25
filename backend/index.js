const express = require("express");
const crypto2 = require("crypto");


const PORT = 3000;
const CLIENT_ID = "1070732311100-oq78ohjcmao07un8ao4oqkdjtuf7cvc1.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const app = express();

app.use(express.static("static"));

app.get("/oauth/google", (req, res) => {
  const params = new URLSearchParams();

  params.set("response_type", "code");
  params.set("client_id", CLIENT_ID);
  params.set("redirect_uri", "http://localhost:3000/oauth/google/callback");
  params.set("scope", "email");

  const state = crypto2.randomBytes(16).toString("hex");
  params.set("state", state);

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  res.set("Set-Cookie", `oauth_state=${state}; HttpOnly; SameSite=Lax`);
  res.redirect(url);
});

app.get("/oauth/google/callback", async (req, res) => {
  const { code, state } = req.query;
  const oauthState = getCookie("oauth_state", req.headers.cookie);

  if (state !== oauthState) {
    return res.status(400).send("Invalid state");
  }
  console.log("exchainging code ....");
  const accessToken = await exchangeCodeForToken(code);

  console.log("getting user info....")
  const userInfo = await getUserInfo(accessToken);
  console.log("user info", userInfo);
  res.header("Content-Type", "application/json").send(JSON.stringify(userInfo));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

function getCookie(name, cookies) {
  const cookie = cookies.split(";").find((cookie) => cookie.trim().startsWith(`${name}=`));
  if (!cookie) {
    return null;
  }
  return cookie.split("=")[1];
}

async function exchangeCodeForToken(code) {
  console.log("exchabge code", code);
  const resp = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/oauth/google/callback",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString(),
  });

  if (!resp.ok) {
    throw new Error("Something went wrong");
  }

  return resp.json();
}

async function getUserInfo(accessToken) {
  console.log("access token", accessToken);
  const resp = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`,
    },
  });

  return resp.json();
}

