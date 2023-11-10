import { Routes } from '@angular/router';
import {authGuard, publicGuard} from './core/guards';

// @ts-ignore
export const routes: Routes =[
  {
    path:'',
    canActivate: [authGuard],
    loadComponent:() => import('./pages/home/home.component'),
  },

  {
    path:'auth',
    canActivate: [publicGuard],
    children:[
      {
        path: 'sign-up',
        loadComponent:() =>  import('./pages/auth/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        loadComponent: () =>  import('./pages/auth/log-in/log-in.component'),
      },
    ],

  },
  {
    path: 'results',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/results/results.component'),
  },
];



