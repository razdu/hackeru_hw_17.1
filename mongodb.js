/**
 * insertOne / insertMany
 * @param { object } client MongoDB client object
 * @param { string } dbName Database Name
 * @param { string } collectionName Collection Name
 * @param { string } method find / insert / update / remove
 * @param { string } query The data content
 */
async function setDbData(client, dbName, collectionName, method, query) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const documents = db.collection(collectionName);

    let flag = await documents[method](query);
  } finally {
    await client.close();
  }
}
module.exports = { setDbData };
