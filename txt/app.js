//Non-blocking file reading

const { readFile, read, writeFile } = require("fs");
readFile("./start.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  readFile(`./${data}.txt`, "utf-8", (err, data2) => {
    if (err2) {
      console.log(err2);
      return;
    }
    readFile("./append.txt", "utf-8", (err, data3) => {
         
      console.log(data2 + data3);
      writeFile("./output.txt", `${data2} \n ${data3}`, "utf-8", (err) => {
        console.log("File Written");
      });
    });
  });
});
console.log("Will Read");
