import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import TableRows from "./TableRows";

function App() {
  const [newName, setNewName] = useState("");
  const [newSname, setNewSname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const sendUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      email: newEmail,
      sname: newSname,
    });

    window.location.reload(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <div className="flex-container">
        <input
          type="text"
          className="ime"
          placeholder="Ime"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="text"
          className="priimek"
          placeholder="Priimek"
          onChange={(event) => {
            setNewSname(event.target.value);
          }}
        />
        <input
          type="text"
          className="mejl"
          placeholder="E-mail"
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />

        <button className="gumb" onClick={sendUser}>
          Pošlji
        </button>
      </div>

      <div className="wrap">
        <table className="flex-table">
          <thead>
            <tr>
              <th>Ime </th>
              <th>Priimek</th>
              <th>E-mail</th>
            </tr>
          </thead>
        </table>
        {users.map((users) => {
          return (
            <div>
              <table className="flex-table">
                <tbody>
                  <TableRows users={users} />
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
