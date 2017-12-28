import Head from 'next/head'
import NavLink from './NavLink'

export default ({ children }) => {
  return (
  <div className="app">
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="Header">
      <div className="Logo">
        Test
      </div>
      <nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/posts'>Posts</NavLink>
      </nav>
    </div>
    <main>
      <div className="Container">
        { children }
      </div>
    </main>
    <style global jsx>{`
      html, body {
        margin: 0;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
      }
      .app {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      main {
        display: flex;
        justify-content: center;
        padding: 2em;
      }
      .Container {
        width: 75em;
      }
      .Header {
        height: 5em;
        padding: 0 2em;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 10px 1px rgba(0, 0, 0, .5);
      }
      .Logo {
        font-Size: 20px;
        text-transform: uppercase;
        font-weight: 800;
      }
      nav {
        height: 100%;
        display: flex;
        align-items: center;
        flex-grow: 1;
        margin: 0 1em;
      }
      a {
        text-decoration: none;
        color: #000;
      }
   `}</style>
  </div>
)}
