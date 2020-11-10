import * as csv from "fast-csv";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import cliProgress from "cli-progress";

type HandleToken<T> = (token: T) => Promise<{}>;

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
  progress: cliProgress.SingleBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  totalLength: number;

  constructor(
    inputFilePath: string,
    outputFilePath: string,
    totalLength: number
  ) {
    this.input = fs.createReadStream(path.resolve(__dirname, inputFilePath), {
      highWaterMark: 64,
    });
    this.currentRow = 0;
    this.output = createObjectCsvWriter({
      path: path.resolve(__dirname, outputFilePath),
      header: [
        { id: "tocken", title: "TOKEN" },
        { id: "installationId", title: "INSTALLATION_ID" },
        { id: "platform", title: "PLATFORM" },
        { id: "error", title: "ERROR" },
        { id: "date", title: "DATE_TIME" },
      ],
    });
    this.totalLength = totalLength;
  }

  wait(seconds: number, maxRow: number) {
    return new Promise((resolve, reject) => {
      if (this.currentRow === maxRow) {
        this.input.pause();
        setTimeout(() => {
          this.currentRow = 0;
          // this.input.resume();
          resolve();
        }, seconds * 1000);
      } else {
        resolve();
      }
    });
  }

  read<T>(handleToken: HandleToken<T>) {
    return new Promise((resolve, reject) => {
      this.progress.start(this.totalLength, 0);
      this.input
        .pipe(csv.parse({ headers: true }))
        .on("data", (data) => {
          this.input.pause();

          this.currentRow += 1;
          // console.log(this.currentRow);

          // console.log(data);
          this.wait(2, 250)
            // .then(() => handleToken(data))
            .then(() => {
              this.input.resume();
              this.progress.increment();
            });

          handleToken(data);
          return true;
        })
        .on("end", () => {
          this.progress.stop();
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
