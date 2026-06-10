import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonIcon,
    CommonModule, 
    FormsModule
  ]
})
export class LoginPage implements OnInit {
  isLoginMode = true;
  showPassword = false;

  // Form Fields
  name = '';
  email = '';
  password = '';

  // Feedback Messages
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {
    // Register IonIcons for standalone usage
    addIcons({ mailOutline, lockClosedOutline, personOutline, eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
    // If user is already logged in, redirect to home
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/home']);
    }

    // Initialize mock database if empty
    const users = localStorage.getItem('users');
    if (!users) {
      const defaultUsers = [
        {
          name: 'Juan David Naranjo',
          email: 'juan@email.com',
          password: 'password123'
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.name = '';
    this.email = '';
    this.password = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isLoginMode) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  private handleLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    const usersStr = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersStr);

    const user = users.find((u: any) => u.email.toLowerCase() === this.email.toLowerCase());

    if (!user) {
      this.errorMessage = 'El correo electrónico no está registrado.';
      return;
    }

    if (user.password !== this.password) {
      this.errorMessage = 'Contraseña incorrecta.';
      return;
    }

    // Set current user session
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    this.successMessage = '¡Inicio de sesión exitoso! Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1200);
  }

  private handleRegister() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const usersStr = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersStr);

    const emailExists = users.some((u: any) => u.email.toLowerCase() === this.email.toLowerCase());

    if (emailExists) {
      this.errorMessage = 'El correo electrónico ya está registrado.';
      return;
    }

    // Save new user
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log in automatically
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    this.successMessage = '¡Cuenta creada con éxito! Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1200);
  }

  loginWithGoogle() {
    this.errorMessage = '';
    this.successMessage = '¡Inicio de sesión con Google exitoso! Redirigiendo...';

    const googleUser = {
      name: 'Usuario Google',
      email: 'google@email.com',
      password: ''
    };

    localStorage.setItem('currentUser', JSON.stringify(googleUser));

    // Save to users database if not exists
    const usersStr = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersStr);
    const exists = users.some((u: any) => u.email === googleUser.email);
    if (!exists) {
      users.push(googleUser);
      localStorage.setItem('users', JSON.stringify(users));
    }

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1200);
  }
}
