import { MapComponent } from './../map/map.component';
import { GameService } from './../../services/game.service';
import { SettingsService } from './../../services/settings.service';
import { POSITIVE_DIGITS } from './../../app.constants';
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @Output() onStartGame: EventEmitter<any> = new EventEmitter();

  settingsForm: FormGroup;
  settingOn = false;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private gameService: GameService
  ) {
    this.settingsForm = formBuilder.group({
      columns: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(POSITIVE_DIGITS)
        ])
      ],
      rows: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(POSITIVE_DIGITS)
        ])
      ],
      mines: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(POSITIVE_DIGITS)
        ])
      ]
    });
  }

  /**
   * Start a new game
   *
   * @memberof SettingsComponent
   */
  newGame(): void {
    this.gameService.startNewGame();
    this.onStartGame.emit(true);
  }

  /**
   * Set Options for new game
   *
   * @memberof SettingsComponent
   */
  setOptions(): void {
    this.settingsService.mines = this.settingsForm.value.mines;
    this.settingsService.rows = this.settingsForm.value.rows;
    this.settingsService.columns = this.settingsForm.value.columns;

    this.newGame();
  }
}
