import React from 'react';
import deleteImg from '../Images/delete.png';
import codeImg from '../Images/code.png';

const GridCard = () => {
  return (
    <div className="gridCard bg-[#141414] w-[270px] h-[200px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50 p-[10px]">
      <img className="w-[90px]" src={codeImg} alt="" />
      <h3 className="text-[20px] w-[90%] line-clamp-1">My first project</h3>
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-[gray]">Created in 9 mon 2023</p>
        <img className="w-[20px] cursor-pointer" src={deleteImg} alt="" />
      </div>
    </div>
  );
};

export default GridCard;
