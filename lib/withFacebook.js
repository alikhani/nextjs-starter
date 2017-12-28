import React from 'react'

export default ComposedComponent => {
  return class WithFacebook extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        isSdkLoaded: false,
        isProcessing: false,
      }
    }

    componentDidMount() {
      this._isMounted = true;
      if (document.getElementById('facebook-jssdk')) {
        this.sdkLoaded();
        return;
      }
      this.setFbAsyncInit();
      this.loadSdkAsynchronously();
      let fbRoot = document.getElementById('fb-root');
      if (!fbRoot) {
        fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    setStateIfMounted(state) {
      if (this._isMounted) {
        this.setState(state);
      }
    }

    setFbAsyncInit() {
      console.log('fb: ',process.env.FACEBOOK_APP_ID);
      const { appId, xfbml, cookie, version, autoLoad } = this.props;
      window.fbAsyncInit = () => {
        window.FB.init({
          version: `v2.9`,
          appId: process.env.FACEBOOK_APP_ID,
          cookie: false,
          xfbml: false,
        });
        this.setStateIfMounted({ isSdkLoaded: true });
      };
    }

    sdkLoaded() {
      this.setState({ isSdkLoaded: true });
    }

    loadSdkAsynchronously() {
      ((d, s, id) => {
        const element = d.getElementsByTagName(s)[0];
        const fjs = element;
        let js = element;
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=${process.env.FACEBOOK_APP_ID}`;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }

    render () {
      // console.log('withFacebook props: ',this);
      let fb
      let fbAccessToken
      if (this.state.isSdkLoaded) {
        try {
          console.log('sdk is loaded, ',FB);
          FB.getLoginStatus((response) => {
            if (response.status === 'connected') {
              console.log('connected');
              fbAccessToken = response.authResponse.accessToken
            } else {
              console.log('not connected');
            }
          })
          fb = FB
        } catch(err) {
          console.log('error setting upp FB: ',err);
        }
      }
      return (
        <ComposedComponent {...this.props} fb={fb} fbAccessToken={fbAccessToken} />
      )
    }
  }
}
