// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        if(!document.getElementById("add-list-button").classList.contains("disabled-button"))
            this.props.addNewListCallback();
    }

    handleUndoListItem = () => {
        if(!document.getElementById("undo-button").classList.contains("disabled-button"))
            this.props.undoListItemCallback();
    }

    handleRedoListItem = () => {
        if(!document.getElementById("redo-button").classList.contains("disabled-button"))
            this.props.redoListItemCallback();
    }

    render() { 
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" class="section-header">
                    <span class="left-sidebar-header-text">Todolists</span>
                    <span class="left-sidebar-controls" id="add-undo-redo-box">
                        <AddBox 
                            id="add-list-button"
                            className="material-icons left-sidebar-button add-list-button"
                            onClick={this.handleAddNewList} />
                        <Undo id="undo-button" className="material-icons left-sidebar-button disabled-button" onClick={this.handleUndoListItem}/>
                        <Redo id="redo-button" className="material-icons left-sidebar-button disabled-button" onClick={this.handleRedoListItem}/>
                    </span>
                </div>
                <div id="todo-lists-list">
                {
                    this.props.toDoLists.map((toDoList) => (
                        <ListLink
                            key={toDoList.id}
                            highlight={toDoList.highlight}
                            toDoList={toDoList}// PASS THE LIST TO THE CHILDREN
                            loadToDoListCallback={this.props.loadToDoListCallback}  // PASS THE CALLBACK TO THE CHILDREN
                            toDoListNameChangeCallback={this.props.toDoListNameChangeCallback}/>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;