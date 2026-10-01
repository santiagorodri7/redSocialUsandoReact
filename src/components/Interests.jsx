export default function Interests() {
  const tags = [
    { label: 'News', cls: 'w3-theme-d5' }, { label: 'W3Schools', cls: 'w3-theme-d4' },
    { label: 'Labels', cls: 'w3-theme-d3' }, { label: 'Games', cls: 'w3-theme-d2' },
    { label: 'Friends', cls: 'w3-theme-d1' }, { label: 'Games', cls: 'w3-theme' },
    { label: 'Friends', cls: 'w3-theme-l1' }, { label: 'Food', cls: 'w3-theme-l2' },
    { label: 'Design', cls: 'w3-theme-l3' }, { label: 'Art', cls: 'w3-theme-l4' },
    { label: 'Photos', cls: 'w3-theme-l5' },
  ]

  return (
    <div className="w3-card w3-round w3-white w3-hide-small">
      <div className="w3-container">
        <p>Interests</p>
        <p>
          {tags.map((tag, i) => (
            <span key={i} className={`w3-tag w3-small ${tag.cls}`} style={{ marginRight: '4px' }}>{tag.label}</span>
          ))}
        </p>
      </div>
    </div>
  )
}