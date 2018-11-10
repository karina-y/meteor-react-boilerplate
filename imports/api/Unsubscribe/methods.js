import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import Unsubscribe from './Unsubscribe';

Meteor.methods({
    'unsubscribeEmails': function unsubscribeEmails(data) {
        check(data, {
            id: String,
            emails: Array
        });

        let ret = {
            'title': 'Success! ',
            'message': "You've unsubscribed from future TODOBOILER_appName emails",
            'type': 'success'
        };

        try {
            let ids = [];
            if( data.emails && data.emails.length > 0 ){
                
                _.each(data.emails,function(email){
                    ids.push(
                        Unsubscribe.insert({
                            email: email
                        })
                    );
                });
            }
            return ret;

        } catch (exception) {
            console.log("Exception: ", exception);
            throw new Meteor.Error('500', exception.reason);
        }
    },

    'checkIfUnsubscribed': function checkIfUnsubscribed(email){
        try {
            let res = Unsubscribe.findOne({email:email});
                                   
            if(res){
                return true;
            }else{
                return false;
            }

        } catch (exception) {
            console.log("Exception: ", exception);
            throw new Meteor.Error('500', exception.reason);
        }
    }
});
