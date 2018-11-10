import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Items from '../Items';
import UserEnums from '../../Users/enums';

const userRoles = UserEnums.USER_ROLE_ENUM;

Meteor.publish('items', function items() {
    return Items.find();
});

Meteor.publish('itesm.view.byItemId', function itemViewByItemId(itemId) {
    check(itemId, String);
    return Items.find({ _id: itemId });
});