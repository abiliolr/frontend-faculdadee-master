import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/**
 * The root component of the application.
 *
 * @remarks
 * This component acts as the container for the entire application. It uses `RouterOutlet`
 * to display the content of the currently active route.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: []
})

export class AppComponent { 
  /**
   * The title of the application.
   */
  title = 'frontend-faculdadee';
}
