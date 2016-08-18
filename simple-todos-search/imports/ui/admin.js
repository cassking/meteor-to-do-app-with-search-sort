import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import './task.js';
import './search.js';
import './users.js';
import './body.js';
import './body.html';


if (Meteor.isServer) {
  Meteor.startup(function(){
console.log('server', Roles);
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find({});
  });

  Meteor.publish(null, function () {
    return Meteor.roles.find({});
  });
}

if (Meteor.isClient) {
  Meteor.startup(function(){
console.log('client',  Meteor.roles.find({}));
  });
  Meteor.subscribe("userData");
//$new = "not equal to
  Template.adminPanel.helpers({
    users: function() {
      var users = Meteor.users.find({ });

        // var users = Meteor.users.find({_id:{$ne:this.userId()}});

        console.log(users);
        return users;
    },
  });
}
