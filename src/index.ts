import registerTocken from "./controllers/registerTocken";
import dotenv from "dotenv";

import CSV from "./models/CSV";
dotenv.config();

const csv = new CSV(
  "../../__mocks__/mockTocken.csv",
  "../../__mocks__/mockResult.csv"
);

type CsvLine = {
  tocken: string;
};

csv.read<CsvLine>(({ tocken }) => {
  registerTocken(tocken)
    .then((result) => {
      csv.write(result);
    })
    .catch((err) => {
      csv.write(err);
    });
});
