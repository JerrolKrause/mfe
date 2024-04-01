import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faBars,
  faCaretDown,
  faCog,
  faCogs,
  faCubes,
  faEnvelope,
  faExclamationTriangle,
  faHome,
  faPhone,
  faPlus,
  faPowerOff,
  faQuestion,
  faRefresh,
  faSpinner,
  faTrash,
  faUser,
  faUsers,
  faX,
} from '@fortawesome/free-solid-svg-icons';

export type AvailableIcons =
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
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  @Input() icon?: AvailableIcons | null = null;

  /** Map icon key to actual icon */
  public iconMap: { [key in AvailableIcons]: IconDefinition } = {
    phone: faPhone,
    envelope: faEnvelope,
    'power-off': faPowerOff,
    spinner: faSpinner,
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
