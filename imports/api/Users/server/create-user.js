import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default function createUser(data){
    try {
        let userId = Accounts.createUser({
            email: data.emailAddress,
            password: data.password,
            profile: {
                name: {
                    first: data.firstName,
                    middle: data.middleName,
                    last: data.lastName,
                },
            },
            agreements: {
                agreedToPrivacyPolicy: data.agreedToPrivacyPolicy,
                agreedToTerms: data.agreedToTerms,
                agreedToPrivacyPolicyDate: data.agreedToPrivacyPolicyDate,
                agreedToTermsDate: data.agreedToTermsDate
            }
        });
        return userId;

    } catch (exception) {
        throw new Meteor.Error('500', exception.reason);
    }
}
