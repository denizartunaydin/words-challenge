import { Guid } from "guid-typescript";
import SQLite from "react-native-sqlite-storage";
import { from, identity } from "rxjs";
import { map, take } from "rxjs/operators";
import { advanced } from "../../../words/advanced";
import { beginner } from "../../../words/beginner";
import { elementary } from "../../../words/elementary";
import { intermediate } from "../../../words/intermediate";
import { preIntermediate } from "../../../words/pre-intermediate";
import { upperIntermediate } from "../../../words/upper-intermediate";
import { setData, setLevelCount } from "./quiz.action";

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
                "INSERT INTO words (id,en,tr,level,levelName,levelColor,learned) VALUES  (:id,:en,:tr,:level,:levelName,:levelColor,:learned)",
                [id.value, res.en, res.tr, "A1", "Beginner", "#AFA2F9", false]
              );
            });

            elementary.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,levelName,levelColor,learned) VALUES  (:id,:en,:tr,:level,:levelName,:levelColor,:learned)",
                [id.value, res.en, res.tr, "A2", "Elementary", "#17B8DA", false]
              );
            });

            preIntermediate.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,levelName,levelColor,learned) VALUES  (:id,:en,:tr,:level,:levelName,:levelColor,:learned)",
                [
                  id.value,
                  res.en,
                  res.tr,
                  "B1",
                  "Pre-Intermediate",
                  "#BBCD2B",
                  false,
                ]
              );
            });

            intermediate.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,levelName,levelColor,learned) VALUES  (:id,:en,:tr,:level,:levelName,:levelColor,:learned)",
                [
                  id.value,
                  res.en,
                  res.tr,
                  "B2",
                  "Intermediate",
                  "#f6cd61",
                  false,
                ]
              );
            });

            upperIntermediate.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,levelName,levelColor,learned) VALUES  (:id,:en,:tr,:level,:levelName,:levelColor,:learned)",
                [
                  id.value,
                  res.en,
                  res.tr,
                  "C1",
                  "Upper-Indermediate",
                  "#fe8a71",
                  false,
                ]
              );
            });

            advanced.map((res) => {
              const id: any = Guid.create();
              tx.executeSql(
                "INSERT INTO words (id,en,tr,level,levelName,levelColor,learned) VALUES  (:id,:en,:tr,:level,:levelName,:levelColor,:learned)",
                [id.value, res.en, res.tr, "C2", "Advanced", "#E770D4", false]
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
//select level,Count(*) as 'LearnedCount', levelName from words where learned = 0 GROUP BY level;

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
                `select level,Count(*) as 'totalWordCount',levelName,sum(learned) as 'learnedCount',levelColor from words GROUP BY level;`
              )
              .then((result: any) => {
                if (result && result[1].rows) {
                  let selectItems = [];
                  for (let index = 0; index < result[1].rows.length; index++) {
                    const element = result[1].rows.item(index);
                    selectItems.push(element);
                  }
                  dispatch(setLevelCount(selectItems));
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
