import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BottomNavigationComponent } from '../shared/bottom-navigation/bottom-navigation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BottomNavigationComponent]
})
export class ProfilePage implements OnInit {
  userName = 'Juan Naranjo';
  userEmail = 'juan@email.com';

  constructor(private router: Router) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userName = user.name || 'Usuario';
        this.userEmail = user.email || '';
      } catch (e) {
        // Fallback to defaults
      }
    }
  }

  cerrarSesion() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
