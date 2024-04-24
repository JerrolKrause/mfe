import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IconDefinition,
  faBars,
  faCaretDown,
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
  faMoneyCheckAlt,
  faPhone,
  faPlus,
  faPowerOff,
  faQuestion,
  faRefresh,
  faSave,
  faSpinner,
  faThumbsUp,
  faTrash,
  faUser,
  faUsers,
  faX,
} from '@fortawesome/free-solid-svg-icons';

export type AvailableIcons =
  | 'eye'
  | 'thumbsup'
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
})
export class IconsComponent {
  @Input() icon?: AvailableIcons | null = null;

  /** Map icon key to actual icon */
  public iconMap: { [key in AvailableIcons]: IconDefinition } = {
    eye: faEye,
    thumbsup: faThumbsUp,
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
    'caret-down': faCaretDown,
    bars: faBars,
    home: faHome,
    cubes: faCubes,
    x: faX,
  };
}
