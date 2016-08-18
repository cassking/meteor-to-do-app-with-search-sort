import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    check
} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

//publish tasks
if (Meteor.isServer) {

    //this code only runs onserver
    Meteor.publish('tasks', function tasksPublication(keyword) {
        var searchTerm = null,
            query = {},
            results = null;

        if (keyword) {
            searchTerm = new RegExp(keyword, 'i')
            query = {
                text: searchTerm
            }
        }
        Tasks.find(query);
        // return Tasks.find({},{limit:10});
        return Tasks.find();

    });

}
//end server
Meteor.methods({

    'tasks.insert' (text) {
        check(text, String);

        //make sure the user is logged in before inserting a tasks
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.insert({
            text: text,
            created: Date.now(),
            createdAt: new Date(), //current time
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });

    },
    'tasks.remove' (taskId) {
        check(taskId, String);
          //make sure the user is logged in before allowing deleteing a tasks
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);

    },
    'tasks.setChecked' (taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        //make sure only logged in can check
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.update(taskId, {
            $set: {
                checked: setChecked
            }
        });
    },
    'tasks.setPrivate' (taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);
        const task = Tasks.findOne(taskId);
        //make sure only task owner can make task private
        if (task.owner !== this.userId) {
            throw new Meteor.error('not-authorized');
        }
        Tasks.update(taskId, {
            $set: {
                private: setToPrivate
            }
        });
    },

});
