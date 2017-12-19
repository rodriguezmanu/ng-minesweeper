import { MapComponent } from './../map/map.component';
import { GameService } from './../../services/game.service';
import { SettingsService } from './../../services/settings.service';
import { POSITIVE_DIGITS } from './../../app.constants';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private settingsForm: FormGroup;
  private settingOn = false;
  private timer$: Observable<number>;
  private timerSubscription: Subscription;
  private stopWatch: number;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private gameService: GameService
  ) {
    this.timer$ = TimerObservable.create(0, 1000);

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
    this.stopWatch = 0;
    this.startTimer();
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
}
