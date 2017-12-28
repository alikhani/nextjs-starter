import Link from 'next/link'
import { withRouter } from 'next/router'


const NavLink = ({ children, router, href }) => {
  return (
    <Link href={href}>
      <a>
        {children}
        <style jsx>{`
          a {
            color: #000;
            height: 100%;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            text-decoration: none;
            min-width: 10em;
            transition: all .5s ease;
            outline: none;
            justify-content: center;
            border-bottom: 5px solid;
            border-bottom-color: ${router.pathname === href ? '#03A9F4' : 'transparent'};
          }
          a:hover {
            border-bottom-color: #03A9F4;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default withRouter(NavLink)
