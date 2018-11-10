const UserEnums = { };

//these are strings instead of ints because of the way meteor roles works
const USER_ROLE_ENUM = {
    'none': "none",
    'deleted': "deleted",
    'inactive': "inactive",
    'admin': "admin"
};

UserEnums.USER_ROLE_ENUM = USER_ROLE_ENUM;

export default UserEnums;
