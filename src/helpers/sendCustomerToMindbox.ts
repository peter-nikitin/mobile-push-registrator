import axios from "axios";

import { MbInstallationInfo, NSData } from "../declare/types.d";

import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

const sendCustomerToMindbox = async (
  { installationId }: MbInstallationInfo,
  { NSsystem }: NSData
) => {
  return await axios.post(
    `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env[NSsystem]}&operation=${process.env.operation}`,
    {
      customer: {
        customFields: {
          Syncstatus: "true",
        },
        subscriptions: [
          {
            pointOfContact: "Mobilepush",
          },
        ],
      },
      mobileApplicationInstallation: {
        id: installationId,
      },
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
    }
  );
};

export default sendCustomerToMindbox;
