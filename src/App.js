// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// IMPORT TRANSACTIONS
import AddNewItem_Transaction from './components/transactions/AddNewItem_Transaction.js'
import MoveItem_Transaction from './components/transactions/MoveItem_Transaction.js'
import ChangeItem_Transaction from './components/transactions/ChangeItem_Transaction.js'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Modal from './components/Modal'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    let nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );

    //REMOVE HIGHLIGHT FROM ALL LISTS
    nextLists.forEach((testList)=>{testList.highlight = "false";})

    //ADD HIGHLIGHT TO TOP LIST
    toDoList.highlight = "true";
    
    //ADD BACK TO TOP OF STACK
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    },this.updateToDoListItemArrows);

    this.tps.clearAllTransactions();
    this.activeListItemButtons();
    this.toggleUndoRedoButtons();
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  addNewToDoListItem = (item) => {
    let newToDoList = this.state.currentList;
    if(item != null){
      newToDoList.items.push(item)
      this.setState({
        currentList: newToDoList,
      },this.updateToDoListItemArrows);
    }

    else{
      let newItem = this.makeNewToDoListItem()
      newToDoList.items.push(newItem)

      // AND SET THE STATE, WHICH SHOULD FORCE A RENDER
      this.setState({
        currentList: newToDoList,
        nextListItemId: this.state.nextListItemId+1
      },this.updateToDoListItemArrows);
      console.log("here")
      return newItem;
    }
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      due_date: "No Date",
      status: "incomplete",
      id: this.state.nextListItemId
    };
    return newToDoListItem;
  }

  deleteList = () => {
    let newToDoListsList = this.state.toDoLists;
    newToDoListsList.shift();

    this.hideModal();

    this.tps.clearAllTransactions();
    this.toggleUndoRedoButtons();
    this.inactiveListItemButtons();

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: {items: []},
    }, this.afterToDoListsChangeComplete);
  }
  
  deleteListItem = (toDoListItem) => {
    let newToDoItemsList = this.state.currentList.items;
    const index = newToDoItemsList.indexOf(toDoListItem);

    newToDoItemsList.splice(index, 1);

    this.setState({
      currentList: {items: newToDoItemsList}
    },this.updateToDoListItemArrows);
    
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  toDoListItemMove = (toDoListItem, operation, transactionIndex) => {
    let newToDoItemsList = this.state.currentList.items;
    let index = newToDoItemsList.indexOf(toDoListItem);

    let tempItem = newToDoItemsList[index];

    if(operation === "moveItemUp"){
      newToDoItemsList[index] = newToDoItemsList[index-1]
      newToDoItemsList[index-1] = tempItem;
    }

    else if(operation === "moveItemDown"){
      newToDoItemsList[index] = newToDoItemsList[index+1]
      newToDoItemsList[index+1] = tempItem;   
    }

    else if(operation === "moveItemClose"){
      newToDoItemsList.splice(index, 1);
    }

    else if(operation === "moveItemOpen"){
      newToDoItemsList.splice(transactionIndex, 0, toDoListItem);
    }

    this.setState({
      currentList: {items: newToDoItemsList}
    },this.updateToDoListItemArrows);
    return index;
  }

  toDoListItemChange = (toDoListItem, operation, value) =>{
    let newToDoItemsList = this.state.currentList.items;
    const index = newToDoItemsList.indexOf(toDoListItem);

    let tempItem = newToDoItemsList[index];

    if(operation === "description")
    tempItem.description = value;

    else if (operation === "date")
    tempItem.due_date = value;

    else if (operation === "status"){
    tempItem.status = value;
    console.log("asdasd" + tempItem.status)
    }
    newToDoItemsList[index] = tempItem;

    this.setState({
      currentList: {items: newToDoItemsList}
    },this.updateToDoListItemArrows);
  }

  closeList = () => {
    let newToDoLists = this.state.toDoLists
    //REMOVE HIGHLIGHT FROM ALL LISTS
    newToDoLists.forEach((testList)=>{testList.highlight = "false";})

    this.setState({
      toDoLists: newToDoLists,
      currentList: null
    })

    this.tps.clearAllTransactions();
    this.toggleUndoRedoButtons();
    this.inactiveListItemButtons();
  }

  
  undoListItem = () => {
      if (this.tps.hasTransactionToUndo()) {
        this.tps.undoTransaction();
        this.toggleUndoRedoButtons();
    }
  }

  redoListItem = () => {
      if (this.tps.hasTransactionToRedo()) {
        this.tps.doTransaction();
        this.toggleUndoRedoButtons();
    }
  }
  
  toDoListChange = (toDoList, value) => {
    let newToDoListLists = this.state.toDoLists;
    const index = newToDoListLists.indexOf(toDoList);
    
    let tempToDoList = newToDoListLists[index];
    tempToDoList.name = value;

    this.setState({
      toDoLists: newToDoListLists
    })
  }


  addNewItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
    this.toggleUndoRedoButtons();
  }

  toDoListItemMoveTransaction = (toDoListItem, operation) => {
    let transaction = new MoveItem_Transaction(this, toDoListItem, operation);
    this.tps.addTransaction(transaction);
    this.toggleUndoRedoButtons();
  }

  toDoListItemChangeTransaction = (toDoListItem, operation, value) => {
    let transaction = new ChangeItem_Transaction(this, toDoListItem, operation, value);
    this.tps.addTransaction(transaction);
    this.toggleUndoRedoButtons();
  }

  showModal = () => {
    let modal = document.getElementById("delete-list-modal");
    modal.style.display = "block";
  }

  hideModal = () => {
    let modal = document.getElementById("delete-list-modal");
    modal.style.display = "none";
  }

  inactiveUndoButton= () => {
    document.getElementById("undo-button").classList.add("disabled-button");
  }

  activeUndoButton= () => {
      document.getElementById("undo-button").classList.remove("disabled-button");
  }

  inactiveRedoButton= () => {
      document.getElementById("redo-button").classList.add("disabled-button");
  }

  activeRedoButton= () => {
      document.getElementById("redo-button").classList.remove("disabled-button");
  }

  activeListItemButtons(){
    //TOGGLE BUTTONS FOR ACTIVE LIST
    document.getElementById("add-list-button").classList.add("disabled-button");
    document.getElementById("add-item-button").classList.remove("disabled-button");
    document.getElementById("delete-list-button").classList.remove("disabled-button");
    document.getElementById("close-list-button").classList.remove("disabled-button");
  }

  inactiveListItemButtons = () => {
    //TOGGLE BUTTONS FOR INACTIVE LIST
    document.getElementById("add-list-button").classList.remove("disabled-button");
    document.getElementById("add-item-button").classList.add("disabled-button");
    document.getElementById("delete-list-button").classList.add("disabled-button");
    document.getElementById("close-list-button").classList.add("disabled-button");
  }

  toggleUndoRedoButtons = () => {
    if(this.tps.hasTransactionToUndo())
        this.activeUndoButton();
    else
        this.inactiveUndoButton();
    if(this.tps.hasTransactionToRedo())
        this.activeRedoButton();
    else
        this.inactiveRedoButton();
    }
  
    updateToDoListItemArrows = () => {
      let toDoItemsList = this.state.currentList.items;
      var i;

      for (i = 0; i < toDoItemsList.length; i++) {
        document.getElementById("todo-list-arrow-up-"+ toDoItemsList[i].id).classList.remove("disabled-button");
        document.getElementById("todo-list-arrow-down-"+ toDoItemsList[i].id).classList.remove("disabled-button");
      }

      document.getElementById("todo-list-arrow-up-"+ toDoItemsList[0].id).classList.add("disabled-button");
      document.getElementById("todo-list-arrow-down-"+ toDoItemsList[toDoItemsList.length - 1].id).classList.add("disabled-button");
    }

  render() {
   let items = null;
    if(this.state.currentList != null)
      items = this.state.currentList.items;
    else
      items = [];
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          toDoListNameChangeCallback = {this.toDoListChange}
        />
        <Workspace 
          toDoListItems={items} 
          addNewToDoListItemCallback={this.addNewItemTransaction}
          deleteListCallback={this.showModal}
          toDoListItemMoveCallback={this.toDoListItemMoveTransaction}
          toDoListItemChangeCallback = {this.toDoListItemChangeTransaction}
          undoListItemCallback = {this.undoListItem}
          redoListItemCallback = {this.redoListItem}
          closeListCallback = {this.closeList}
        />
        <Modal 
        confirmDeleteCallback ={this.deleteList}
        handleHideModal = {this.hideModal}
        />
      </div>
    );
  }
}

export default App;