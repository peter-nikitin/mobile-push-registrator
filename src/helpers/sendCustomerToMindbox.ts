import axios from "axios";

import { MbInstallationInfo, NSData } from "../declare/types.d";

const sendCustomerToMindbox = async (
  { installationId }: MbInstallationInfo,
  { NSsystem }: NSData
) => {
  return await axios.post(
    `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env[NSsystem]}&operation=${process.env.operation}`,
    {
      customer: {
        customFields: {
          forWho: "1",
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
