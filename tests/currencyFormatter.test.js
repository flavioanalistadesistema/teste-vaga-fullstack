const { formatedCurrency } = require("../src/internals/currencyFormaters");
const { DataFakes } = require("./utils/dataFakes");

test("Testing currency formatting", () => {
  const values = [1000, 1000.5];
  const expectedValues = ["R$ 1.000,00", "R$ 1.000,50"];
  const formattedValues = values.map(formatedCurrency);

  expect(formattedValues).toEqual(expectedValues);
});
