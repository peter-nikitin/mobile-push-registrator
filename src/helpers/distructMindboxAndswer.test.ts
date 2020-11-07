import distructMindboxAndswer from "./distructMindboxAndswer";

describe("distructMindboxAndxwer", () => {
  it("should return correct value", () => {
    const disctructedMbAnswer = {
      uri: `https://mindboxmobilepushnotifications-1.servicebus.windows.net/test-hub-1/installations/123e4567-e89b-12d3-a456-426655440000?api-version=2015-01`,
      saName: "DefaultListenSharedAccessSignature",
      saKey: "ZEH3/2l0vTsaRMnwnzxQ5+B41MOOKKdHzejb1LuZDVk=",
    };

    const mockedAnswer = {
      installationId: "123e4567-e89b-12d3-a456-426655440000",
      hubName: "test-hub-1",
      connectionString:
        "Endpoint=sb://mindboxmobilepushnotifications-1.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=ZEH3/2l0vTsaRMnwnzxQ5+B41MOOKKdHzejb1LuZDVk=",
    };

    expect(distructMindboxAndswer(mockedAnswer)).toEqual(disctructedMbAnswer);
  });
});
