import { useState, useEffect, useRef } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Row from "./Row";

function App() {
  const [newName, setNewName] = useState("");
  const [newSname, setNewSname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const emailRef = useRef(null);

  const sendUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      email: newEmail,
      sname: newSname,
    });

    firstRef.current.value = "";
    lastRef.current.value = "";
    emailRef.current.value = "";
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <div className="App">
        <div className="flex-container">
          <input
            ref={firstRef}
            type="text"
            className="ime"
            placeholder="Your firstname"
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            onKeyPress={(event) => {
              if (!/[A-Za-z]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <input
            ref={lastRef}
            type="text"
            className="priimek"
            placeholder="Your lastname"
            onChange={(event) => {
              setNewSname(event.target.value);
            }}
            onKeyPress={(event) => {
              if (!/[A-Za-z]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <input
            ref={emailRef}
            type="text"
            className="mejl"
            placeholder="Your e-mail"
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
          />

          <button className="gumb" onClick={sendUser}>
            Send
          </button>
        </div>

        <div className="wrap">
          <table className="flex-table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>E-mail</th>
              </tr>
            </thead>
          </table>
          {users.map((users) => {
            return (
              <div>
                <table className="flex-table">
                  <tbody>
                    <Row users={users} />
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
