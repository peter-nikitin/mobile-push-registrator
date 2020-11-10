import registerTocken from "./controllers/registerTocken";
import dotenv from "dotenv";

import CSV from "./models/CSV";

dotenv.config();

const csv = new CSV("../../tockens.csv", "../../result.csv", 10000);

type CsvLine = {
  tocken: string;
};

console.log(new Date());

csv
  .read<CsvLine>(({ tocken }) => {
    return new Promise((resolve, reject) => {
      registerTocken(tocken)
        .then((result) => csv.write(result))
        .then(() => resolve())
        .catch((err) => {
          csv.write(err);
        });
    });
  })
  .then(() => console.log(new Date()));
