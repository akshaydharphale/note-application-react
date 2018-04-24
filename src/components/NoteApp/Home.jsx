import React, { PureComponent } from "react";
import Create from './Create';
import List from './List';
import Details from './Details';
import Edit from './Edit';

class Home extends PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      page: 'List',
      noteId: ''
    };
  }

  redirectToPage(page,noteId){
    if(noteId){
      this.setState({noteId: noteId });
    }
    this.setState({page:page});
  }

  render() {
    switch (this.state.page){
      case 'Create': return <Create redirectToPage={this.redirectToPage.bind(this)} />;
      case 'Details': return <Details redirectToPage={this.redirectToPage.bind(this)} noteId={this.state.noteId} />;
      case 'Edit': return <Edit redirectToPage={this.redirectToPage.bind(this)} noteId={this.state.noteId} />
      default: return <List redirectToPage={this.redirectToPage.bind(this)} />;
    }
  }
  
}

export default Home;
