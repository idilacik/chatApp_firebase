import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useRef, useState } from "react";
import Messages from "../components/Messages";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef(null);

  // form gonderilince mesaji veritabanina kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();

    // mesaj bos mu kontrol et ve bos ise durdur

    if (text.trim() === "") return;

    // mesaj document'inin kaydedilecegi koleksiyonun referansini al

    const messagesCol = collection(db, "messages");

    // referansi alinan koleksiyona document'i ekle
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu temizle
    setText("");
  };

  // mevcut odada gonderilen  mesajlari anlik olarak al
  useEffect(() => {
    // 1) abone olunacak koleksiyonun refereansini al
    const messagesCol = collection(db, "messages");

    // 2) sorgu ayarlarini yap

    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // 3) onSnapshot ile anlik olarak koleksiyondaki butun degisimleri izle her  degisiklikte callback fonk tetikle ve guncellemeleri al(getdocstan farki anlik olarak durumu incelemesi ve yeni mesaj geldiginde koleksiyondan cekmeyi saglar)(snapshot belirli araliklarla ekrani cekiyor yani mapliyor eger farklilik olursa bu fonksiyon tetikleniyor)
    const unsub = onSnapshot(q, (snapshot) => {
      let temp = [];

      //data() methodu ile dokumanlarin icerisindeki veriye erisip gecici diziye aktardik
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      //son mesaja odakla
      lastMsg.current.scrollIntoView({ behavior: "smooth" });

      setMessages(temp);
    });

    // 4) kullanici sayfadan ayrildigi zaman dinlemeyi durdur
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.length < 1 ? (
          <div className="warn">
            <p>Sohbete ilk mesajı gönderin</p>
          </div>
        ) : (
          messages.map((data, key) => <Messages data={data} key={key} />)
        )}

        <div ref={lastMsg} />
      </main>

      <form className="send-form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="mesajınızı yazınız..."
          type="text"
        />

        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
              setIsOpen(false);
            }}
            open={isOpen}
            skinTonesDisabled
          />
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            😊
          </button>
        </div>

        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
