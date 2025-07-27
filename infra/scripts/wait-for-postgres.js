const { exec } = require("node:child_process");

let spinner = ["/ ", "- ", "\\ ", "| "];
let i = 0;
let awaitingMessage = "\n\n🔴 Aguardando Postgres aceitar conexões";

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.cursorTo(awaitingMessage.length + 1);
      process.stdout.write(`${spinner[i++ % spinner.length]}`);
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write(awaitingMessage);
checkPostgres();
