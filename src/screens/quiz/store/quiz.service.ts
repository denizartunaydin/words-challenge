import { Guid } from "guid-typescript";
import SQLite from "react-native-sqlite-storage";
import { from } from "rxjs";
import { map, take } from "rxjs/operators";
import { beginner } from "../../../words/beginner";

const saveAllWords = () => {
  SQLite.openDatabase({
    name: "wordsChallenge.db",
    location: "Documents",
  }).then((resDb) => {
    resDb.transaction(function (tx) {
      beginner.map((res) => {
        const id: any = Guid.create();

        tx.executeSql(
          `INSERT INTO words VALUES ('${id.value}', '${res.en}', '${res.tr}', '');`,
          [],
          (tx, results) => {}
        );
      });
    });
  });
};

const getAllWords = () => {
  return (dispatch: any) => {
    return from(
      SQLite.openDatabase({
        name: "wordsChallenge.db",
        location: "Documents",
      })
    )
      .pipe(
        map((resDb) => {
          return resDb.transaction(function (tx) {
            return tx
              .executeSql(`select * from words;`)
              .then((result: any) => {
                if (result && result[1].rows) {
                  let selectItems = [];
                  for (let index = 0; index < result[1].rows.length; index++) {
                    const element = result[1].rows.item(index);
                    selectItems.push(element);
                  }
                  console.log(selectItems);
                }

                return result;
              })
              .catch((e) => {
                console.log(e);
              });
          });
        })
      )
      .toPromise();
  };
};

const getDayWords = () => {};

const getCategoryDetail = () => {};

export const QuizService = {
  saveAllWords: saveAllWords,
  getAllWords: getAllWords,
};
