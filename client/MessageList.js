import React from 'react';

import styles from './MessageList.css';

const DeleteButton = props => <button>x</button>;

const Message = props => (
  <div className={styles.Message}>
    <strong>{props.from} :</strong>
    <span>{props.text}</span>
    <span>{props.date}</span>
    <DeleteButton />
  </div>
);

const MessageList = props => (
  <div className={styles.MessageList}>
    {props.messages.map((message, i) => {
      return <Message key={i} id={message.id} from={message.from} text={message.text} date={message.date} />;
    })}
  </div>
);

export default MessageList;
