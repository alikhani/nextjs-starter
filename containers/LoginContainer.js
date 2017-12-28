import React from 'react'
import fetch from 'isomorphic-unfetch'

import redirect from '../lib/redirect'
import { setCookie } from '../lib/Cookies'
import FacebookLogin from '../components/FacebookLogin'

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: false,
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this)
  }

  updateEmail(e) {
    const email = e.target.value.trim();
    this.setState({ email });
  }
  updatePassword(e) {
    const password = e.target.value.trim();
    this.setState({ password });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.login();
  }

  handleLoggedIn(token) {
    setCookie('token', token)
    redirect({}, '/')
  }

  async login() {
    const { email, password } = this.state;

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    };
    const resp = await fetch('/api/auth/local', opts);
    const json = await resp.json();
    if (resp.status >= 400 || !json.token) {
      this.setState({ loading: false, error: json });
    } else {
      this.handleLoggedIn(json.token)
    }
  }

  render() {
    console.log('LoginContainer: ',this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="text" onChange={this.updateEmail} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" onChange={this.updatePassword} />
          </div>
          <button>
            {this.state.loading
              ?
              <div>loading...</div>
              :
              'Log in'
            }
          </button>
        </form>
        {(this.props.fb && !this.props.fbAccessToken) && <FacebookLogin fb={this.props.fb} handleLoggedIn={this.handleLoggedIn} />}
      </div>
    )
  }
}
