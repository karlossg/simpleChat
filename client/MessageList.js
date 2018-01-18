import React from 'react';

import styles from './MessageList.css';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  log() {
    console.log(this.props);
  }

  render() {
    return <button onClick={this.log.bind(this)}>x</button>;
  }
}

const Message = props => (
  <div className={styles.Message}>
    <strong>{props.from} :</strong>
    <span>{props.text}</span>
    <span>{props.date}</span>
  </div>
);

const MessageList = props => {
  return (
    <div className={styles.MessageList}>
      {props.messages.map((message, i) => {
        return (
          <div key={message.id}>
            <Message from={message.from} text={message.text} date={message.date} />
            <DeleteButton id={message.id} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
