import csv from "csv-parser";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import readline from "readline";

type HandleToken<T> = (token: T) => void;

export type Sucess = {
  tocken: string;
  installationId: string;
  platform: "apns" | "gcm";
  date: Date;
};

export type Error = {
  tocken: string;
  error: string;
  date: Date;
};

export type CsvLine = {
  tocken: string;
};

class CSV {
  input: NodeJS.ReadableStream;
  output: any;
  currentRow: number;

  constructor(inputFilePath: string, outputFilePath: string) {
    this.input = fs.createReadStream(path.resolve(__dirname, inputFilePath));
    this.currentRow = 0;
    this.output = createObjectCsvWriter({
      path: path.resolve(__dirname, outputFilePath),
      header: [
        { id: "tocken", title: "TOKEN" },
        { id: "installationId", title: "INSTALLATOIN_ID" },
        { id: "platform", title: "PLATFORM" },
        { id: "error", title: "ERROR" },
        { id: "date", title: "DATE_TIME" },
      ],
    });
  }

  wait(seconds: number, maxRow: number) {
    if (this.currentRow === maxRow) {
      console.log(this.currentRow);

      this.input.pause();
      setTimeout(() => {
        // this.currentRow = 0;
        this.input.resume();
      }, seconds * 1000);
    }
  }

  read<T>(handleToken: HandleToken<T>) {
    return new Promise((resolve, reject) => {
      this.input
        .pipe(csv())
        .on("data", async (data) => {
          this.input.pause();

          this.currentRow += 1;
          // this.wait(5, 100);
          await handleToken(data);
          this.input.resume();

          return true;
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (err) => reject(err));
    });
  }

  write(data: Sucess | Error) {
    return this.output.writeRecords([data]);
  }
}

export default CSV;
