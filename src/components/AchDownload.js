import API from '../../api'

async function downloadAchievements(achievements) {
  window.open(URL.createObjectURL(new Blob([`
    <style>
      body {
        width: 100%;
        max-width: 630px;
        padding: 2rem 19;
        font-family: sans-serif;
        margin: auto;
      }
      section {
        border-top: 1px solid #aaa;
      }
    </style>
    <script>window.onload = print</script>
    <h1>&#128162; Record of Achievement</h1>
    <div>
      ${achievements.map(achievement => `
        <section>
          <h3>${achievement.Date || '(Undated)'}, ${achievement.Name} ${achievement.Type ? `(${achievement.Type})` : ''}</h3>
          <p>Subjects: ${achievement.Associations.join(', ')}</p>
          <p>Description: ${achievement.Description || 'No description'}</p>
          <p>References: ${achievement.References || 'None'}</p>
        </section>
      `).join('')}
    </div>
  `],
  { type: 'text/html' }
  )))
}

export default () => {

  return (
    <div>
      <h2>Download</h2>
      <section>
        <p>Download all your achievements as a permanent document</p>
          <button onClick={() => downloadAchievements(achievements)}>
            Download now
          </button>
      </section>
  </div>
  )

}
