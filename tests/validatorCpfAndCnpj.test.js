const { isValid } = require("../src/internals/documentValidators");
const {
  getFakeCpfValid,
  getFakeCpfInvalid,
  getFakeCnpjValid,
  getFakeCnpjInvalid,
} = require("./utils/fakesData");

describe("CPF/CNPJ Validator", () => {
  test("Testing valid CPF", () => {
    const validCpf = getFakeCpfValid();
    expect(isValid(validCpf)).toBe(true);
  });

  test("Testing invalid CPF", () => {
    const invalidCpf = getFakeCpfInvalid();
    expect(isValid(invalidCpf)).toBe(false);
  });

  test("Testing valid CNPJ", () => {
    const validCnpj = getFakeCnpjValid();
    expect(isValid(validCnpj)).toBe(true);
  });

  test("Testing invalid CNPJ", () => {
    const invalidCnpj = getFakeCnpjInvalid();
    expect(isValid(invalidCnpj)).toBe(false);
  });
});
