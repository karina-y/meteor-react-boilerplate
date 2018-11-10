import { Meteor } from 'meteor/meteor';
import ItemsCollection from '../Items_SAMPLE/Items';


Meteor.users.helpers({
    item(){
        return ItemsCollection.findOne(
            { userId: this._id }
        );
    },
});
