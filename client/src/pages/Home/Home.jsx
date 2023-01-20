import './Home.styles.scss'
import '../page.scss'
import AppWrap from '../../Wrapper/App_wrapper'
const Home = ({activeMenu}) => {
  return (
    <div className={`${activeMenu ? 'page_content_open' : 'page_content_close'} `}>
      <h1 className='component_title'>Mājas</h1>
      <a href="/">Mājas</a>
    </div>
  )
}

export default AppWrap(Home)