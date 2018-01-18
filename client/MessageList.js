import React from 'react';

import styles from './MessageList.css';

const DeleteButton = props => (
  <button className={styles.DeleteButton} onClick={() => props.removeMessage(props.id)}>
    x
  </button>
);

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
          <div className={styles.MessageRow} key={message.id}>
            <Message from={message.from} text={message.text} date={message.date} />
            <DeleteButton id={message.id} removeMessage={id => props.removeMessage(id)} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
