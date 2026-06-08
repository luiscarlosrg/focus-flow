import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive   } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.html',
  styleUrls: ['./bottom-navigation.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class BottomNavigationComponent {}
