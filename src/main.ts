import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

import {registerLicense} from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx3TXxbf1x0ZFBMZVxbQHNPMyBoS35RckVgWHZedXFSRGdVVUx+');
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
