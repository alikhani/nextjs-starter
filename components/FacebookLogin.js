import React from 'react';
import 'isomorphic-unfetch'

export default class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
    this.FB = props.fb;
    this.state = {
       message: ""
    };

    this.onLogin = this.onLogin.bind(this)
    this.serverAuth = this.serverAuth.bind(this)
   }

   componentDidMount() {
     this.FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
     this.FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));
   }

   onStatusChange(response) {
     console.log( response );
     var self = this;

     if( response.status === "connected" ) {
       this.FB.api('/me', function(resp) {
         var message = "Welcome " + resp.name;
         self.serverAuth(response);
         self.setState({ message: message });
       })
     }
   }

   async serverAuth(response) {
     const opts = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(response.authResponse),
     };
     const resp = await fetch('/api/auth/facebook', opts);
     const json = await resp.json();
     if (resp.status >= 400 || !json.token) {
       this.setState({ loading: false, error: json });
     } else {
       this.props.handleLoggedIn(json.token)
     }
   }

   onLogout(response) {
      this.setState({
         message: ""
      });
   }

   onLogin() {
     this.FB.login((response) => {
       console.log('login response: ',response);
      }, {scope: 'public_profile,email,user_location,user_birthday'});
   }

   render() {
     return (
       <div>
        <button onClick={this.onLogin}>fb login</button>
        <div>{this.state.message}</div>
      </div>
    );
  }
};
