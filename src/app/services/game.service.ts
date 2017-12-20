import { Cell } from './../shared/cell';
import { SettingsService } from './settings.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  private board = [];
  private statusGame =  true;

  constructor(private settingsService: SettingsService) {
  }

  /**
   * Start new game
   *
   * @memberof GameService
   */
  startNewGame(): void {
    this.buildMap();
    this.statusGame = false;
  }

  /**
   * Generate new map from settings
   *
   * @memberof GameService
   */
  buildMap(): void {
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
  addMines(): void {
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

  /**
   * Setting status
   *
   * @memberof GameService
   */
  setGameOver(): void {
    this.statusGame = true;
  }

  /**
   * Get board map
   *
   * @returns array
   * @memberof GameService
   */
  getBoard(): Cell[][] {
    return this.board;
  }

  /**
   * get game status
   *
   * @returns {boolean}
   * @memberof GameService
   */
  getStatusGame(): boolean {
    return this.statusGame;
  }
}
