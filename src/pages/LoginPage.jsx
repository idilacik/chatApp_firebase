import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = ({ setIsAuth }) => {
  // butona tiklayinca calisacak fonksiyonu yaz
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        // state'i guncelle
        setIsAuth(data.user.refreshToken);

        // local storage'i guncelle
        localStorage.setItem("token", data.user.refreshToken);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>

        <p>Devam etmek için giriş yapınız</p>

        <button onClick={handleClick}>
          <img src="g-logo.png" alt="google" />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
