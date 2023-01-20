import './Catalog.styles.scss'
import '../page.scss'
import AppWrap from '../../Wrapper/App_wrapper'
const Catalog = ({activeMenu}) => {
  return (
    <div className={`${activeMenu ? 'page_content_open' : 'page_content_close'} `}>
      <h1 className='component_title'>Katalogs</h1>
    </div>
  )
}

export default AppWrap(Catalog)