import React from 'react';
import img from '../images/code.png';
import deleteImg from '../images/delete.png';

const ListCard = () => {
  return (
    <div className="listCard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
      <div className="flex items-center gap-2">
        <img className="w-[80px]" src={img} alt="" />
        <div>
          <h3 className="text-[20px]">My first project</h3>
          <p className="text-[gray] text-[14px]">Created in 9 mon 2023</p>
        </div>
      </div>
      <img className="w-[30px] cursor-pointer mr-4" src={deleteImg} alt="" />
    </div>
  );
};

export default ListCard;
