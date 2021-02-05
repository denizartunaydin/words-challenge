import SQLite from "react-native-sqlite-storage";
import { QuizService } from "../quiz/store/quiz.service";

const createDatabase = () => {
  return (dispatch: any) => {
    SQLite.enablePromise(true);
    return SQLite.openDatabase({
      name: "wordsChallenge.db",
      location: "Documents",
    })
      .then((dbResult: any) => {
        if (dbResult && dbResult.dbname === "wordsChallenge.db") {
          dispatch(createTables());
        }
      })
      .catch((e) => {});
  };
};

const createTables = () => {
  return (dispatch: any) => {
    SQLite.openDatabase({
      name: "wordsChallenge.db",
      location: "Documents",
    }).then((resDb) => {
      resDb.transaction(function (tx) {
        tx.executeSql(
          `CREATE TABLE words(
            id         TEXT PRIMARY KEY  NOT NULL,
            en         TEXT  NOT NULL,
            tr         TEXT  NOT NULL,
            level      TEXT,
            levelName  TEXT,
            levelColor TEXT,
            learned    BOOLEAN
            
          );`,
          [],
          (tx, results) => {
            console.log("Tablo ", results);
            dispatch(QuizService.saveAllWords());
          }
        );
      });
    });
  };
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
  createTables: createTables,
};
