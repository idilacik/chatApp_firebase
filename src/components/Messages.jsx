import { auth } from "../firebase";

const Messages = ({ data }) => {
  // eger mesaji bu cihazda oturumu acik olan user attiysa mesaj sag tarafta gorunecek
  if (auth.currentUser.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }

  // eger mesaji farkli bir user attiysa mesajlar sol tarafta gorunecek
  return (
    <div className="msg-other">
      <div>
        <img src={data.author.photo} alt="profile picture" />
        <span>{data.author.name}</span>
      </div>

      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Messages;
