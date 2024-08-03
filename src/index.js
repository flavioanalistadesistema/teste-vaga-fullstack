const { processCsv } = require("./services/processCsv");

const filePath = "./data.csv";

processCsv(filePath)
  .then(() => {
    console.log("Concluído com sucesso!");
  })
  .catch((error) => {
    console.error("Erro no processamento:", error);
  });
