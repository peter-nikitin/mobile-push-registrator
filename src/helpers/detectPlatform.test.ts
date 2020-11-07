import detectPlatform from "./detectPlatform";

it("should return APNS platform", () => {
  const token =
    "13962EB186C1007639CF8609A6B4A907273F37F2CC763CB437302EDA03A55FEE";

  const mockedAnswer = {
    NStoken: token,
    NSsystem: "apns",
  };

  expect(detectPlatform(token)).toEqual(mockedAnswer);
});

it("should return GCM platform", () => {
  const token =
    "epTsh4HqTTOk_zeN3PfNN3:APA91bHyDwjzkLZhdB0dIxcl5DjyIm39YrGGiV93bzo_FXAnvUxA5iBd0n5fDdNmJsqvIDccJL0uyGE_dHWCwRuRBR0vEteKVPg29hy81PVvCm5eSpjdFVhrQTGxQprfbqXU4t9Df7fi";

  const mockedAnswer = {
    NStoken: token,
    NSsystem: "gcm",
  };
  expect(detectPlatform(token)).toEqual(mockedAnswer);
});

it("should throw error with unsupported toekn", () => {
  const token = "13962EB186C1007639CF8609A6B4A907273F";

  const mockedAnswer = {
    NStoken: token,
    NSsystem: "apns",
  };

  expect(() => detectPlatform(token)).toThrowError("Unsupported token length");
});
