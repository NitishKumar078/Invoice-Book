import './home.css';
import addicon from './asset/iconExample-plus-square-multiple-lined.svg';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return(
    <>
    <div className='createcart'>
    <NavLink to="/Create" className="btn " id="customBtn" >
        create
        <img 
          src={addicon} 
          id="newIdIcon" 
          style={{ width: '25px', marginLeft: '4px', marginRight: '11px' }} 
        />
      </NavLink>
    </div>
     
    </>
  );
}
