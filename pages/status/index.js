import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    const dbVersion = data.dependencies.database.version;
    const dbMaxConnections = data.dependencies.database.max_connections;
    const dbOpenedConnections = data.dependencies.database.opened_connections;

    databaseStatusInformation = (
      <>
        <li>
          <strong>version:</strong> {dbVersion}
        </li>
        <li>
          <strong>max connections:</strong> {dbMaxConnections}
        </li>
        <li>
          <strong>opened connections:</strong> {dbOpenedConnections}
        </li>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <ul>{databaseStatusInformation}</ul>
    </>
  );
}
