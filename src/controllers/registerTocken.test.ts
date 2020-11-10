import axios from "axios";
import registerTocken from "./registerTocken";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("should register and log", async () => {
  mockedAxios.post
    .mockResolvedValueOnce({
      status: 200,
      data: {
        installationId: "123e4567-e89b-12d3-a456-426655440000",
        hubName: "test-hub-1",
        connectionString:
          "Endpoint=sb://mindboxmobilepushnotifications.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=ZEH3/2l0vTsaRMnwnzxQ5+B41MOOKKdHzejb1LuZDVk=",
      },
    })
    .mockResolvedValueOnce({ status: 200 });

  mockedAxios.put = jest.fn().mockResolvedValueOnce({ status: 200 });

  const answer = await registerTocken(
    "0000DD0655B4AF951DE5E73A1809A79398028CE8A60838C6E52631AC4D5DF3B2"
  );
  expect(answer).toEqual({
    installationId: "123e4567-e89b-12d3-a456-426655440000",
    tocken: "0000DD0655B4AF951DE5E73A1809A79398028CE8A60838C6E52631AC4D5DF3B2",
    platform: "apns",
    date: new Date("11.10.2020"),
  });
});

it("should throw error if unsopported tocken", async () => {
  try {
    await registerTocken("0000DD0655B4AF951DE5E73A1809A79398028CE8A60838CF3");
  } catch (error) {
    expect(error).toEqual({
      tocken: "0000DD0655B4AF951DE5E73A1809A79398028CE8A60838CF3",
      error: "Unsupported token length",
      installationId: undefined,
      platform: undefined,
      date: new Date("11.10.2020"),
    });
  }
});
