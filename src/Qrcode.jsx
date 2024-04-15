import React, { useState } from 'react'
import "./Qrcode.css" 

export const Qrcode = () => {
    
    const [img,setImage]=useState("./qr.jpg")
    const [loading,setLoading]=useState(false)
    const [qrdata,setQrdata]=useState("nk")
    const [qrsize,setQrsize]=useState("150")

    async function g(){
      setLoading(true);
      try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
        setImage(url)
      }catch(error)
      {
        console.error("it is",error)

      }
      finally{
        setLoading(false)

      }
    }
    

    function down()
    {
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob)
            link.download="qr.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
  return (
    <>
    <center>
    <div className='name'>
    <div className='container'>
        <h1>Qr generater</h1>
        {loading && <p>please wait...</p>}
       {img&&<img src={img} />}<br />
        <label htmlFor="dataInput"> data for Qr code:  </label>
        <input type="text" value={qrdata} id="dataInput" placeholder='website' onChange={(e)=>setQrdata(e.target.value)}/><br />
        <label htmlFor="sizeInput"> image size:   </label>
        <input type="text" value={qrsize}  id="sizeInput" placeholder='size' onChange={(e)=>setQrsize(e.target.value)}/><br />
       
        <button className="btn btn-primary" onClick={g}>
            generate
        </button >
        <br />
        <button  className="btn btn-success" onClick={down}>
            download
        </button>
    </div>
    </div>
    </center>
    </>
  )
}
