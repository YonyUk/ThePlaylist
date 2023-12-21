import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { TracklistComponent } from './tracklist/tracklist.component';
import { TracklistcontentComponent } from './tracklistcontent/tracklistcontent.component';
import { ComentsroomComponent } from './comentsroom/comentsroom.component';
import { TrackitemComponent } from './trackitem/trackitem.component';

const uri = 'http://localhost:3000/graphql';

function createApollo(httplink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httplink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    PagetitleComponent,
    TracklistComponent,
    TracklistcontentComponent,
    ComentsroomComponent,
    TrackitemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApolloModule,
    HttpClientModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
