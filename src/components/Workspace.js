// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewListItem = () => {
        if(!document.getElementById("add-item-button").classList.contains("disabled-button"))
            this.props.addNewToDoListItemCallback();
    }

    handleDeleteList = () => {
        if(!document.getElementById("delete-list-button").classList.contains("disabled-button"))
            this.props.deleteListCallback();
    }

    handleUndoListItem = () => {
        if(!document.getElementById("undo-button").classList.contains("disabled-button"))
            this.props.undoListItemCallback();
    }

    handleRedoListItem = () => {
        if(!document.getElementById("redo-button").classList.contains("disabled-button"))
            this.props.redoListItemCallback();
    }

    handleCloseList = () => {
        if(!document.getElementById("close-list-button").classList.contains("disabled-button"))
            this.props.closeListCallback();
    }

    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-header-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button disabled-button" onClick={this.handleUndoListItem}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button disabled-button" onClick={this.handleRedoListItem}/>
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button disabled-button" onClick={this.handleAddNewListItem} />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button disabled-button" onClick={this.handleDeleteList}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button disabled-button" onClick={this.handleCloseList}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            toDoListItemMoveCallback={this.props.toDoListItemMoveCallback}
                            toDoListItemChangeCallback ={this.props.toDoListItemChangeCallback}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;