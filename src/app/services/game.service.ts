import { Cell } from './../shared/cell';
import { SettingsService } from './settings.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  board = [];

  constructor(private settingsService: SettingsService) {
  }

  /**
   *
   *
   * @memberof GameService
   */
  startNewGame() {
    this.buildMap();
  }

  /**
   *
   *
   * @memberof GameService
   */
  buildMap() {
    for (let row = 0; row < this.settingsService.rows; row++) {
      this.board[row] = [];
      for (let column = 0; column < this.settingsService.columns; column++) {
        const cell = new Cell(row, column);
        this.board[row][column] = cell;
      }
    }

    this.addMines();
  }

  /**
   * Add mines to cells
   *
   * @memberof GameService
   */
  addMines() {
    let placed = 0;

    do {
      const r = Math.floor(Math.random() * this.settingsService.rows);
      const c = Math.floor(Math.random() * this.settingsService.columns);
      if (this.board[r][c].hasMine === false) {
        this.board[r][c].hasMine = true;
        placed++;
      }
    } while (placed < this.settingsService.mines);
  }
}
