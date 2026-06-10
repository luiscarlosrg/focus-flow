import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BottomNavigationComponent } from '../shared/bottom-navigation/bottom-navigation';
import { ToastController } from '@ionic/angular';
import { IonToggle, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BottomNavigationComponent, IonToggle, IonSelect, IonSelectOption]
})
export class ProfilePage implements OnInit {
  userName = 'Juan Naranjo';
  userEmail = 'juan@email.com';

  constructor() { }

  ngOnInit() {
  }

}
