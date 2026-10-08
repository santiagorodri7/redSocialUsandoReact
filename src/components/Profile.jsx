export default function Profile({ user }) {
  return (
    <div className="w3-card w3-round w3-white">
      <div className="w3-container">
        <h4 className="w3-center">Mi perfil</h4>
        <p className="w3-center">
          <img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{ height: '106px', width: '106px' }} alt="Avatar" />
        </p>
        <hr />
        <p><i className="fa fa-user fa-fw w3-margin-right w3-text-theme"></i>{user.nombre}</p>
        <p><i className="fa fa-envelope fa-fw w3-margin-right w3-text-theme"></i>{user.email}</p>
      </div>
    </div>
  )
}