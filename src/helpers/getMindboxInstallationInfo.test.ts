import axios from "axios";

import getMindboxInstallationInfo from "./getMindboxInstallationInfo";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getMindboxInstallationInfo", () => {
  it("should get installation info", async () => {
    const mockedAnswer = {
      installationId: "123e4567-e89b-12d3-a456-426655440000",
      hubName: "test-hub-1",
      connectionString:
        "Endpoint=sb://mindboxmobilepushnotifications.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=ZEH3/2l0vTsaRMnwnzxQ5+B41MOOKKdHzejb1LuZDVk=",
    };

    mockedAxios.post.mockResolvedValueOnce(mockedAnswer);

    const answer = await getMindboxInstallationInfo("test");

    expect(answer).toEqual(mockedAnswer);
  });
});
