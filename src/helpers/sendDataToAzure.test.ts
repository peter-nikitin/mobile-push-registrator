import axios from "axios";
import sendDataToAzure from "./sendDataToAzure";

import { NSData } from "../declare/types.d";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("sendDataToAzure", () => {
  it("should send data", async () => {
    const mockedAnswer = {
      installationId: "c54fba0f-4e19-460a-9b23-15dea171a730",
      hubName: "hubName-4",
      connectionString:
        "Endpoint=sb://mindboxmobilepushnotifications-4.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=ZUNtHWxkPdjs6g592roXj5QgOdh8IOfXk2NWjnKWISY=",
    };

    const mockedDestructedAnswer = {
      uri: `https://mindboxmobilepushnotifications-4.servicebus.windows.net/hubName-4/installations/c54fba0f-4e19-460a-9b23-15dea171a730?api-version=2015-01`,
      saName: "DefaultListenSharedAccessSignature",
      saKey: "ZUNtHWxkPdjs6g592roXj5QgOdh8IOfXk2NWjnKWISY=",
    };

    const mockedToken =
      "SharedAccessSignature sr=https%3A%2F%2Fmindboxmobilepushnotifications-4.servicebus.windows.net%2FhubName-4%2Finstallations%2Fc54fba0f-4e19-460a-9b23-15dea171a730%3Fapi-version%3D2015-01&sig=sH0TLd2QP7KEtoH6yxXjQ%2F%2FXuM2qOEP63YT9dF3Utds%3D&se=1605359699&skn=DefaultListenSharedAccessSignature";

    const mockedNSdata = {
      NStoken: "123",
      NSsystem: "apns",
    };

    axios.put = jest.fn().mockResolvedValueOnce({ status: 200 });

    await sendDataToAzure(
      mockedAnswer,
      mockedDestructedAnswer,
      mockedToken,
      mockedNSdata as NSData
    );

    expect(mockedAxios.put).toHaveBeenCalled();
  });
});
