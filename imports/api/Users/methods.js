import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import editProfile from './server/edit-profile';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
    'users.getUser': function getUser(id){
        return Meteor.users.findOne({ _id: id }, {
            fields: {
                'services': 0
            }
        });
    },

    'users.getUserByEmail': function getUserByEmail(email){
        return Meteor.users.findOne({emails: { "$elemMatch": { address: email } }}, {
            fields: {
                'services': 0
            }
        })
    },

    'users.editProfile': function usersEditProfile(profile) {
        const userId = profile._id;
        delete profile._id;

        check(profile, {
            emailAddress: String,
            password: Match.Optional(Object),
            verifyEmail: Match.Optional(Boolean),
            profile: {
                name: {
                    first: String,
                    middle: String,
                    last: String
                }
            },
            roles: Match.Maybe([String]),
            agreements: Match.Maybe({
                agreedToContract: Boolean,
                agreedToPrivacyPolicy: Boolean,
                agreedToTerms: Boolean,
                agreedToBonusTerms: Boolean,
                agreedToContractDate: Date,
                agreedToPrivacyPolicyDate: Date,
                agreedToTermsDate: Date,
                agreedToBonusTermsDate: Date
            })
        });

        if (userId != null && profile.roles && profile.roles.length > 0) {
            Roles.setUserRoles(userId, profile.roles);
        }

        return editProfile({ userId, profile})
            .then(function(response){
                //console.log(userId, "success");
            })
            .catch((exception) => {
                throw new Meteor.Error('500', exception);
            });
    },

    'users.addUser': function usersAddUser(user) {

        try {
            const id = Accounts.createUser({
                email: user.email,
                password: user.password,
                profile: user.profile,
                agreements: user.agreements,
                createdByAdmin: user.createdByAdmin
            });

            //console.log(user, "user - on addUser inside of /users/methods");

            user._id = id;

            //make sure our user was created properly and we actually have roles to assign them to
            if (id != null && user.roles.length > 0) {
                Roles.setUserRoles(user, user.roles);
            }

            return id;
        }
        catch (exception) {
            console.log('yo son, exception', exception);
            //throw Meteor.ValidationError('500', exception);
            throw new Meteor.Error('500', exception);
        }

    },

    'users.checkActive': function checkUserActive(email){
        try {
            let user = Meteor.users.findOne({ emails: { "$elemMatch": { address: email } } } );

            if( user && user.roles && !user.roles.includes('inactive') ){
                return true;
            }else{
                return false;
            }

        }
        catch (exception) {
            console.log(exception);
            throw new Meteor.Error('500', exception);
        }
    },

    'users.updateAgreements': function usersUpdateAgreements(agreements) {
        const userId = Meteor.user()._id;

        try {
            check(agreements, {
                agreedToContract: Boolean,
                agreedToPrivacyPolicy: Boolean,
                agreedToTerms: Boolean,
                agreedToBonusTerms: Boolean,
                agreedToContractDate: Date,
                agreedToPrivacyPolicyDate: Date,
                agreedToTermsDate: Date,
                agreedToBonusTermsDate: Date
            });
        }
        catch(exception) {
            throw new Meteor.ValidationError('500', exception);
        }

        const profile = {
            agreements: agreements
        };

        return editProfile({ userId, profile })
            .then(function(response){
                return response;
            })
            .catch((exception) => {
                throw new Meteor.ValidationError('500', exception);
            });
    },
});

rateLimit({
    methods: [
        'users.getUser',
        'users.getUserByEmail',
        'users.editProfile',
        'users.addUser',
        'users.checkActive',
        'users.updateAgreements'
    ],
    limit: 5,
    timeRange: 1000,
});
