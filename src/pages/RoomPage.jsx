const RoomPage = ({ setIsAuth, setRoom }) => {
  // cikis
  const logout = () => {
    // yetki state'ini false'a cekeriz
    setIsAuth(false);
    // local'deki tokeni kaldir
    localStorage.removeItem("token");
  };
  // form gonderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputtaki girdiyi al ve kucuk harfe cevirerek buyuk kucuk harf duyarliligini kaldir
    const room = e.target[0].value.toLocaleLowerCase();
    // state'i guncelle
    setRoom(room);
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Girecesiniz</p>

      <input placeholder="örn: haftaiçi" type="text" required />

      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">
        Çıkıș Yap
      </button>
    </form>
  );
};

export default RoomPage;
