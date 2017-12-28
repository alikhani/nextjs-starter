import withFacebook from '../lib/withFacebook'
import LoginContainer from '../containers/LoginContainer'

const LoginPage = (props) => {
  return (
    <div>
      <h1>login</h1>
      <LoginContainer fbAccessToken={props.fbAccessToken} fb={props.fb} />
    </div>
  )
}

export default withFacebook(LoginPage)
