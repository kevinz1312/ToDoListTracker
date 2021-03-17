'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGING AN ITEM IN A TODO LIST
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(app, toDoListItem, operation, newValue) {
        super();
        this.app = app;
        this.toDoListItem = toDoListItem;
        this.operation = operation;
        this.index = null;
        this.oldValue = null;
        this.newValue = newValue;
    }

    doTransaction() {
        if(this.operation == "description"){
            this.oldValue = this.toDoListItem.description;
            this.app.toDoListItemChange(this.toDoListItem, this.operation, this.newValue)
        }

        if(this.operation == "date"){
            this.oldValue = this.toDoListItem.due_date;
            this.app.toDoListItemChange(this.toDoListItem, this.operation, this.newValue)
        }

        if(this.operation == "status"){
            this.oldValue = this.toDoListItem.status;
            this.app.toDoListItemChange(this.toDoListItem, this.operation, this.newValue)
        }
    }

    undoTransaction() {
        if(this.operation == "description"){
            this.app.toDoListItemChange(this.toDoListItem, this.operation, this.oldValue)
        }

        if(this.operation == "date"){
            this.app.toDoListItemChange(this.toDoListItem, this.operation, this.oldValue)
        }

        if(this.operation == "status"){
            this.app.toDoListItemChange(this.toDoListItem, this.operation, this.oldValue)
        }

    }
}