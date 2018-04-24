import React, { PureComponent } from "react";
import validator from "validator";
import styles from "./assets/css/styles.css";

type Props = {
  redirectToPage: () => void,
};

class List extends PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      notes: JSON.parse(localStorage.getItem("notes")),
      order: 'ascending'
    };
  }

  formatDate(timeId) {
    let dataObj = new Date(timeId);
    let hours = dataObj.getHours();
    let suffix = hours > 12 ? " PM" : " AM";
    hours = hours > 12 ? hours - 12 : hours;
    let minutes = dataObj.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let currDate =
      dataObj.toDateString() + ", " + hours + ":" + minutes + suffix;
    return currDate;
  }

  ascending(a, b) {
    if (a.timeId < b.timeId)
      return -1;
    if (a.timeId > b.timeId)
      return 1;
    return 0;
  }

  descending(a, b) {
    if (a.timeId > b.timeId)
      return -1;
    if (a.timeId < b.timeId)
      return 1;
    return 0;
  }

  renderNote(task) {
    let createDate = this.formatDate(task.timeId);
    let details = task.text;
    details = details.length > 100 ? details.substring(0, 100) + "..." : details;

    return (
      <tr onClick={() => this.props.redirectToPage('Details',task.timeId) }>
        <td>{task.title}</td>
        <td>{createDate}</td>
        <td>{details}</td>
      </tr>
    );
  }

  renderNotes() {
    let notes = this.state.notes;
    if (notes && notes.length) {
      return (
        <table className="w3-table-all w3-hoverable w3-large w3-light-blue">
          <tbody>
            <tr className="w3-indigo">
              <th>Title</th>
              <th>Created/Updated</th>
              <th>Details</th>
            </tr>
            {this.renderNoteList(notes)}
          </tbody>
        </table>
      );
    } else {
      return;
    }
  }

  renderNoteList(notes) {
    if (this.state.order === 'descending'){
      notes.sort(this.descending);
    }else{
      notes.sort(this.ascending);
    }
    return notes.map((task, id) => {
      return this.renderNote(task);
    });
  }

  renderFilter(){
    let notes = this.state.notes;
    if (notes && notes.length) {
    return (<tr>
      <td><h5>Sort By: </h5></td>
      <td><button onClick={() => this.setState({ order: 'descending' })}>Newest First</button></td>
      <td><button onClick={() => this.setState({ order: 'ascending' })}>Oldest First</button></td>
    </tr>);
    }
  }
  renderHeader(){
    return (<div className="w3-container">
      <p>
        <table>
          <tbody>
            <tr><h3>Notes App</h3></tr>
            <tr><button onClick={() => this.props.redirectToPage('Create')}  >Add New Note</button></tr>
              
            {this.renderFilter}
          </tbody>
        </table>
      </p>
      </div>
    );
  }

  render() {
    return <div>
      {this.renderHeader()}
      {this.renderNotes()}
    </div>;
  }
}

export default List;
