import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

function App() {
  // kullanici giris yapti mi state'i
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  // kullnicinin girdigi oda state'i
  const [room, setRoom] = useState(null);

  //  kullanıcı yetkisi yoksa: login sayfası
  if (!isAuth) {
    return <LoginPage setIsAuth={setIsAuth} />;
  }
  // kullanıcı yetkisi varsa:
  return (
    <div className="container">
      {room ? (
        // oda seciliyse sohbet sayfasi
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        // oda secili degilse oda secme sayfasi
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      )}
    </div>
  );
}

export default App;
