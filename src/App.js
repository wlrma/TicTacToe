import React, { Component } from 'react'
import Game from './components/Game';
import './App.css';
import Modal from './components/Modal';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      show: false
    }
  }

  showModal(message) {
    this.setState({ message: message, show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Game showModal={(msg) => this.showModal(msg)} />
        <Modal show={this.state.show} handleClose={()=>this.hideModal()}>
          <h1>{this.state.message}</h1>
        </Modal>
      </div>
    )
  }
}
