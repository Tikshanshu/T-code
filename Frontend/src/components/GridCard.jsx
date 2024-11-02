import React, { useState } from 'react';
import deleteImg from '../Images/delete.png';
import codeImg from '../Images/code.png';
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';

const GridCard = ({item}) => {
    const [isDeleteModelShow,setIsDeleteModelShow]=useState(false);

    const navigate=useNavigate();

    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const deleteProj = (id) => {
      fetch(api_base_url + "/deleteProject",{
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progId: id,
          userId: localStorage.getItem("userId")
        })
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          setIsDeleteModelShow(false)
          window.location.reload()
        }else{
          alert(data.message)
          setIsDeleteModelShow(false)
        }
      })
    }

  return (
    <>
    <div onClick={()=>{navigate(`/editor/${item._id}`)}} className="gridCard bg-[#141414] w-[270px] h-[200px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50 p-[10px]">
      <img className="w-[90px]" src={codeImg} alt="" />
      <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-[gray]">Created on {formattedDate}</p>
        <img onClick={()=>setIsDeleteModelShow(true)} className="w-[20px] cursor-pointer" src={deleteImg} alt="" />
      </div>
    </div>
    {
        isDeleteModelShow ? (<div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[30vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className="text-3xl">
            Delete project?<br/> <span className="text-[20px]">This cannot be undone.</span>
            </h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button onClick={()=>{deleteProj(item._id)}} className="p-[10px] rounded-lg bg-[#FF4A43] text-white cursor-pointer min-w-[49%]">
                Delete
              </button>
              <button onClick={()=>setIsDeleteModelShow(false)} className="p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]">
                Cancel
              </button>
            </div>
          </div>
        </div>):""
      }
    </>
  );
};

export default GridCard;
