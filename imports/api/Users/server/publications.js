import { Meteor } from 'meteor/meteor';

Meteor.publish('users.editProfile', function usersProfile() {
  return Meteor.users.find(this.userId, {
    fields: {
		emails: 1,
		profile: 1,
		services: 1,
		agreements: 1
    },
  });
});

Meteor.publish('userData', function () {
	if (this.userId) {
		return Meteor.users.find({ _id: this.userId }, {
			fields: {
				agreements: 1,
				createdByAdmin: 1
			}
		});
	} else {
		this.ready();
	}
});

Meteor.publish('userData.profile.byUserId', function (id) {
    return Meteor.users.find({ _id: id }, {
        fields: {
            profile: 1
        }
    });
});

Meteor.publish("users.getAll", function () {
    return Meteor.users.find({});
});