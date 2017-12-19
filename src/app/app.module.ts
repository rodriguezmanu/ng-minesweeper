import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/setting.component';
import { MapComponent } from './components/map/map.component';
import { StatusDialogComponent } from './shared/status.dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { SettingsService } from './services/settings.service';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    MapComponent,
    StatusDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  providers: [
    SettingsService,
    GameService
  ],
  bootstrap: [AppComponent],
  entryComponents: [StatusDialogComponent]
})
export class AppModule {}
