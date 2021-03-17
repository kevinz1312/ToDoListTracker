'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGING AN ITEM IN A TODO LIST
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(app, listItem, operation) {
        super();
        this.app = app;
        this.operation = operation;
        this.listItem = listItem;
        this.index = null;
    }

    doTransaction() {
        this.index = this.app.toDoListItemMove(this.listItem, this.operation)
    }

    undoTransaction() {
        this.swapOperation()
        this.app.toDoListItemMove(this.listItem, this.operation, this.index)
        this.swapOperation()
    }

    swapOperation(){
        if(this.operation == "moveItemUp")
            this.operation = "moveItemDown"
        else if(this.operation == "moveItemDown")
            this.operation = "moveItemUp"
        else if(this.operation == "moveItemClose")
            this.operation =  "moveItemOpen"
        else if(this.operation == "moveItemOpen")
            this.operation = "moveItemClose"
    }
}