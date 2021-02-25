import React, { useEffect, useState} from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";
import db from "../firebase";
import "./SearchField.css";
import {useHistory} from 'react-router-dom'


function SearchField() {

  const [users, setusers] = useState([]);
  
  var user = db.firestore().collection("users");
  const history = useHistory()

  useEffect(() => {
    user.onSnapshot((snapshot) => {
      setusers(snapshot.docs.map((doc) => doc.data().username));
      
    });
  }, []);


  const keyUp = (event) => {
    
    if(event.charCode === 13){
        console.log(event.target.value, event.target.getAttribute('key'))
        history.push(`/profile/${event.target.value}`)
}
}
  return (
    <div>
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input
          placeholder="Search Twitter"
          list="users"
          name="user"
          id="user"
          onKeyPress={keyUp}
        />
        <datalist id="users">
          {users.map((user, i) => (
            <option key={i} value={user} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default SearchField;
