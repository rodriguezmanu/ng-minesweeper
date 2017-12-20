import { IMAGES } from './../app.constants';

export class Cell {
  private hasMine: boolean;
  private covered: boolean;
  private img: string;
  private empty: boolean;
  private isFlagged: boolean;

  constructor(
    private row: number,
    private column: number
  ) {
    this.covered = true;
    this.isFlagged = false;
    this.hasMine = false;
  }

  /**
   * get if cell contains mine
   *
   * @returns {boolean}
   * @memberof Cell
   */
  containsMine(): boolean {
    return this.hasMine;
  }

  /**
   * Get if cell is covered
   *
   * @returns {boolean}
   * @memberof Cell
   */
  isCovered(): boolean {
    return this.covered;
  }

  /**
   * Set uncovered cell
   *
   * @memberof Cell
   */
  setUnCovered(): void {
    this.covered = false;
  }

  /**
   * Set red mine
   *
   * @memberof Cell
   */
  setRedMine(): void {
    this.img = IMAGES.redMine;
  }

  /**
   * Set cell image
   *
   * @param {number} mines
   * @memberof Cell
   */
  setImage(mines: number): void {
    if (mines === 0) {
      this.img = IMAGES.empty;
    } else {
      this.img = `${IMAGES.numbers + mines}.png`;
    }
  }
  /**
   * Get cell image
   *
   * @returns {string}
   * @memberof Cell
   */
  getImage(): string {
    return this.img;
  }

  /**
   * Get cell row
   *
   * @returns {number}
   * @memberof Cell
   */
  getRow(): number {
    return this.row;
  }

  /**
   * Get cell column
   *
   * @returns {number}
   * @memberof Cell
   */
  getColumn(): number {
    return this.column;
  }

  /**
   * Set empty cell
   *
   * @param {boolean} empty
   * @memberof Cell
   */
  setEmpty(empty: boolean): void {
    this.empty = empty;
  }

  /**
   * Check empty cell
   *
   * @returns {boolean}
   * @memberof Cell
   */
  isEmpty(): boolean {
    return this.empty;
  }

  /**
   * Get flagged cell
   *
   * @returns {boolean}
   * @memberof Cell
   */
  getFlagged(): boolean {
    return this.isFlagged;
  }

  /**
   * Set flagged cell
   *
   * @param {boolean} value
   * @memberof Cell
   */
  setFlagged(value: boolean): void {
    this.isFlagged = value;
  }
}
