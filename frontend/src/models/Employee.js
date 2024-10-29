"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(_id, _name, _email, _isAdmin) {
        this._id = _id;
        this._name = _name;
        this._email = _email;
        this._isAdmin = _isAdmin;
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
    get isAdmin() {
        return this._isAdmin;
    }
    set isAdmin(value) {
        this._isAdmin = value;
    }
}
exports.Employee = Employee;
