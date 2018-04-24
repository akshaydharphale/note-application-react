import React, { PureComponent } from "react";
import validator from "validator";
import styles from "./assets/css/styles.css";

type Props = {
  redirectToPage: () => void
};

class Create extends PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",

      titleError: "",
      textError: "",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (this.state.titleError != "" || this.state.textError != "") {
      this.setState({
        titleError: "",
        textError: ""
      });
    }
  }

  _replaceNumeric() {
    var x = document.getElementById("titleId");
    x.value = x.value.replace(/[^a-zA-Z\s]/g, "");
    if (x.value.length > 40) {
      x.value = x.value.slice(0, 40);
    }
  }

  insertNote(note) {
    if (localStorage.getItem("notes") === null) {
      let notes = [];
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      let notes = JSON.parse(localStorage.getItem("notes"));
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    this.props.redirectToPage("List");
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let error = false;
    let tempName = this.state.title;
    tempName = tempName.replace(/ /g, "");

    if (!validator.isLength(this.state.title, { min: 1 })) {
      this.setState({ titleError: "Title is required" });
      error = true;
    } else if (!validator.isAlpha(tempName)) {
      this.setState({ titleError: "Please enter a valid title" });
      error = true;
    } else {
      this.setState({ titleError: "" });
    }

    if (!validator.isLength(this.state.text, { min: 1 })) {
      this.setState({ textError: "Details are required" });
      error = true;
    } else {
      this.setState({ textError: "" });
    }

    if (!error) {
      let dObj = new Date();
      let formData = {};
      formData.title = this.state.title.trim();
      formData.text = this.state.text.trim();
      formData.timeId = dObj.getTime();

      this.insertNote(formData);

      this.setState({
        title: "",
        text: ""
      });
    }
  }

  render() {
    return (
      <div className="w3-container">
        <p>
          <td><button onClick={() => this.props.redirectToPage('List')} >Back to Homepage</button>&#9;</td>
        </p>
        <h2>New Note</h2>
        <p>Add new note to your list.</p>
        <form>
          <table className="w3-table-all w3-large">
            <tbody>
              <tr className="w3-indigo">
                <th>Title</th>
                <th>Additional Details</th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    id="titleId"
                    name="title"
                    maxLength="20"
                    onKeyUp={this._replaceNumeric}
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                </td>
                <td>
                  <textarea
                    id="textId"
                    name="text"
                    maxLength="400"
                    value={this.state.text}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="title">{this.state.titleError}</label>
                </td>
                <td>
                  <label htmlFor="textId">{this.state.textError}</label>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <button className="w3-teal" onClick={this.handleFormSubmit}>SAVE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

}

export default Create;
