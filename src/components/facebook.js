import { useState } from 'react'
import FacebookLogin from 'react-facebook-login'

function Facebook(){
const [login,setlogin]=useState(false)
const [data,setdata]=useState({})
const [picture,setpicture]=useState("")

const responseFacebook=(Response)=>{

  //if we get unknown status 
  if(Response.status==="unknown"){
  console.log(Response)
  setlogin(false)
  return false
  }
  //if we get status data
  if(Response.accessToken){
    setlogin(true)
    setdata(Response)
    setpicture(Response.picture.data.url)
  }else{
    setlogin(false)
  }
}
//if we click logout button the login status will be false and data and picture will be empty
const logout=()=>{
  setlogin(false)
  setdata({})
  setpicture("")
}

return (
  <div className="App">
   {!login && (
      <FacebookLogin
        appId="image.png"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    )}

    {login && (
      <div className="card">
        <div className="card-body">
          <img className="rounded" src={picture} alt="Profile" />
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">Email ID: {data.email}</p>
          <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    )}
  </div>
);
}

export default Facebook;