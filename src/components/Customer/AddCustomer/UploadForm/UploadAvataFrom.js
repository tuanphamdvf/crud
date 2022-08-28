import React from "react";
import { useRef,useState } from "react";
import { Button,Loader } from "rsuite";

import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

function UploadAvataFrom(props) {
  const {getId,IdcusEdit} = props
const idRef = useRef();
const [previewAvata, setPreviewAvata] = useState('');
const[loading, setLoading] = useState(false)
const cld = new Cloudinary({
  cloud: {
    cloudName: 'djh7lsffd'
  }
});

//PREVIEW
const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setPreviewAvata(reader.result);
  };
};

  const inputRef = useRef(null)
  const handleClick =()=>{

    inputRef.current.click();
  }
 const processFile = async (e) => {

    let file = e.target.files[0];
//Cloudinary
    let YOUR_CLOUD_NAME = "djh7lsffd";
    let YOUR_UNSIGNED_UPLOAD_PRESET = "tuanpham";

    let POST_URL = "https://api.cloudinary.com/v1_1/djh7lsffd/auto/upload";

    let XUniqueUploadId = +new Date();
    previewFile(file);
    processFileHandele();

    function processFileHandele(e) {
    
      let size = file.size;
      let sliceSize = 20000000;
      let start = 0;

      setTimeout(loop, 3);

      function loop() {
        let end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        let s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
        }
      }
    }

    function send(piece, start, end, size) {
//XMLHttpRequest
      let formdata = new FormData();
     
      idRef.current = new Date().valueOf();

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("public_id", `idavata${idRef.current}`);

      let xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
     
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload =  function () {
        setLoading(false)
        console.log(this.responseText)
        const id = JSON.parse(this.responseText).public_id
        const newId= id.slice(16,30)
        getId(newId)

      };

      xhr.send(formdata);
    }
//hanlde file
    function slice(file, start, end) {
      let slice = file.mozSlice
        ? file.mozSlice
        : file.webkitSlice
        ? file.webkitSlice
        : file.slice
        ? file.slice
        : noop;

      return slice.bind(file)(start, end);
    }
    function noop() {}
  };

  
    return (
      <div>
        <input ref={inputRef}  id= 'upload_img' type="file" onChange={(processFile)} />
        {!IdcusEdit ? (loading ? <Loader style={{ marginLeft:"20px" }} ></Loader>: (!previewAvata ) ? <Button onClick={handleClick} color="green" >Upload</Button> : (  
                <img
                    src={previewAvata}
                    alt="chosen"
                    style={{ height: '80px' , borderRadius: "6px", cursor:"pointer"}}
                    onClick={handleClick}
                />
            )):   <AdvancedImage className='info--avata--wrapper'  cldImg={cld.image(`tuanpham/${IdcusEdit}`)} />}
        { }
      </div>
    );
  }


export default UploadAvataFrom;
