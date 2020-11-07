import { NSData } from "../declare/types.d";

const detectPlatform = (token: string): NSData => {
  const tokenLength = token.length;

  if (tokenLength === 64) {
    return {
      NStoken: token,
      NSsystem: "apns",
    };
  } else if (tokenLength === 163) {
    return {
      NStoken: token,
      NSsystem: "gcm",
    };
  } else {
    throw new Error("Unsupported token length");
  }
};

export default detectPlatform;
