import dotenv from 'dotenv';

export interface Auth {
  url: string,
  token: string,
}

export function getAuth() {
  dotenv.config();
  const canvasAuthTrail: Partial<Auth> = {
    url: process.env["CANVAS_API_URL"],
    token: process.env["CANVAS_API_TOKEN"],
  }
  if (isAuth(canvasAuthTrail)) {
    return canvasAuthTrail;
  }
  throw new Error(""
    + "Authentication information is not complete."
    + " Is your .env configured correctly?");
}

function isAuth(a: Partial<Auth>): a is Auth {
  return a.url !== undefined && a.token !== undefined;
}


