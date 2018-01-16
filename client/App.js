import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], messages: [], text: '', name: '' };
  }

  renderLayout() {
    return (
       <div className={styles.App}>
         <div className={styles.AppHeader}>
           <div className={styles.AppTitle}>
             ChatApp
           </div>
           <div className={styles.AppRoom}>
             App room
           </div>
         </div>
         <div className={styles.AppBody}>
           <UsersList
             users={this.state.users}
           />
           <div className={styles.MessageWrapper}>
             <MessageList
               messages={this.state.messages}
             />
             <MessageForm
               onMessageSubmit={message => this.handleMessageSubmit(message)}
               name={this.state.name}
             />
           </div>
         </div>
       </div>
    );

  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }
}

export default App;