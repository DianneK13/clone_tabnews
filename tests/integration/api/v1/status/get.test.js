test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);

  //const pgVersion = responseBody.dependencies.database.postgres_version;
  //expect(pgVersion).toBeDefined();
  //expect(pgVersion).not.toBeNull();
  //expect(typeof pgVersion).toBe('string');
  //expect(pgVersion).toEqual('16.0');

  //const maxConnections = responseBody.max_connections;
  //expect(maxConnections).toBeDefined;
  //expect(maxConnections).not.toBeNull;
  //expect(typeof maxConnections).toBe('number');
  //console.log(maxConnections);

  //const usedConnections = responseBody.used_connections;
  //expect(usedConnections).toBeDefined;
  //expect(usedConnections).not.toBeNull;
  //expect(usedConnections).toBeLessThanOrEqual(maxConnections);
  //expect(typeof usedConnections).toBe('number');
  //console.log(usedConnections);
});

