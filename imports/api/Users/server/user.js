import { Meteor } from 'meteor/meteor';

export function checkUserActive(email){
    const user = Meteor.users.find({ emails: { "$elemMatch": { address: email } } }).fetch();

    if (user && user.isActive)
        return true;
    else
        return false;
	
}
