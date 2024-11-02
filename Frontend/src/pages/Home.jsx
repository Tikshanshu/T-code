import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [isGridLayout, setIsGridLayout] = useState(
    localStorage.getItem("isGridLayout") === "false" ? false : true
  );
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [projTitle,setProjTitle]=useState("");
  const [data,setData]=useState(null);
  const [Er,setEr]=useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const navigate=useNavigate();

  // Function to toggle the layout
  const toggleLayout = () => {
    const newLayout = !isGridLayout;
    setIsGridLayout(newLayout);
    localStorage.setItem("isGridLayout", newLayout);
  };


  // Filter data based on search query
  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case insensitive filtering
  ) : [];


  const createProj=(e)=>{
    if(projTitle=="")
    {
      alert("Please enter project title");
    }
    else{
      fetch(api_base_url+"/createProject",{
        method:"POST",
        mode:"cors",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          "title":projTitle,
          userId:localStorage.getItem("userId")
          })
      })
      .then(response => response.json())
      .then(data => {
        if(data.success)
        {
          setIsCreateModelShow(false);
          setProjTitle("");
          alert("Project created successfully");
          navigate(`/editor/:${data.projectId}`);
        }
        else
        {
          alert("Failed to create project");
        }
      })
    }
  }

  const getProj=()=>{
    fetch(api_base_url+"/getProjects",{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        "userId":localStorage.getItem("userId")
        })
  })
  .then(response=>response.json())
  .then((data)=>{
    if(data.success)
    {
       setData(data.projects);
    }
    else{
      setEr(data.message);
      alert("Failed to get projects");
    }
  })
  };


  useEffect(() => {
    getProj();
  }, []);

  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");;

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setUserData(data.user);
      }
      else {
        setUserError(data.message);
      }
    })
  }, [])



  return (
    <>
      <Navbar toggleLayout={toggleLayout}/>
    <div className='flex items-center justify-between px-[100px] my-[40px]'>
        <h2 className='text-2xl'>Hi,  {userData ? userData.username : ""}👋</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <input
    type="text"
    placeholder="Search here...!"
    style={{
      padding: '8px',
      borderRadius: '5px',
      backgroundColor: '#1a1a1a',
      color: '#f0f0f0',
      border: 'none',
      width: '280px'
    }}
    value={searchQuery} // Bind search input to searchQuery state
    onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            
  />
  <button onClick={()=>setIsCreateModelShow(true)}
    style={{
      backgroundColor: '#00aeef',
      fontSize:'30px',
      color: '#1A1919',
      border: 'none',
      borderRadius: 'none',
      width: '35px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}
  >
    +
  </button>
</div>

    </div>
        {/* Project Display */}
      <div className="cards">
        {
          isGridLayout ?
            <div className='grid px-[100px]'>
              {
                filteredData.length > 0 ? filteredData.map((item, index) => (
                  <GridCard key={index} item={item} />
                )) : <p>No projects found</p>
              }
            </div>
            : <div className='list px-[100px]'>
              {
                filteredData.length > 0 ? filteredData.map((item, index) => (
                  <ListCard key={index} item={item} />
                )) : <p>No projects found</p>
              }
            </div>
        }
      </div>
     {
      isCreateModelShow?( <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex items-center justify-center">
        <div className="createModel w-[25vw] h-[32vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
          <h3 className="text-2xl">Create New Project</h3>
          <div className="inputBox bg-[#202020] mt-4">
            <input onChange={(e)=>setProjTitle(e.target.value)} type="text" placeholder="Project Title" value={projTitle} />
          </div>
          <div className="flex items-center gap-[10px] w-full mt-2">
            <button onClick={createProj} className="btnBlue rounded-[5px] w-[49%] mb-4 px-[10px] py-[10px]">
              Create
            </button>
            <button onClick={()=>setIsCreateModelShow(false)} className="btnBlue bg-[#1A1919] rounded-[5px] w-[49%] mb-4 px-[10px] py-[10px]">
              Cancel
            </button>
          </div>
        </div>
      </div>):""
     }
    </>
  );
};

export default Home;
