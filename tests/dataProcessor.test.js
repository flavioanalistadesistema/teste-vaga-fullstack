const fs = require("fs");
const { processCsv } = require("../src/services/processCsv");

jest.mock("fs");
jest.mock("csv-parser", () => {
  return jest.fn(() => ({
    on: jest.fn().mockImplementation(function (event, callback) {
      if (event === "data") {
        callback({
          nrCpfCnpj: "12345678909",
          vlTotal: "1234.56",
          vlPresta: "617.28",
          qtPrestacoes: "2",
        });
      } else if (event === "end") {
        callback();
      }
      return this;
    }),
  }));
});

describe("Data Processor", () => {
  beforeEach(() => {
    fs.createReadStream.mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        on: jest.fn((event, callback) => {
          if (event === "data") {
            callback({
              nrCpfCnpj: "12345678909",
              vlTotal: "1234.56",
              vlPresta: "617.28",
              qtPrestacoes: "2",
            });
          }
          if (event === "end") {
            callback();
          }
          return this;
        }),
      }),
    });
  });

  test("should process CSV data correctly", async () => {
    const mReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation(function (event, callback) {
        if (event === "data") {
          callback({
            nrCpfCnpj: "12345678909",
            vlTotal: "1234.56",
            vlPresta: "617.28",
            qtPrestacoes: "2",
          });
        } else if (event === "end") {
          callback();
        }
        return this;
      }),
    };

    fs.createReadStream.mockReturnValueOnce(mReadStream);
    const result = await processCsv("data.csv");
    expect(result).toEqual([
      {
        nrCpfCnpj: "12345678909",
        vlTotal: "1234.56",
        vlPresta: "617.28",
        qtPrestacoes: "2",
      },
    ]);

    expect(fs.createReadStream).toBeCalledTimes(1);
  });
});
