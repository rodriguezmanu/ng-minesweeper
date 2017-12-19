import { SettingsValues } from './models/game';
export const POSITIVE_DIGITS = /^\d*[1-9]\d*$/;
export const defaultOptions: SettingsValues = {
  mines: 10,
  rows: 10,
  columns: 10
};
