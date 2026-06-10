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

  // Profile Edit State
  editando = false;
  perfil = {
    nombre: 'Juan David Naranjo',
    email: 'juan@email.com',
    fechaNacimiento: '1998-05-15',
    ciclo: 1
  };

  // Settings State
  notificaciones = true;
  tema = 'Claro';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarPreferencias();
  }

  cargarUsuario() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userName = user.name || 'Juan Naranjo';
        this.userEmail = user.email || 'juan@email.com';
        
        this.perfil.nombre = this.userName;
        this.perfil.email = this.userEmail;
      } catch (e) {
        // Fallback to default values
      }
    }

    const savedPerfil = localStorage.getItem('userProfile');
    if (savedPerfil) {
      try {
        this.perfil = JSON.parse(savedPerfil);
        this.userName = this.perfil.nombre;
        this.userEmail = this.perfil.email;
      } catch (e) {}
    }
  }

  async guardarPerfil() {
    this.userName = this.perfil.nombre;
    this.userEmail = this.perfil.email;
    localStorage.setItem('userProfile', JSON.stringify(this.perfil));

    // Update current active session
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.name = this.perfil.nombre;
        user.email = this.perfil.email;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } catch (e) {}
    }

    this.editando = false;

    const toast = await this.toastController.create({
      message: 'Perfil guardado correctamente',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  cargarPreferencias() {
    const notif = localStorage.getItem('preferencias_notificaciones');
    if (notif !== null) {
      this.notificaciones = notif === 'true';
    }
    const theme = localStorage.getItem('preferencias_tema');
    if (theme !== null) {
      this.tema = theme;
    }
  }

  async guardarPreferencias() {
    localStorage.setItem('preferencias_notificaciones', String(this.notificaciones));
    localStorage.setItem('preferencias_tema', this.tema);

    const toast = await this.toastController.create({
      message: 'Preferencias guardadas correctamente',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  cerrarSesion() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
