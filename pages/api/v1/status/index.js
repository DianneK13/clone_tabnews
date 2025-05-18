import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // SOLUÇÃO DO DESCHAMPS //
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxconnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxconnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;", 
    values: [databaseName]
  });
  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;

  console.log(databaseOpenedConnectionsValue);

  // MINHA SOLUÇÃO //
  //const pgVersionResult = await database.query("SHOW server_version;");
  //const maxConnectionsResult = await database.query("SHOW max_connections;");
  //const usedConnectionsResult = await database.query("SELECT COUNT(*) FROM pg_stat_activity;");

  //const version = pgVersionResult.rows[0].server_version;
  //const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);
  //const usedConnections = parseInt(usedConnectionsResult.rows[0].count);

  response.status(200).json({
    updated_at: updatedAt,

    //postgres_version: version,
    //max_connections: maxConnections,
    //used_connections: usedConnections,

    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
