'use strict';

const Realm = require('realm');
const schemas = require(`${process.env.APP_PATH}/config/schema.json`);
const _ = require('lodash');
const uuid = require('uuid');

const paramKey = Symbol();

function AppRealm(key) {
  const schema = schemas[key];
  if (!schema) throw new Error("schema");

  this.realm = new Realm({
    path: `${process.env.DB_PATH}/${key}`,
    schema: [schema]
  });
}

AppRealm.prototype.get = function(key) {
  return this.realm.objects(key);
};

AppRealm.prototype.add = function(key, param, isUuid = true, isTimestamp = true) {
  this[paramKey] = param;
  if (isUuid) this.getUuid();
  if (isTimestamp) this.timestamp();

  this.realm.write(() => {
    this.realm.create(key, this[paramKey]);
  });
};

AppRealm.prototype.timestamp = function(fields) {
  const date = new Date();
  const obj = {};
  if (this[paramKey].created_at) {
    obj.updated_at = date;
  } else {
    obj.created_at = date;
    obj.updated_at = date;
  }

  _.assignIn(this[paramKey], obj);
  return date;
}

AppRealm.prototype.getUuid = function() {
  const uuidV4 = uuid.v4();
  const obj = {'uuid': uuidV4};

  _.assignIn(this[paramKey], obj);
  return uuidV4;
}

module.exports = AppRealm;
