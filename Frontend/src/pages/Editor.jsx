import React, { useState,useEffect } from "react";
import EditiorNavbar from "../components/EditiorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";

const Editior = () => {
  const [isLightMode, setlightMode] = useState(false);
  const [isExpanded, setisExpanded] = useState(false);
  const [tab, settab] = useState("html");

  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

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
    iframe.srcdoc=html+css+js;
  };

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200);
  }, []);

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
                value="<!-- HTML IDE  Created by Tikshanshu Jaiswal-->"
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
                value="/*CSS IDE  Created by Tikshanshu Jaiswal*/"
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
                value="// JS IDE  Created by Tikshanshu Jaiswal"
              />
            </>
          )}
        </div>
        <iframe
          id="iframe"
          className={`bg-[#fff] min-h-[75vh] w-[${isExpanded ? "0%" : "50%"}] ${
            isExpanded ? "hidden" : ""
          } text-black`}
        >
          iframe
        </iframe>
      </div>
    </>
  );
};

export default Editior;
