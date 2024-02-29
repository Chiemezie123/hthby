import React from 'react';
import { useNavigate } from 'react-router-dom';
import compass from "/image/compass.svg";
import settings from "/image/Fill 1172.svg";
import book from "/image/book.svg";
import love from "/image/love.svg";
import logout from "/image/logout.svg";
import sideImg from "/image/sideImg.svg";
import Group from "/image/Group.svg";
import music from "/image/Frame 19.svg";
import Button from '../sharedComponents/Button';
function SideBar() {
  const  buttonProps = [
            {id:1,link : "#",logo: Group},
            {id:2,link : "#",logo: sideImg},
            {id:3,link : "#",logo: compass},
            {id:4,link : "#",logo: music},
            {id:5,link : "#",logo:love},
            {id:6,link : "#",logo: book},
            {id:7,link : "#",logo: settings},            
            {id:8,link : "/logout",logo: logout},
  ]
  
  // const nav = useNavigate();
  // const logoutHandler =()=>{
  //   nav("/logout");
  // }
  return (
    <div className='bg-gray-100 h-full' >
    <div className='flex flex-col py-6 px-8 relative  h-full'  >
         <div className=' pb-6' >
          <Button link={buttonProps[0].link} logo={buttonProps[0].logo}/>
          <Button link={buttonProps[1].link} logo={buttonProps[1].logo }/>
         </div>
         <div className='flex flex-col py-8 items-center'>
          <Button className="py-3" link={buttonProps[2].link} logo={buttonProps[2].logo}/>
          <Button className="py-3"  link={buttonProps[3].link} logo={buttonProps[3].logo}/>
          <Button className="py-3"  link={buttonProps[4].link} logo={buttonProps[4].logo}/>
          <Button className="py-3"  link={buttonProps[5].link} logo={buttonProps[5].logo}/>
         </div>
         <div className='flex flex-col item-center absolute  bottom-0 px-2'>
          <Button className="py-3" link={buttonProps[6].link} logo={buttonProps[6].logo}/>
          <Button className="py-3" link={buttonProps[7].link} logo={buttonProps[7].logo}/>
         </div>
    </div>
  </div>
  
  )
}

export default SideBar
