import SQLite from "react-native-sqlite-storage";

const createDatabase = () => {
  SQLite.enablePromise(true);
  return SQLite.openDatabase({
    name: "wordsChallenge.db",
    location: "Documents",
  })
    .then((dbResult: any) => {
      if (dbResult && dbResult.dbname === "wordsChallenge.db") {
        console.log("Database opened:", dbResult);
        createTables();
      }
    })
    .catch((e) => {});
};

const createTables = () => {
  SQLite.openDatabase({
    name: "wordsChallenge.db",
    location: "Documents",
  }).then((resDb) => {
    resDb.transaction(function (tx) {
      tx.executeSql(
        `CREATE TABLE words(
            id       TEXT PRIMARY KEY  NOT NULL,
            en       TEXT  NOT NULL,
            tr       TEXT  NOT NULL,
            level    TEXT,
            learned  BOOLEAN
          );`,
        [],
        (tx, results) => {
          console.log("Tablo ", results);
        }
      );
    });
  });
};

const dropTable = () => {
  SQLite.openDatabase({
    name: "wordsChallenge.db",
    location: "Documents",
  }).then((resDb) => {
    resDb.transaction(function (tx) {
      tx.executeSql(`DROP TABLE words;`).then((res) =>
        console.log("Delete successful")
      );
    });
  });
};

export const DbSettings = {
  createDatabase: createDatabase,
  dropTable: dropTable,
};
