import {useCallback, useEffect, useState} from "react";
import {getServerUrl, oAuthRequest} from "../utils/request";

import './FileBrowser.css'
import axios from "axios";

const getRootFolder = () =>{

    let config = {
        method: "get",
        url : `${getServerUrl()}filenet/stores/STORE1/folders`
    }

    return oAuthRequest(config);

}

const getSubfolder = (folder) =>{


    let url = folder.links.find(link => link.rel === "subFolders");

    console.log(decodeURIComponent(url.href));

    let config = {
        method: "get",
        url : decodeURIComponent(url.href),
        maxRedirects: Infinity,
    }

    return oAuthRequest(config);

}


const getFoldersById = (id)=> {

    let config = {
        method: "get",
        url : `${getServerUrl()}`
    }

}

const getFolderFilesByFolderId = (id)=> {

}

const FileBrowser = ()=>{

    const [currentFolders,setCurrentFolders] = useState([]);

    const [navigationStack,setNavigationStack]  = useState([]);

    const handleOpenFolder = (folder) =>{
        setNavigationStack(prevState => [...prevState,folder]);
    }

    useEffect(()=>{

        console.log("start up")
        getRootFolder().then((result) => {

            setCurrentFolders(result);
        })

    },[])

    useEffect(()=>{

        console.log("navigation change")

        if (navigationStack && navigationStack.length>0){
            let currentFolder = navigationStack[navigationStack.length-1];

            getSubfolder(currentFolder).then((folders) => {

                setCurrentFolders(folders);

            })

        }


    },[navigationStack])



    return <div className="grid">
        {currentFolders && currentFolders.map(folder => {
            return <div className="folder" key={folder.name} onClick={()=>{handleOpenFolder(folder)}}> {folder.name} </div>
        })}
    </div>

}

export default FileBrowser;
