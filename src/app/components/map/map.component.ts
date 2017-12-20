import { GameService } from './../../services/game.service';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Cell } from './../../shared/cell';
import { MatDialog } from '@angular/material';
import { StatusDialogComponent } from '../../shared/status.dialog';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IMAGES } from '../../app.constants';

@Component({
  selector: 'app-map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private board;
  private mines: number;
  private minesCount: number;
  private uncoveredCells: number;
  private disableAll: boolean;
  private timer$: Observable<number>;
  private timerSubscription: Subscription;
  private stopWatch: number;

  constructor(
    private gameService: GameService,
    private settingsService: SettingsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activate();
  }

  /**
   *
   *
   * @memberof MapComponent
   */
  activate(): void {
    this.board = this.gameService.getBoard();
    this.disableAll = this.gameService.getStatusGame();
    this.mines = this.settingsService.mines;
    this.setCellsImage();

    this.timer$ = TimerObservable.create(0, 1000);
    this.stopWatch = 0;
    this.startTimer();

    this.minesCount = 0;
    this.uncoveredCells = 0;
  }

  /**
   * Set timer
   *
   * @memberof SettingsComponent
   */
  startTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = this.timer$.subscribe(i => (this.stopWatch = i));
  }

  /**
   * Open cell from view
   *
   * @param {Cell} cell
   * @memberof MapComponent
   */
  openCell(cell: Cell): void {
    this.uncoverCell(cell);

    if (cell.containsMine()) {
      this.lostGame(cell);
    } else {
      this.handlerEmptyCells(cell);
      if (this.hasWonGame()) {
        this.gameWon();
      }
    }
  }

  /**
   * Handler cell icons images
   *
   * @param {Cell} cell
   * @returns {string}
   * @memberof MapComponent
   */
  handlerCell(cell: Cell): string {
    if (this.hasWonGame()) {
      return cell.getImage();
    } else if (cell.getFlagged()) {
      return IMAGES.flag;
    } else {
      return IMAGES.covered;
    }
  }

  /**
   *
   *
   * @memberof MapComponent
   */
  setCellsImage(): void {
    this.board.forEach((row: Array<Cell>) => {
      row.filter((cell: Cell) => !cell.containsMine()).map((cell: Cell) => {
        const adjacentMinesCount: number = this.countAdjacentMines(cell);
        cell.setEmpty(adjacentMinesCount === 0);
        cell.setImage(adjacentMinesCount);
      });
    });
  }

  /**
   * Count neighbors mines
   *
   * @param {Cell} cell
   * @returns {number}
   * @memberof MapComponent
   */
  countAdjacentMines(cell: Cell): number {
    let count = 0;

    const incrementMineCount: (cell: Cell) => void = (cell?: Cell): void => {
      if (cell && cell.containsMine()) {
        count++;
      }
    };

    this.iterateOnAdjacentCells(
      cell.getRow(),
      cell.getColumn(),
      incrementMineCount
    );

    return count;
  }

  /**
   * Lost game handler
   *
   * @param {Cell} cell
   * @memberof MapComponent
   */
  lostGame(cell: Cell): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '250px',
      data: {
        text: 'Game over'
      }
    });

    this.setMinesOnBoard();
    cell.setRedMine();
    this.finishGame();
  }

  /**
   * Game won handler
   *
   * @memberof MapComponent
   */
  gameWon(): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '250px',
      data: {
        text: 'You have won'
      }
    });
    this.setMinesOnBoard();
    this.finishGame();
  }

  /**
   * Set Mines images icons on all board
   *
   * @memberof MapComponent
   */
  setMinesOnBoard(): void {
    for (let row = 0; row < this.settingsService.rows; row++) {
      for (let column = 0; column < this.settingsService.columns; column++) {
        const item = this.board[row][column];
        if (item.hasMine) {
          item.img = IMAGES.mine;
        }
      }
    }
  }

  /**
   * Set states for finish game
   *
   * @memberof MapComponent
   */
  finishGame() {
    this.gameService.setGameOver();
    this.disableAll = true;
    this.timerSubscription.unsubscribe();
  }

  /**
   * Handler empty cells
   *
   * @param {Cell} cell
   * @memberof MapComponent
   */
  handlerEmptyCells(cell: Cell): void {
    this.iterateOnAdjacentCells(
      cell.getRow(),
      cell.getColumn(),
      this.uncoverEmptyCell.bind(this)
    );
  }

  /**
   * itenerate between neighbors cells
   *
   * @param {number} row
   * @param {number} column
   * @param {(cell: Cell) => void} callBack
   * @memberof MapComponent
   */
  iterateOnAdjacentCells(
    row: number,
    column: number,
    callBack: (cell: Cell) => void
  ): void {
    const neighbors = [-1, 0, 1];
    neighbors.forEach(i => {
      neighbors
        .filter(j => i !== 0 || j !== 0)
        .map(j => {
          return this.getCell(row + i, column + j);
        })
        .forEach(callBack);
    });
  }

  /**
   * Get Cell
   *
   * @param {number} row
   * @param {number} column
   * @returns {Cell}
   * @memberof MapComponent
   */
  getCell(row: number, column: number): Cell {
    return this.board[row] ? this.board[row][column] : null;
  }

  /**
   * Handler empty uncovered cells
   *
   * @param {Cell} cell
   * @memberof MapComponent
   */
  uncoverEmptyCell(cell: Cell): void {
    if (cell && cell.isCovered()) {
      if (!cell.containsMine()) {
        this.uncoverCell(cell);
      }
      if (cell.isEmpty()) {
        this.handlerEmptyCells(cell);
      }
    }
  }

  /**
   * Handler uncovered cell and increment it
   *
   * @param {Cell} cell
   * @memberof MapComponent
   */
  uncoverCell(cell: Cell): void {
    cell.setUnCovered();
    this.uncoveredCells++;
  }

  /**
   * Has won this game
   *
   * @returns
   * @memberof MapComponent
   */
  hasWonGame(): boolean {
    return (
      this.settingsService.rows * this.settingsService.columns -
        this.uncoveredCells ===
      this.mines
    );
  }

  /**
   * Check flagged icon
   *
   * @param {Cell} cell
   * @memberof MapComponent
   */
  checkFlagged(cell: Cell): void {
    if (!this.disableAll) {
      cell.setFlagged(!cell.getFlagged());
    }
  }
}
