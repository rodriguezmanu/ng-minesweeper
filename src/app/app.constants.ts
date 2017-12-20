import { SettingsValues } from './models/game';

export const POSITIVE_DIGITS = /^\d*[1-9]\d*$/;
export const defaultOptions: SettingsValues = {
  mines: 10,
  rows: 10,
  columns: 10
};
export const IMAGES = {
  flag: './../../assets/flag.png',
  covered: './../../assets/covered.png',
  mine: './../../assets/mine.png',
  redMine: './../../assets/red-mine.png',
  empty: './../../assets/empty.png',
  numbers: './../../assets/number-'
};
