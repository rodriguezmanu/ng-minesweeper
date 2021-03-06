import { defaultOptions } from './../app.constants';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  private _mines: number;
  private _rows: number;
  private _columns: number;

  constructor() {
    this._mines = defaultOptions.mines;
    this._rows = defaultOptions.rows;
    this._columns = defaultOptions.columns;
  }

  get mines(): number {
    return Number(this._mines);
  }

  set mines(value: number) {
    this._mines = value;
  }

  get rows(): number {
    return Number(this._rows);
  }

  set rows(value: number) {
    this._rows = value;
  }

  get columns(): number {
    return Number(this._columns);
  }

  set columns(value: number) {
    this._columns = value;
  }
}
