import axios from "axios";

import {
  destructedAnswer,
  MbInstallationInfo,
  NSData,
} from "../declare/types.d";

import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

const sendDataToAzure = (
  { installationId }: MbInstallationInfo,
  { uri }: destructedAnswer,
  sasToken: string,
  { NStoken, NSsystem }: NSData
) => {
  return axios.put(
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
