export class Cell {
  private hasMine: boolean;
  private covered: boolean;
  private img: string;
  private empty: boolean;
  isFlagged: boolean;
  private mines: number;

  constructor(
    private row: number,
    private column: number
  ) {
    this.covered = true;
    this.isFlagged = false;
    this.hasMine = false;
  }
}
