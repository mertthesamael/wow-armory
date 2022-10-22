import axios from "axios";
import React, { useState } from "react";

const DataContext = React.createContext({
    token:''
})

export const DateContextWrapper = (props) => {

  const [name, setName] = useState("evilmerto")
  const [realm, setRealm] = useState("draenor")
  const [region, setRegion] = useState("eu")

  const [token, setToken] = useState()

  const nameHandler = (value) => {
      return setName(value)
  }
  const regionHandler = (value) => {
    return setRegion(value)
  }
  const realmHandler = (value) => {
    return setRealm(value)
  }
    //Client Credentials flow
    

    var options = {
      method: 'POST',
      url: 'https://oauth.battle.net/token',
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_BNET_ID,
        client_secret: process.env.REACT_APP_BNET_SECRET,
      })
    };
    
    axios.request(options).then(function (response) {
      
      setToken(response.data.access_token)
    }).catch(function (error) {
      console.error(error);
    });

return(
    <DataContext.Provider value={{
        token:token,
        name:name,
        realm:realm,
        region:region,
        onSetName:nameHandler,
        onSetRegion:regionHandler,
        onSetRealm:realmHandler
    }}>
        {props.children}
    </DataContext.Provider>
)
}

export {DataContext}