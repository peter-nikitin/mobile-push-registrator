import axios from "axios";

import sendCustomerToMindbox from "./sendCustomerToMindbox";

import { NSData } from "./types.d";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("sendCustomerToMindbox", () => {
  it("should send data to MB", async () => {
    const mockedAnswer = {
      status: 200,
    };

    const mockInstalltionInfo = {
      installationId: "123123",
      hubName: "test-hub",
      connectionString: "connection",
    };

    const nsMock = {
      NStoken: "123",
      NSsystem: "apns",
    } as NSData;

    mockedAxios.post.mockResolvedValueOnce(mockedAnswer);

    const answer = await sendCustomerToMindbox(mockInstalltionInfo, nsMock);

    expect(answer).toEqual(mockedAnswer);
  });
});
