import {
  getManager,
  EntityManager,
  getConnectionManager,
  getConnectionOptions,
  createConnection,
  Connection,
  getConnection,
} from "typeorm";

export const getEntityManager = async (): Promise<EntityManager> => {
  let connection: Connection;
  if (!getConnectionManager().has("default")) {
    const connectionOptions = await getConnectionOptions();
    connection = await createConnection(connectionOptions);
  } else {
    connection = getConnection();
  }

  return connection.createEntityManager();
};
