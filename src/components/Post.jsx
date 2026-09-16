import React from 'react'

export default function Post({ data }) {
  return (
    <div className="w3-container w3-card w3-white w3-round w3-margin">
      <br />
      <img src={data.avatar} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
      <span className="w3-right w3-opacity">{data.time}</span>
      <h4>{data.name}</h4>
      <br />
      <hr className="w3-clear" />

      {data.blocks.map((block, i) => {
        if (block.type === 'text') return <p key={i}>{block.content}</p>
        if (block.type === 'images') {
          return block.content.length === 1 ? (
            <img key={i} src={block.content[0]} style={{ width: '100%' }} className="w3-margin-bottom" alt="" />
          ) : (
            <div key={i} className="w3-row-padding" style={{ margin: '0 -16px' }}>
              {block.content.map((img, j) => (
                <div className="w3-half" key={j}>
                  <img src={img} style={{ width: '100%' }} className="w3-margin-bottom" alt="" />
                </div>
              ))}
            </div>
          )
        }
        return null
      })}

      <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i> Like</button>
      <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i> Comment</button>
    </div>
  )
}