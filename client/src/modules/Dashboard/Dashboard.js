import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import mail from '../../assets/mailto.png';
import send from '../../assets/send.png';
import profilepic from '../../assets/obanai.jpg';
import Input from '../../components/Input/Input';

export const Dashboard = () => {
    const [msgsent, setMsgSent] = useState('');
    const handlemsg = (e) => {
        setMsgSent(e.target.value);
    };

    //get user account details
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));

    //get list of user conversations
    const [conversation, setConversation] = useState([]);
    const [messages, setMessages] = useState({});

    //fetch convoList
    useEffect(() => {
        const loggedinUser = JSON.parse(localStorage.getItem('user:detail'))
        const fetchconversations = async() => {
            const res = await fetch(`http://localhost:8000/api/conversation/${loggedinUser?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                } 
            });
            const resData = await res.json();
            setConversation(resData);
        }
        fetchconversations()
    },[])

    //Fetch Messages
    const fetchMessages = async(conversationId, user) => {
        const res = await fetch(`http://localhost:8000/api/messages/${conversationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            } 
        });
        const resData = await res.json();
        console.log(' resData :>>', resData);
        setMessages({msg: resData, receiver: user, conversationId});
    }
    // send Messages
    const sendMessage = async(e) => {
        const data = {
            conversationId: messages?.conversationId,
            senderId: user?.id,
            message: msgsent,
            receiverId: messages.receiver?.receiverId
        }
        const res = await fetch(`http://localhost:8000/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        console.log('resData :>>', resData);
        setMsgSent('');
    }

  return (
    <>
    <div className='dashobord-content'>
        {/* connections-list */}
        <div className="first">
            <div className='myprofile'>
                <div className='profilepic'>
                    <img src={profilepic} alt='profilepic'/>
                </div>
                <div className='profileinfo'>
                    <h1 className='username'>{user?.username}</h1>
                    <p className='bio'>I am bookworm & I love rain!</p>
                </div>
            </div> 
            <div className='myconnections'>
                <div className='convo_heading'>
                    <h1 className='msg_heading'>Messages</h1>
                </div>
                <div className='connection-list'>
                    {
                        conversation.length > 0 ?
                        conversation.map(({conversationId, user})=>{
                            return(
                                <div className='connection' onClick={()=> fetchMessages(conversationId, user)}>
                                    <div className='connection-pic'>
                                        <img src={profilepic} alt='profilepic'/>
                                    </div>
                                    <div className='connection-info'>
                                        <h1 className='connection-username'>{user?.username}</h1>
                                        <p className='connection-message'>{user?.email}</p>
                                    </div>
                                </div>
                            );
                        }) 
                        :
                        <div className='no-messager'>
                            <p> Start chat</p>
                        </div>
                    }
                </div>
            </div>
        </div>
        {/* chat page */}
        <div className='second'>

            <div className='chat-page'>
                {
                    messages?.receiver?.username &&
                    <div className='chat-header'>
                        <div className='leftcontent'>
                            <div className='chat-pic'>
                                <img src={profilepic} alt='profilepic'/>
                            </div>
                            <div className='chat-info'>
                                <h1 className='chat-username'>{messages?.receiver?.username}</h1>
                                <p className='chat-status'>{messages?.receiver?.email}</p>
                            </div>
                        </div>
                        <div className='mail-forward'>
                            <a href={`mailto:${messages?.receiver?.email}`}><img src={mail} alt='mailto-icon'/></a>
                        </div>
                    </div>
                }
                <div className='chat-body'>
                    <div className='chat'>
                        {
                            messages?.msg?.length > 0 ?
                            messages.msg.map(({message, user : { id } = {}}) => {
                                if(id === user?.id)
                                {
                                    return(
                                        <div className='sent'>
                                            <p> {message}</p>
                                        </div>
                                    )
                                }
                                else{
                                    return(
                                        <div className='received'>
                                            <p>{message}</p>
                                        </div>  
                                    )
                                }
                            }) : <div className='no-message'><p> Start chat</p></div>
                        }
                    </div>
                </div>
                {
                    messages?.receiver?.username &&
                    <div className='chat-footer'>
                        <div className='type-message'>
                            <Input type='text' placeholder='Type a message...' isrequired={false} length='500' value={msgsent} onChange={handlemsg} name='typebox' />
                            <button className={` sendmsg${!msgsent ? "disablebutton" : ""}`} type='submit' onClick={()=> sendMessage()}><img src={send} alt='send button'/></button>
                        </div>
                    </div>
                }
            </div>
        </div>
        {/* profile-list */}
        <div className='third'>

        </div>
    </div>
    </>
  );
}

export default Dashboard;