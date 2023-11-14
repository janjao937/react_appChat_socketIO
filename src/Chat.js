import React, { useEffect, useState } from "react";

const Chat =({socket,username,room})=>{
    const [inPutMessage,setInputMessage] = useState("");
    const [messageArr,setMessageArr] = useState([]);

    const OnSendMessageHandler = async()=>{
        if(inPutMessage.trim()==="") return;
        console.log(inPutMessage);
        //msgobject data
        const messageData = {
            room:room,
            author:username,
            message:inPutMessage,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
        }

        //send_message event name like back
        await socket.emit("send_message",messageData);
        setMessageArr([...messageArr,messageData]);
        setInputMessage("");
    }

    useEffect(()=>{
        socket.on("recive_message",(data)=>{
            console.log(data);
            setMessageArr((e)=>[...e,data]);
        })
    },[socket]);
    
    return(
        <div>
            <div className="chat-header">
                <p>Realtime Chat|ROOM_ID:{room}</p>
            </div>
            <div className="chat-body">
                {
                    messageArr.map((e,index)=>{
                        return (username === e.author?<div  key={index} className="message">
                            <div  style={{display:"flex",justifyContent:"right", gap:"4px", border:"1px solid", margin:"25px" }}>
                               <p>{e.message}</p>
                                <p style={{color:"green"}}>:{e.author}
                                <sub style={{color:"brown"}}>{e.time}</sub>
                                </p>
                                
                            </div>
                            
                        </div>:<div  key={index} className="message">
                            <div  style={{display:"flex",justifyContent:"left", gap:"4px", border:"1px solid", margin:"25px" }}>
                                <p style={{color:"red"}} ><sub style={{color:"brown"}}>{e.time}</sub> {e.author}:</p>
                               <p>
                               {e.message}</p>
                                
                            </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="message..." onChange={(e)=>setInputMessage(e.target.value)} value={inPutMessage}/>
                <button onClick={OnSendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default Chat;