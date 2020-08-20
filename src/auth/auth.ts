import dotenv from 'dotenv';
dotenv.config();

export interface Auth {
  url: string,
  token: string,
}

export function getAuth() {
  if (isAuth(canvasAuthTrail)) {
    return canvasAuthTrail;
  }
  throw new Error(""
    + "Authentication information is not complete"
    + "Is your .env configed correctly?");
}

function isAuth(a: Partial<Auth>): a is Auth {
  return a.url !== undefined && a.token !== undefined;
}

const canvasAuthTrail: Partial<Auth> = {
  url: process.env["CANVAS_API_URL"],
  token: process.env["CANVAS_API_TOKEN"],
}
