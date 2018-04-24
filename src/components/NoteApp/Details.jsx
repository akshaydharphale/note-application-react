import React, { PureComponent } from "react";
import validator from "validator";
import styles from "./assets/css/styles.css";

type Props = {
  redirectToPage: () => void,
  noteId: String
};

class Details extends PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    let noteId = this.props.noteId;

    this.state = {
      notes: JSON.parse(localStorage.getItem("notes")),
      noteId: noteId
    };

    this.deleteNote = this.deleteNote.bind(this);
  }

  formatDate(timeId) {
    let dataObj = new Date(timeId);
    let hours = dataObj.getHours();
  
    let suffix = hours > 12 ? " PM" : " AM";
    hours = hours > 12 ? hours - 12 : hours;

    let minutes = dataObj.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;

    let createDate = dataObj.toDateString() + ", " + hours + ":" + minutes + suffix;

    return createDate;
  }

  deleteNote() {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let noteId = this.state.noteId;
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].timeId == noteId) {
        notes.splice(i, 1);
      }
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    this.props.redirectToPage('List');
  }

  renderNote(noteId) {
    let notes = this.state.notes;

    if (notes && notes.length) {
      return (
        <div>
          <table className="w3-table-all w3-large">
            <tbody>
              <tr className="w3-indigo">
                <th>Title</th>
                <th>Time Created</th>
              </tr>
              {this.renderInfoBox(notes, noteId)}
            </tbody>
          </table>
          <table className="w3-table-all w3-medium">
            <tbody>
              <tr>
                <th>Details</th>
              </tr>
              {this.renderDetails(notes, noteId)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return;
    }
  }

  renderInfoBox(notes, noteId) {
    let createDate;
    return notes.map((task, id) => {
      if (task.timeId === noteId) {
       createDate = this.formatDate(task.timeId);
       return (<tr>
         <td>{task.title}</td>
         <td>{createDate}</td>
       </tr>
       );
          
      }
    });
  }

  renderDetails(notes, noteId) {
    return notes.map((task, id) => {
      if (task.timeId === noteId) {
        return (<tr><td>{task.message}</td></tr>);
      }
    });
  }

  renderHeader() {
    return (
      <div className="w3-container">
        <p>
          <table>
          <tbody>
          <td><button onClick={() => this.props.redirectToPage('List')} >Back to Homepage</button></td>
          <td><button className="w3-teal" onClick={() => this.props.redirectToPage('Edit', this.state.noteId)}>EDIT</button></td>
          <td><button className="w3-red" onClick={this.deleteNote}>DELETE</button></td>
          </tbody>
          </table>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderNote(this.state.noteId)}
      </div>
    );
  }
}

export default Details;
