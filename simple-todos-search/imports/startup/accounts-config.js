import { Accounts } from 'meteor/accounts-base';


Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL",
});
// Accounts.config({
//     sendVerificationEmail: true
// }); run $ meteor add email
//this is client side called from main.js
