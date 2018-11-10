import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

let action;

const updatePassword = (userId, newPassword) => {
  try {
    Accounts.setPassword(userId, newPassword, { logout: false });
  } catch (exception) {
    action.reject(`[editProfile.updatePassword] ${exception}`);
  }
};

const updateUser = (userId, { emailAddress, profile }) => {
  try {
    Meteor.users.update(userId, {
      $set: {
        'emails.0.address': emailAddress,
        profile,
      },
    });
  } catch (exception) {
    action.reject(`[editProfile.updateUser] ${exception}`);
  }
};

const editProfile = ({ userId, profile }, promise) => {
  try {
    action = promise;

    if (profile.emailAddress) updateUser(userId, profile);

    if (profile.password) updatePassword(userId, profile.password);

    if (profile.agreements) updateUserAgreements(userId, profile.agreements);

    if (profile.verifyEmail) manuallyVerifyEmail(userId);

    action.resolve();
  } catch (exception) {
    action.reject(`[editProfile.handler] ${exception}`);
  }
};

const updateUserAgreements = (userId, agreements) => {
  try {
    Meteor.users.update(userId, {
      $set: {
        'agreements': agreements
      }
    });
  } catch (exception) {
    action.reject(`[editProfile.updateUserAgreements] ${exception}`);
  }
};

const manuallyVerifyEmail = (userId) => {
  try {
    Meteor.users.update(userId, {
      $set: {
        'emails.0.verified': true
      }
    });
  } catch (exception) {
    action.reject(`[editProfile.manuallyVerifyEmail] ${exception}`);
  }
};

export default options =>
new Promise((resolve, reject) =>
editProfile(options, { resolve, reject }));
