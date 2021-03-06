import { NgModule, ErrorHandler } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChatsPage } from '../pages/chats/chats';
import { NewChatComponent } from '../pages/chats/new-chat';
import { ChatsOptionsComponent } from '../pages/chats/chats-options';
import { LoginPage } from '../pages/login/login';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesAttachmentsComponent } from '../pages/messages/messages-attachments';
import { MessagesOptionsComponent } from '../pages/messages/messages-options';
import { NewLocationMessageComponent } from '../pages/messages/location-message';
import { ShowPictureComponent } from '../pages/messages/show-picture';
import { ProfilePage } from '../pages/profile/profile';
import { ShowProfilePage } from '../pages/profile/showprofile';
import { EventsPage } from '../pages/events/events';
import { NewEventComponent } from '../pages/events/new-event';
import { EditEventComponent } from '../pages/events/edit-event';
import { EventPage } from '../pages/events/event';
import { MyEventsPage } from '../pages/events/myevents';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatroomsPage } from '../pages/chatrooms/chatrooms';
import { TinderPage } from '../pages/tinder/tinder';
import { VerificationPage } from '../pages/verification/verification';
import { PhoneService } from '../services/phone';
import { PictureService } from '../services/picture';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage,
    ChatsOptionsComponent,
    NewChatComponent,
    MessagesOptionsComponent,
    MessagesAttachmentsComponent,
    NewLocationMessageComponent,
    ShowPictureComponent,
    EventsPage,
    NewEventComponent,
    EditEventComponent,
    EventPage,
    TabsPage,
    ChatroomsPage,
    TinderPage,
    MyEventsPage,
    ShowProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage,
    ChatsOptionsComponent,
    NewChatComponent,
    MessagesOptionsComponent,
    MessagesAttachmentsComponent,
    NewLocationMessageComponent,
    ShowPictureComponent,
    EventsPage,
    NewEventComponent,
    EditEventComponent,
    EventPage,
    TabsPage,
    ChatroomsPage,
    TinderPage,
    MyEventsPage,
    ShowProfilePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhoneService,
    PictureService
  ]
})
export class AppModule {}
