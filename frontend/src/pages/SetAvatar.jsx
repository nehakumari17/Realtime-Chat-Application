import React, { useEffect, useState } from 'react'
import axios from "axios"
import loader from "../assets/loader.gif"
import toast, {Toaster} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import {Buffer} from "buffer"

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/171729"
  const navigate = useNavigate()

  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const setProfilePicture = async () => {}

  useEffect(async () => {
    const data = []
    for(let i=0; i<4; i++) {
      const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
      const buffer = new Buffer(image.data)
      data.push(buffer.toString("base64"))
    }
    setAvatars(data)
    setIsLoading(false)
  }, [])
  return (

    <div>
      <div></div>
      <div>
        {avatars.map((avatar, index) => {
          return (
            <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" key={avatar} onClick={() => setSelectedAvatar(index)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SetAvatar