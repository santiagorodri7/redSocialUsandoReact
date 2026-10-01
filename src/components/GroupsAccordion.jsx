import { useState } from 'react'

export default function GroupsAccordion() {
  const [openPanel, setOpenPanel] = useState(null)
  const toggle = (panel) => setOpenPanel(openPanel === panel ? null : panel)

  return (
    <div className="w3-card w3-round">
      <div className="w3-white">
        <button onClick={() => toggle('groups')} className={`w3-button w3-block w3-left-align ${openPanel === 'groups' ? 'w3-theme-d1' : 'w3-theme-l1'}`}>
          <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups
        </button>
        {openPanel === 'groups' && <div className="w3-container"><p>Some text..</p></div>}

        <button onClick={() => toggle('events')} className={`w3-button w3-block w3-left-align ${openPanel === 'events' ? 'w3-theme-d1' : 'w3-theme-l1'}`}>
          <i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events
        </button>
        {openPanel === 'events' && <div className="w3-container"><p>Some other text..</p></div>}

        <button onClick={() => toggle('photos')} className={`w3-button w3-block w3-left-align ${openPanel === 'photos' ? 'w3-theme-d1' : 'w3-theme-l1'}`}>
          <i className="fa fa-users fa-fw w3-margin-right"></i> My Photos
        </button>
        {openPanel === 'photos' && (
          <div className="w3-container">
            <div className="w3-row-padding">
              <br />
              {['lights', 'nature', 'mountains', 'forest', 'nature', 'snow'].map((img, i) => (
                <div className="w3-half" key={i}>
                  <img src={`https://www.w3schools.com/w3images/${img}.jpg`} style={{ width: '100%' }} className="w3-margin-bottom" alt="" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}