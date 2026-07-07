import {
  animate,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0, transform: 'translateY(12px)' })], { optional: true }),
    query(':leave', [style({ opacity: 1 }), animate('150ms ease', style({ opacity: 0 }))], { optional: true }),
    query(':enter', [animate('300ms ease', style({ opacity: 1, transform: 'translateY(0)' }))], { optional: true })
  ])
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(8px)' }),
    animate('350ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const cardHover = trigger('cardHover', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.97)' }),
    animate('300ms ease', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);
