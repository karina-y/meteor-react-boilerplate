//sample schema

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import ItemEnums from './enums';

const itemEnums = ItemEnums.ITEM_ENUM;
const Items = new Mongo.Collection('Items');

Items.helpers({
    user() {
        return Meteor.users.findOne(
            { _id: this.userId }
        );
        // return Meteor.users.find({}).fetch();
    },
    company() {
        return OtherCollection.findOne(
            { _id: this.otherId },{
                fields:{
                    companyName: 1,
                    longDesc: 1
                }
            }
        );
    }
});

Items.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Items.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Items.schema = new SimpleSchema({
    userId: {
        type: String,
        defaultValue: ''
    },
    typeString: {
        type: String,
        defaultValue: ''
    },
    typeObj: {
        type: Object,
        defaultValue: {}
    },
    "typeObj.nestedString": {
        type: String,
        defaultValue: ''
    },
    "typeObj.nestedArr": {
        type: Array,
        defaultValue: [],
        optional: true
    },
    "typeObj.nestedArr.$": {
        type: String
    },
    "typeObj.nestedObj": {
        type: Object,
        defaultValue: {},
        optional: true
    },
    typeVaries: {
        type: Object,
        defaultValue: {},
        blackbox: true
    },
    typeArr: {
        type: Array,
        defaultValue: []
    },
    'typeArr.$': {
        type: Number,
        allowedValues: Object.keys(itemEnums).map(function(k){ return parseInt(itemEnums[k].enum)}),
    },
    createdAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) return (new Date());
        },
    },
    updatedAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) return (new Date());
        },
    }
});

Items.attachSchema(Items.schema);

export default Items;
