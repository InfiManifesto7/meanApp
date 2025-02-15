import { bootstrapApplication ,provideClientHydration,withEventReplay} from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(), 
    //HttpClientModule,
    //provideClientHydration(withEventReplay())
    
  ],
}).catch(err => console.error(err));
