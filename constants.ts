
export const DAILY_FETCH_HOUR = 8; // 8:00 AM
export const NUM_QUESTIONS_TO_GENERATE = 5;

export const LOCALSTORAGE_QUESTIONS_KEY = 'dailySynonymGame_data_v5'; // Bertsioa eguneratuta
export const SCORE_TO_PASS_LEVEL = 3; 

// Puntuazio berriaren konstanteak
export const MAX_TOTAL_GAME_SCORE = 100; // Jokoaren puntuazio maximo totala
export const BASE_SCORE_CORRECT_ANSWER = MAX_TOTAL_GAME_SCORE / NUM_QUESTIONS_TO_GENERATE; // Puntuazio maximoa galdera bakoitzeko (adib. 100 puntu total / 5 galdera = 20)
export const PERFECT_TIME_THRESHOLD_MS = 1000; // 1 segundo (milisegundotan) puntuazio maximoa lortzeko
export const PENALTY_PER_INTERVAL = BASE_SCORE_CORRECT_ANSWER * 0.01; // Puntu kenketa tarte bakoitzeko (adib. 20 puntu * %1 = 0.2)
export const MS_PER_PENALTY_INTERVAL = 100; // Penalizazio tartea milisegundotan (0.1s)