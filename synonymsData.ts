
import { DailyQuestion } from './types';

// Aukerak nahasteko laguntzailea
const shuffleOptions = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

let questionIdCounter = 0;

// Define an explicit interface for the raw data structure
interface RawSynonymEntry {
  targetWord: string;
  correctSynonym: string;
  optionsWithCorrect: string[];
}

// Sinonimoen datu gordinak. Ziurtatu 'correctSynonym' 'optionsWithCorrect' barruan dagoela.
const rawSynonymData: RawSynonymEntry[] = [
  { targetWord: "etxe", correctSynonym: "bizileku", optionsWithCorrect: ["bizileku", "autoa", "eskola"] },
  { targetWord: "poz", correctSynonym: "alaitasun", optionsWithCorrect: ["alaitasun", "tristura", "haserre"] },
  { targetWord: "handi", correctSynonym: "zabal", optionsWithCorrect: ["zabal", "txiki", "estu"] },
  { targetWord: "eder", correctSynonym: "polit", optionsWithCorrect: ["polit", "itsusi", "zatar"] },
  { targetWord: "azkar", correctSynonym: "arin", optionsWithCorrect: ["arin", "motel", "geldo"] },
  { targetWord: "lagun", correctSynonym: "adiskide", optionsWithCorrect: ["adiskide", "etsai", "ezezagun"] },
  { targetWord: "jan", correctSynonym: "irentsi", optionsWithCorrect: ["irentsi", "edan", "lo egin"] },
  { targetWord: "txakur", correctSynonym: "zakur", optionsWithCorrect: ["zakur", "katu", "ardi"] },
  { targetWord: "hitz egin", correctSynonym: "mintzatu", optionsWithCorrect: ["mintzatu", "isildu", "entzun"] },
  { targetWord: "begiratu", correctSynonym: "so egin", optionsWithCorrect: ["so egin", "ikusi", "ezkutatu"] },
  { targetWord: "bide", correctSynonym: "errepide", optionsWithCorrect: ["errepide", "bidezidor", "itsaso"] },
  { targetWord: "indartsu", correctSynonym: "gogor", optionsWithCorrect: ["gogor", "ahul", "bigun"] },
  { targetWord: "hasiera", correctSynonym: "printzipio", optionsWithCorrect: ["printzipio", "amaiera", "erdigune"] },
  { targetWord: "negar", correctSynonym: "malkoak isuri", optionsWithCorrect: ["malkoak isuri", "barre egin", "kantu egin"] },
  { targetWord: "gura", correctSynonym: "nahi", optionsWithCorrect: ["nahi", "behar", "gorroto"] },
  { targetWord: "auto", correctSynonym: "ibilgailu", optionsWithCorrect: ["ibilgailu", "bizikleta", "hegazkin"] },
  { targetWord: "mendia", correctSynonym: "gaina", optionsWithCorrect: ["gaina", "harana", "itsasoa"] },
  { targetWord: "lana", correctSynonym: "behar", optionsWithCorrect: ["behar", "jolas", "atseden"] },
  { targetWord: "musika", correctSynonym: "doinu", optionsWithCorrect: ["doinu", "zarata", "isiltasun"] },
  { targetWord: "argi", correctSynonym: "distira", optionsWithCorrect: ["distira", "iluntasun", "itzal"] }
];

export const getAllPredefinedQuestions = (): DailyQuestion[] => {
  questionIdCounter = 0; // Reset counter each time to maintain consistent IDs if list is static
  return rawSynonymData.map(item => ({
    id: `pd_q_${questionIdCounter++}`, // pd for predefined
    targetWord: item.targetWord,
    correctSynonym: item.correctSynonym,
    // Ziurtatu correctSynonym beti aukeren artean dagoela nahastu aurretik
    options: shuffleOptions(
        item.optionsWithCorrect.includes(item.correctSynonym) ?
        [...item.optionsWithCorrect] :
        [...item.optionsWithCorrect.slice(0,2), item.correctSynonym]
      ).slice(0,3) // Berriro ziurtatu 3 aukera bakarrik daudela
  }));
};
