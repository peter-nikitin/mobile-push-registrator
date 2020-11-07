import csv from "csv-parser";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

type HandleToken<T> = (token: T) => void;

type Sucess = {
  tocken: string;
  installationId: string;
  platform: "apns" | "gcm";
};

type Error = {
  tocken: string;
  error: string;
};

class CSV {
  input: NodeJS.ReadableStream;
  output: any;

  constructor(inputFilePath: string, outputFilePath: string) {
    this.input = fs.createReadStream(path.resolve(__dirname, inputFilePath));
    this.output = createObjectCsvWriter({
      path: path.resolve(__dirname, outputFilePath),
      header: [
        { id: "tocken", title: "TOKEN" },
        { id: "installationId", title: "INSTALLATOIN_ID" },
        { id: "platform", title: "PLATFORM" },
        { id: "error", title: "ERROR" },
      ],
    });
  }

  read<T>(handleToken: HandleToken<T>) {
    return new Promise((resolve, reject) => {
      this.input
        .pipe(csv())
        .on("data", handleToken)
        .on("end", () => resolve())
        .on("error", (err) => reject(err));
    });
  }

  write(data: Sucess | Error) {
    return this.output.writeRecords([data]);
  }
}

export default CSV;
