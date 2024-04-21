import React from 'react'
import robot from "../assets/robot.gif"

const Welcome = () => {
  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
    <div>
        <img src={robot} alt="Robot" className="w-96 max-h-full bg-inherit" />
    </div>
</div>

  )
}

export default Welcome