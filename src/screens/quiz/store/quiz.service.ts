import { Guid } from "guid-typescript";
import SQLite from "react-native-sqlite-storage";
import { from, identity } from "rxjs";
import { map, take } from "rxjs/operators";
import { beginner } from "../../../words/beginner";
import { elementary } from "../../../words/elementary";
import { setData } from "./quiz.action";

const saveAllWords = () => {
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
            beginner.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,learned) VALUES  (:id,:en,:tr,:level,:learned)",
                [id.value, res.en, res.tr, "A1", false]
              );
            });

            elementary.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,learned) VALUES  (:id,:en,:tr,:level,:learned)",
                [id.value, res.en, res.tr, "A2", false]
              );
            });
          });
        })
      )
      .toPromise();
  };
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
                if (result[1].rows.length === 0) {
                  console.log("gggggggggg");
                  return dispatch(QuizService.saveAllWords());
                } else if (result && result[1].rows) {
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

const getDayWords = (level: string, learned: number) => {
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
              .executeSql(
                `SELECT * FROM words
                  where level = '${level}' and learned = ${learned}
                  ORDER BY random() 
                  LIMIT 2;`
              )
              .then((result: any) => {
                if (result && result[1].rows) {
                  let selectItems = [];
                  for (let index = 0; index < result[1].rows.length; index++) {
                    const element = result[1].rows.item(index);
                    selectItems.push(element);
                  }

                  if (getRandomInt(100) % 2 === 0) {
                    return dispatch(
                      setData({
                        selectWordEng: selectItems[0].en,
                        selectWordTr: selectItems[0].tr,
                        choiceOne: selectItems[0].tr,
                        choiceTwo: selectItems[1].tr,
                      })
                    );
                  } else {
                    return dispatch(
                      setData({
                        selectWordEng: selectItems[0].en,
                        selectWordTr: selectItems[0].tr,
                        choiceOne: selectItems[1].tr,
                        choiceTwo: selectItems[0].tr,
                      })
                    );
                  }
                }
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

const getCategoryWords = (level: string) => {
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
              .executeSql(`select * from words where level = '${level}';`)
              .then((result: any) => {
                if (result && result[1].rows) {
                  let selectItems = [];
                  for (let index = 0; index < result[1].rows.length; index++) {
                    const element = result[1].rows.item(index);
                    selectItems.push(element);
                  }
                  console.log("Category", selectItems);
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

const learnWord = (word: string) => {
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
              .executeSql(
                `UPDATE words set learned = 1
                 where en = '${word}';`
              )
              .then((result: any) => {})
              .catch((e) => {
                console.log(e);
              });
          });
        })
      )
      .toPromise();
  };
};

const learnLevelCount = () => {
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
              .executeSql(
                `select level ,Count(*) as 'LearnedCount' from words where learned = 1 GROUP BY level;`
              )
              .then((result: any) => {
                if (result && result[1].rows) {
                  let selectItems = [];
                  for (let index = 0; index < result[1].rows.length; index++) {
                    const element = result[1].rows.item(index);
                    selectItems.push(element);
                  }
                  console.log("learnLevelCount", selectItems);
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

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const QuizService = {
  saveAllWords: saveAllWords,
  getAllWords: getAllWords,
  getCategoryWords: getCategoryWords,
  getDayWords: getDayWords,
  learnWord: learnWord,
  learnLevelCount: learnLevelCount,
};
