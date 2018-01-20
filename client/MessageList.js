import React from 'react';

import styles from './MessageList.css';

const DeleteButton = props => (
  <button className={styles.DeleteButton} onClick={() => props.removeMessage(props)}>
    x
  </button>
)


const Message = props => (
  <div className={styles.Message}>
    <strong>{props.from} :</strong>
    <span>{props.text}</span>
    <span className={styles.MessageDate}>{props.date}</span>
  </div>
);

const MessageList = props => {
  return (
    <div className={styles.MessageList}>
      {props.messages.map((message, i) => {
        return (
          <div className={styles.MessageRow} key={i}>
            <Message key={message.id} from={message.from} text={message.text} date={message.date} />
            {message.from === props.user && <DeleteButton key={message.id + 1} id={message.id} from={message.from} removeMessage={id => props.removeMessage(id)} />
            }
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
