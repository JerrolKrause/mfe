import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
} from '@angular/core';
import { FormsLib } from '../../../forms.model';
import { FormGeneratorBaseComponent } from '../form-generator.base';

@Component({
  selector: 'lib-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent
  extends FormGeneratorBaseComponent
  implements OnInit
{
  /** Feature model containing the feature id */
  public feature = input<FormsLib.Feature | null>(null);
  /** Extract the correct feature template */
  public featureTemplate = computed(() => {
    const featureId = this.feature()?.featureId;
    if (featureId && this.featureTemplates) {
      return this.featureTemplates[featureId];
    }
    return null;
  });
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
