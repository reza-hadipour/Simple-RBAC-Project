const roles = require('../configs/roles.json');

class Permission{
    constructor(){
        this.Permissions = [];
    }

    getPermissionsByRoleName(roleName){
        const role = roles.roles.find((r)=> r.name === roleName);
        return role ? role.permissions : [];
    }
}


module.exports = Permission;