export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export enum SurpriseType {
  NONE = 'NONE',
  TRIVIA = 'TRIVIA',
  POSTCARD = 'POSTCARD',
  SANTA_TRACKER = 'SANTA_TRACKER',
  CHRISTMAS_EVE = 'CHRISTMAS_EVE',
  CHRISTMAS_DAY = 'CHRISTMAS_DAY',
}