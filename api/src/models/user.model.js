/**
 * @exports
 * @class User
 */
export default class User {
    /**
     *Creates an instance of User.
     * @param {string} id
     * @param {string} email
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} password
     * @param {string} type
     * @param {boolean} [isAdmin=false]
     * @param {string} created_at
     * @param {string} updated_at
     * @memberof User
     */
    constructor( id, email, firstName, lastName, password, type, isAdmin = false, created_at, updated_at = ''
    ) { 
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.type = type;
        this.isAdmin = isAdmin;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}