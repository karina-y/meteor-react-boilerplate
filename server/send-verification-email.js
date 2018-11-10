import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    sendVerificationLink(){
        let userId = Meteor.userId();
        // console.log('INSIDE OF sendVERIFCATION LINK', userId, Accounts.userId());
        if( userId ){
            return Accounts.sendVerificationEmail( userId );
        }else{
            return "User is not logged in";
        }
    }
})
