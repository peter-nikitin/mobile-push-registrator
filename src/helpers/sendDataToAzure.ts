import axios from "axios";

import {
  destructedAnswer,
  MbInstallationInfo,
  NSData,
} from "../declare/types.d";

const sendDataToAzure = (
  { installationId }: MbInstallationInfo,
  { uri }: destructedAnswer,
  sasToken: string,
  { NStoken, NSsystem }: NSData
) => {
  axios.put(
    uri,
    {
      installationId: installationId,
      platform: NSsystem,
      pushChannel: NStoken,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: sasToken,
        "x-ms-version": "2015-01",
      },
    }
  );
};

export default sendDataToAzure;
