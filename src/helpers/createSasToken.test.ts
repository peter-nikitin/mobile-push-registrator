import createSasToken from "./createSasToken";

describe("createSasToken", () => {
  it("should return correct token", () => {
    const mockedAnswer = {
      uri: `https://mindboxmobilepushnotifications-4.servicebus.windows.net/hubName-4/installations/c54fba0f-4e19-460a-9b23-15dea171a730?api-version=2015-01`,
      saName: "DefaultListenSharedAccessSignature",
      saKey: "ZUNtHWxkPdjs6g592roXj5QgOdh8IOfXk2NWjnKWISY=",
    };

    const mockedToken =
      "SharedAccessSignature sr=https%3A%2F%2Fmindboxmobilepushnotifications-4.servicebus.windows.net%2FhubName-4%2Finstallations%2Fc54fba0f-4e19-460a-9b23-15dea171a730%3Fapi-version%3D2015-01&sig=sH0TLd2QP7KEtoH6yxXjQ%2F%2FXuM2qOEP63YT9dF3Utds%3D&se=1605359699&skn=DefaultListenSharedAccessSignature";

    expect(createSasToken(mockedAnswer)).toBe(mockedToken);
  });

  it("should throw error", () => {
    const mockedAnswer = {
      uri: `https://mindboxmobilepushnotifications-4.servicebus.windows.net/hubName-4/installations/c54fba0f-4e19-460a-9b23-15dea171a730?api-version=2015-01`,
      saName: "DefaultListenSharedAccessSignature",
      saKey: "",
    };

    const mockedToken =
      "SharedAccessSignature sr=https%3A%2F%2Fmindboxmobilepushnotifications-4.servicebus.windows.net%2FhubName-4%2Finstallations%2Fc54fba0f-4e19-460a-9b23-15dea171a730%3Fapi-version%3D2015-01&sig=sH0TLd2QP7KEtoH6yxXjQ%2F%2FXuM2qOEP63YT9dF3Utds%3D&se=1605359699&skn=DefaultListenSharedAccessSignature";

    try {
      createSasToken(mockedAnswer);
    } catch (error) {
      expect(error).toBe("Missing required parameter");
    }
  });
});
