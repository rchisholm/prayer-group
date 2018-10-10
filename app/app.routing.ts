import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { IntentionComponent } from "./pages/intention/intention.component";
import { RemindersComponent } from "./pages/reminders/reminders.component";
import { FridayReminderComponent } from "./pages/reminders/friday-reminder.component";
import { SaturdayReminderComponent } from "./pages/reminders/saturday-reminder.component";
import { ThreeReminderComponent } from "./pages/reminders/three-reminder.component";
import { PrayersComponent } from "./pages/prayers/prayers.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "intention", component: IntentionComponent},
  { path: "reminders", component: RemindersComponent},
  { path: "friday-reminder", component: FridayReminderComponent},
  { path: "saturday-reminder", component: SaturdayReminderComponent},
  { path: "three-reminder", component: ThreeReminderComponent},
  { path: "three-reminder", component: ThreeReminderComponent},
  { path: "prayers", component: PrayersComponent},
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  IntentionComponent,
  RemindersComponent,
  FridayReminderComponent,
  SaturdayReminderComponent,
  ThreeReminderComponent,
  PrayersComponent
];
