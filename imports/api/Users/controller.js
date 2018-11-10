import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import createUser from './server/create-user';
import NullChecks from '../../helpers/NullChecks';
import UserEnums from './enums';
import { Accounts } from 'meteor/accounts-base';

const userRoles = UserEnums.USER_ROLE_ENUM;

Meteor.methods({
    'userController.sendEnrollmentEmail': function sendEnrollmentEmail(userId) {
        let response = Accounts.sendEnrollmentEmail(userId);
        return response;
    },

    'userController.setActive': function setActive(data) {
        check(data, Object);

        let updated = false;

        let ret = {
            'title': 'Success! ',
            'message': "You've successfully " + data.action + "d the user!",
            'type': 'success'
        };

        let user = Meteor.users.findOne({_id:data._id});
        if( user ){
            let roles = user.roles;

            if( data.action === 'activate' ){
                if( roles.indexOf("inactive") >= 0 ){
                    roles.splice(roles.indexOf("inactive"), 1);
                    updated = true;
                }
            }else{
                if( roles.indexOf("inactive") < 0 ){
                    roles.push("inactive");
                    updated = true;
                }
            }

            if( updated ){
                Meteor.users.update(data._id, { $pull: { 'services.resume.loginTokens': { $exists: true } }, $set: { roles: roles } } );
            }
        }else{
            ret.title = "Failed!";
            ret.message = "Cannot find a user account for this ID: " + data._id;
            ret.type = "danger";
        }



        return ret;

    },

    'userController.createUser': function userControllerCreateUser(data) {
        check(data, {
            emailAddress: String,
            password: String,
            firstName: String,
            middleName: String,
            lastName: String,
            roles: String,
            agreements: Object,
            createdByAdmin: Boolean
        });

        let ret = {
            'title': 'Success! ',
            'message': "You've created a user!",
            'type': 'success'
        };

        try {
            let userId = createUser(data);
            return userId;

        } catch (exception) {
            throw new Meteor.Error('500', exception.reason);
        }
    },

});
