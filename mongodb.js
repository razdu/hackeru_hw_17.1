/**
 *
 * @param { MongoDB Obj } client MongoDB client object
 * @param { string } dbName Database Name
 * @param { string } collectionName Collection Name
 * @param { string } method find / insert / update / remove
 * @param { string } query The data content
 */
async function getDbData(client, dbName, collectionName, method, query) {
  try {
    await client.connect();
    const database = client.db(dbName);
    const documents = database.collection(collectionName);

    const data = await documents[method](query);
    console.log(data);
  } finally {
    await client.close();
  }
}
module.exports = { getDbData };
