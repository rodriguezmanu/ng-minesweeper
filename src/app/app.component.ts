import { MapComponent } from './components/map/map.component';
import { Component, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MapComponent) mapComponent: MapComponent;

  private startGame = false;

  /**
   * Alert confirmartion for reload or close tab
   *
   * @param {any} $event
   * @returns
   * @memberof AppComponent
   */
  // @HostListener('window:beforeunload', ['$event'])
  // function($event) {
  //   return ($event.returnValue = false);
  // }

  /**
   * On game event from setting component
   * @param event
   */
  onGame(event) {
    this.startGame = event;
    if (this.mapComponent) {
      this.mapComponent.init();
    }
  }
}
