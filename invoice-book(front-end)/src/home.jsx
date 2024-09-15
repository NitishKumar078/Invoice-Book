import './home.css';
import addicon from './asset/iconExample-plus-square-multiple-lined.svg';
import { NavLink } from 'react-router-dom';
// import { dialog } from '@tauri-apps/api';


export default function Home() {
  // const showMessage = async () => {
  //   await dialog.message("This is a message dialog", {
  //     title: "Dialog Title",
  //     type: "info", // info, warning, error
  //   });
  // };
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
      <div>
      {/* <button onClick={showMessage}>Show Dialog</button> */}
    </div>
    </div>
     
    </>
  );
}
