import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run los:serve:development',
        production: 'nx run los:serve:production',
      },
      ciWebServerCommand: 'nx run los:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
