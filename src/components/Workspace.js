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
        this.props.addNewToDoListItemCallback();
    }

    handleDeleteList = () => {
        this.props.deleteListCallback();
    }

    handleUndoListItem = () => {
        this.props.UndoListItemCallback();
    }

    handleRedoListItem = () => {
        this.props.RedoListItemCallback();
    }
    
    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-header-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" onClick={this.handleUndoListItem}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" onClick={this.handleRedoListItem}/>
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick={this.handleAddNewListItem} />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick={this.handleDeleteList}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick={this.handleAddNewListItem}/>
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