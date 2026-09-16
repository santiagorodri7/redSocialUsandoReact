import React, { useState } from 'react'

export default function AlertBox() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
      <span onClick={() => setVisible(false)} className="w3-button w3-theme-l3 w3-display-topright">
        <i className="fa fa-remove"></i>
      </span>
      <p><strong>Hey!</strong></p>
      <p>People are looking at your profile. Find out who.</p>
    </div>
  )
}