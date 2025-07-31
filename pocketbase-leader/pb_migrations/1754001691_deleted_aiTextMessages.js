/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2492048382");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "@request.auth.status = \"admin\" || @request.auth.status = \"approved\"",
    "deleteRule": "@request.auth.status = \"admin\" || @request.auth.status = \"approved\"",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_4275913271",
        "hidden": false,
        "id": "relation1165604065",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "threadId",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "select1466534506",
        "maxSelect": 1,
        "name": "role",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "user",
          "assistant"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1664698358",
        "max": 0,
        "min": 0,
        "name": "contentText",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_2492048382",
    "indexes": [],
    "listRule": "@request.auth.status = \"admin\" || @request.auth.status = \"approved\"",
    "name": "aiTextMessages",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.status = \"admin\" || @request.auth.status = \"approved\"",
    "viewRule": "@request.auth.status = \"admin\" || @request.auth.status = \"approved\""
  });

  return app.save(collection);
})
