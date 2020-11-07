import utf8 from "utf8";
import crypto from "crypto";

import { destructedAnswer } from "../declare/types.d";

function createSasToken({ uri, saName, saKey }: destructedAnswer): string {
  if (!uri || !saName || !saKey) {
    throw "Missing required parameter";
  }
  var encoded = encodeURIComponent(uri);
  var now =
    process.env.NODE_ENV === "test"
      ? new Date("2020-11-07T13:14:58.990Z")
      : new Date();
  var week = 60 * 60 * 24 * 7;
  var ttl = Math.round(now.getTime() / 1000) + week;
  var signature = encoded + "\n" + ttl;
  var signatureUTF8 = utf8.encode(signature);
  var hash = crypto
    .createHmac("sha256", saKey)
    .update(signatureUTF8)
    .digest("base64");
  return (
    "SharedAccessSignature sr=" +
    encoded +
    "&sig=" +
    encodeURIComponent(hash) +
    "&se=" +
    ttl +
    "&skn=" +
    saName
  );
}

export default createSasToken;
