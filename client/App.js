import React, { Component } from 'react';
import io from 'socket.io-client';
import styles from './App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('http://localhost:3000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], messages: [], text: '', name: '', date: '', id: '' };
  }

  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({ users }) => this.chatUpdate(users));
    socket.on('delete', id => this.messageRemove(id));
  }

  handleMessageRemove(toRemove) {
    const remainder = this.state.messages.filter(message => message.id !== toRemove.id);
    this.setState({ messages: remainder });
    socket.emit('delete', toRemove);
  }

  messageRemove(toRemove) {
    const id = toRemove.id;
    const remainder = this.state.messages.filter(message => message.id !== id);
    this.setState({ messages: remainder });
  }

  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
  }

  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    socket.emit('message', message);
  }

  handleUserSubmit(name) {
    this.setState({ name });
    socket.emit('join', name);
  }

  chatUpdate(users) {
    this.setState({ users });
  }

  renderLayout() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <div className={styles.AppTitle}>ChatApp</div>
          <div className={styles.AppRoom}>App room</div>
        </div>
        <div className={styles.AppBody}>
          <UsersList users={this.state.users} />
          <div className={styles.MessageWrapper}>
            <MessageList name={this.state.name} messages={this.state.messages} user={this.state.name} removeMessage={id => this.handleMessageRemove(id)} />
            <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name} />
          </div>
        </div>
      </div>
    );
  }

  renderUserForm() {
    return <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />;
  }

  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }
}

export default App;
