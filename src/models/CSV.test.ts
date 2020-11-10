import fs from "fs";
import path from "path";

import CSV, { CsvLine } from "./CSV";

const csv = new CSV(
  "../../__mocks__/mockTocken.csv",
  "../../__mocks__/mockResult.csv"
);

describe("CSV", () => {
  it("shoult read file", async () => {
    let tockenFromFile: string[] = [];

    await csv.read<CsvLine>(({ tocken }) => tockenFromFile.push(tocken));

    expect(tockenFromFile).toEqual([
      "0000DD0655B4AF951DE5E73A1809A79398028CE8A60838C6E52631AC4D5DF3B2",
      "0000DD0655B4AF951DE5E73A1809A79398028CE8A60838C6E52631AC4D5DF3B2",
      "epTsh4HqTTOk_zeN3PfNN3:APA91bHyDwjzkLZhdB0dIxcl5DjyIm39YrGGiV93bzo_FXAnvUxA5iBd0n5fDdNmJsqvIDccJL0uyGE_dHWCwRuRBR0vEteKVPg29hy81PVvCm5eSpjdFVhrQTGxQprfbqXU4t9Df7fi",
      "f6jpQ8iERlmH1c1tfgw-PL:APA91bHx-tWp7L0A3hJyV_iF2nh-Jiwpp9j1mAAXWFkvaf6aZ4d0ymrDq3-MQEds3j8DtYtEy02Xwrja7ddQE8J3hSFu5EXQr1Bys47b-gqv4WU1tV_mdTA4GjfJ3QgFCEHOD42xfkXe",
    ]);
  });

  it("shoult write line to csv", async () => {
    let tockenFromFile: string[] = [];

    await csv.write({
      tocken: "123",
      installationId: "4321",
      platform: "apns",
      date: new Date("10.11.2020"),
    });

    fs.readFile(
      path.resolve(__dirname, "../../__mocks__/mockResult.csv"),
      "utf8",
      (error, data) => {
        expect(data).toEqual(
          "TOKEN,INSTALLATOIN_ID,PLATFORM,ERROR,DATE_TIME\n123,4321,apns,,Sun Oct 11 2020 00:00:00 GMT+0300 (Moscow Standard Time)\n"
        );
      }
    );
  });
});
