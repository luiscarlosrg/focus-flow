import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter } from '@ionic/angular/standalone';
import { RouterLink   } from '@angular/router';
import { BottomNavigationComponent } from '../shared/bottom-navigation/bottom-navigation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, RouterLink, BottomNavigationComponent],
})
export class HomePage {
  constructor() {}
}
