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
      <Status />
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

function Status() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data || !data.dependencies || !data.dependencies.database) {
    return <h2>Database: Carregando...</h2>;
  }

  const databaseVersionValue = data.dependencies.database.version;
  const databaseMaxConnectionsValue =
    data.dependencies.database.max_connections;
  const databaseOpenedConnectionsValue =
    data.dependencies.database.opened_connections;

  return (
    <div>
      <p>
        <h2>Database</h2>
      </p>
      <ul>
        <li>
          <strong>database version:</strong> {databaseVersionValue}
        </li>
        <li>
          <strong>max connections:</strong> {databaseMaxConnectionsValue}
        </li>
        <li>
          <strong>opened connections:</strong> {databaseOpenedConnectionsValue}
        </li>
      </ul>
    </div>
  );
}
