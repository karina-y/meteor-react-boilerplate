import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
    user = _.extend(user, {
        profile : options.profile,
        agreements: options.agreements,
        createdByAdmin: (options.createdByAdmin == true) ? options.createdByAdmin : false
    });
    return user;
});
