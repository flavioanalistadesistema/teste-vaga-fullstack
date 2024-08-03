const fs = require("fs");
const csvParser = require("csv-parser");
const { isValid } = require("../internals/documentValidators");
const { formatedCurrency } = require("../internals/currencyFormaters");

function processCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        results.forEach((item) => {
          const isCpfCnpj = isValid(item.nrCpfCnpj);
          const vlTotalFormated = formatedCurrency(item.vlTotal);
          const vlPrestaFormated = formatedCurrency(item.vlPresta);

          const qtPrestacoes = parseInt(item.qtPrestacoes, 10);
          const vlTotal = parseFloat(item.vlTotal);
          const vlPresta = parseFloat(item.vlPresta);

          const isValueValid =
            (vlTotal / qtPrestacoes).toFixed(2) === vlPresta.toFixed(2);

          console.log({
            isCpfCnpj,
            vlTotalFormated,
            vlPrestaFormated,
            isValueValid,
          });
        });

        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = { processCsv };
