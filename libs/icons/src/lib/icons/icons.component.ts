import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IconDefinition,
  faArrowDown,
  faArrowUp,
  faBars,
  faBullseye,
  faCar,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCog,
  faCogs,
  faCreditCard,
  faCubes,
  faEnvelope,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faHome,
  faInfoCircle,
  faLock,
  faLockOpen,
  faMoneyBill1Wave,
  faMoneyCheckAlt,
  faPhone,
  faPlus,
  faPowerOff,
  faQuestion,
  faRefresh,
  faSadCry,
  faSave,
  faSearch,
  faSearchDollar,
  faSmile,
  faSpinner,
  faThumbsDown,
  faThumbsUp,
  faTrash,
  faUser,
  faUsers,
  faWeightHanging,
  faX,
} from '@fortawesome/free-solid-svg-icons';

export type AvailableIcons =
  | 'arrow-up'
  | 'arrow-down'
  | 'money'
  | 'search'
  | 'weighthanging'
  | 'smile'
  | 'bullseye'
  | 'info-circle'
  | 'search-dollar'
  | 'sad'
  | 'car'
  | 'lock'
  | 'lock-open'
  | 'eye'
  | 'thumbsup'
  | 'thumbsdown'
  | 'external-link-alt'
  | 'creditcard'
  | 'save'
  | 'money-check-alt'
  | 'check'
  | 'phone'
  | 'envelope'
  | 'power-off'
  | 'spinner'
  | 'refresh'
  | 'plus'
  | 'exclamation-triangle'
  | 'cog'
  | 'cogs'
  | 'trash'
  | 'user'
  | 'users'
  | 'caret-down'
  | 'caret-up'
  | 'bars'
  | 'home'
  | 'cubes'
  | 'question'
  | 'x';

@Component({
  selector: 'lib-icons',
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { hostID: crypto.randomUUID().toString() },
})
export class IconsComponent {
  @Input() icon?: AvailableIcons | null = null;

  /** Map icon key to actual icon */
  public iconMap: { [key in AvailableIcons]: IconDefinition } = {
    'arrow-up': faArrowUp,
    'arrow-down': faArrowDown,
    money: faMoneyBill1Wave,
    search: faSearch,
    weighthanging: faWeightHanging,
    smile: faSmile,
    bullseye: faBullseye,
    'info-circle': faInfoCircle,
    'search-dollar': faSearchDollar,
    sad: faSadCry,
    car: faCar,
    lock: faLock,
    'lock-open': faLockOpen,
    eye: faEye,
    thumbsup: faThumbsUp,
    thumbsdown: faThumbsDown,
    'external-link-alt': faExternalLinkAlt,
    creditcard: faCreditCard,
    'money-check-alt': faMoneyCheckAlt,
    phone: faPhone,
    save: faSave,
    envelope: faEnvelope,
    'power-off': faPowerOff,
    spinner: faSpinner,
    check: faCheck,
    refresh: faRefresh,
    plus: faPlus,
    question: faQuestion,
    'exclamation-triangle': faExclamationTriangle,
    cog: faCog,
    cogs: faCogs,
    trash: faTrash,
    user: faUser,
    users: faUsers,
    'caret-up': faCaretUp,
    'caret-down': faCaretDown,
    bars: faBars,
    home: faHome,
    cubes: faCubes,
    x: faX,
  };
}
