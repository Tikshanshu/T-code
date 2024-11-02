import React, { useState,useEffect } from "react";
import EditiorNavbar from "../components/EditiorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import {api_base_url} from "../Helper"


const Editior = () => {
  const [isLightMode, setlightMode] = useState(false);
  const [isExpanded, setisExpanded] = useState(false);
  const [tab, settab] = useState("html");

  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  // Extract projectID from URL using useParams
  const { projectID } = useParams();

  const changeTheme = () => {
    if (isLightMode) {
      document.querySelector(".EditiorNavbar").style.background = "#141414";
      document.body.classList.remove("lightMode");
      setlightMode(false);
    } else {
      document.querySelector(".EditiorNavbar").style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setlightMode(true);
    }
  };

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID // Use projectID here
      })
    })
      .then(res => res.json())
      .then(data => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      });
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default save file dialog
  
        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,  // Make sure projectID is correct
            htmlCode: htmlCode,  // Passing the current HTML code
            cssCode: cssCode,    // Passing the current CSS code
            jsCode: jsCode       // Passing the current JS code
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert("Project saved successfully");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.error("Error saving project:", err);
          alert("Failed to save project. Please try again.");
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditiorNavbar />
      <div className="flex ">
        <div className={`left w-[${isExpanded ? "100vw" : "50%"}]`}>
          <div className=" tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px] ">
            <div className=" tabs flex items-center gap-2">
              <div
                onClick={() => settab("html")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] "
              >
                HTML
              </div>
              <div
                onClick={() => settab("js")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] "
              >
                JavaScript
              </div>
              <div
                onClick={() => settab("css")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] "
              >
                CSS
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme}>
                <MdLightMode />
              </i>
              <i
                className="text-[20px] cursor-pointer"
                onClick={() => setisExpanded(!isExpanded)}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>
          {tab == "html" ? (
            <>
              <Editor
                onChange={(e) => {
                  setHtmlCode(e || "");
                  run();
                }}
                height="75vh"
                theme={isLightMode ? "vs-light" : "vs-dark"}
                language="html"
                value={htmlCode}
              />
            </>
          ) : tab == "css" ? (
            <>
              <Editor
                 onChange={(e) => {
                  setCssCode(e || "");
                  run();
                }}
                height="75vh"
                theme={isLightMode ? "vs-light" : "vs-dark"}
                language="css"
                value={cssCode}
              />
            </>
          ) : (
            <>
              <Editor
                 onChange={(e) => {
                setJsCode(e || "");
                run();
              }}
                height="75vh"
                theme={isLightMode ? "vs-light" : "vs-dark"}
                language="javascript"
                value={jsCode}
              />
            </>
          )}
        </div>
        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-[50%] min-h-[82vh] bg-[#fff] text-black"
            title="output"
          />
        )}
      </div>
    </>
  );
};

export default Editior;
