import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Unsubscribe = new Mongo.Collection('Unsubscribe');


Unsubscribe.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Unsubscribe.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Unsubscribe.schema = new SimpleSchema({
    email: {
        type: String,
    }
});

Unsubscribe.attachSchema(Unsubscribe.schema);

export default Unsubscribe;
