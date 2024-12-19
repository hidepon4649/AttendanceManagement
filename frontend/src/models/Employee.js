"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(_id, _name, _email, _password, _admin) {
        this._id = _id;
        this._name = _name;
        this._email = _email;
        this._password = _password;
        this._admin = _admin;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get admin() {
        return this._admin;
    }
    set admin(value) {
        this._admin = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
}
exports.Employee = Employee;
