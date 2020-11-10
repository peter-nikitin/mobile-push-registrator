import { NSData } from "../declare/types.d";

const detectPlatform = (token: string): NSData => {
  const tokenLength = token.length;

  if (tokenLength === 64) {
    return {
      NStoken: token,
      NSsystem: "apns",
    };
  } else if (tokenLength > 150) {
    return {
      NStoken: token,
      NSsystem: "gcm",
    };
  } else {
    throw "Unsupported token length";
  }
};

export default detectPlatform;
