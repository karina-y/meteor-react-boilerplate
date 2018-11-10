import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Items from './Items';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
    //todo-ky add the other crud operations
    'items.insert': function itemsInsert(item) {
        if (!Items.simpleSchema().newContext().validate(item, keys=Object.keys(item))){
            throw new Meteor.Error('500', "Invalid arguments passed");
        } else {
            console.log("checked the following keys: ", Object.keys(item), "what value does this return?: ",
            !Items.simpleSchema().validate(item, keys=Object.keys(item)));
        }

        try {
            const id = Items.insert(item);

            return id;
        }
        catch (err) {
            throw new Meteor.ValidationError('500', err);
        }

    },

});


rateLimit({
    methods: [
        'items.insert',
    ],
    limit: 5,
    timeRange: 1000,
});
