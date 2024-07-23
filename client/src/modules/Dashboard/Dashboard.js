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
    const connections= [
        {
            uname: 'Tanjiro',
            message: 'Hey! How are you?',
            img: profilepic
        },
        {
            uname: 'Zenitsu',
            message: 'Hey! How are you?',
            img: profilepic
        },
        {
            uname: 'Inosuke',
            message: 'Hey! How are you?',
            img: profilepic
        },
        {
            uname: 'Nezuko',
            message: 'Hey! How are you?',
            img: profilepic
        },
        // {
        //     uname: 'Giyu',
        //     message: 'Hey! How are you?',
        //     img: profilepic
        // },
        {
            uname: 'obanai',
            message: 'Got some rizz babe!',
            img: profilepic
        }
    ]


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
            // console.log('reData :>>', resData);
            setConversations(resData);
        }
        fetchconversations()
    },[])


    //get user account details
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));

    //get list of user conversations
    const [conversations, setConversations] = useState([]);
    console.log(' user :>>', user);
    console.log('conversations :>>', conversations);

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
                        conversations.map(({conversationId, user, img = profilepic})=>{
                            return(
                                <div className='connection'>
                                    <div className='connection-pic'>
                                        <img src={img} alt='profilepic'/>
                                    </div>
                                    <div className='connection-info'>
                                        <h1 className='connection-username'>{user?.username}</h1>
                                        <p className='connection-message'>{user?.email}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
        {/* chat page */}
        <div className='second'>

            <div className='chat-page'>
                <div className='chat-header'>
                    <div className='leftcontent'>
                        <div className='chat-pic'>
                            <img src={profilepic} alt='profilepic'/>
                        </div>
                        <div className='chat-info'>
                            <h1 className='chat-username'>Obanai</h1>
                            <p className='chat-status'>Online</p>
                        </div>
                    </div>
                    <div className='mail-forward'>
                        <a href="mailto:someone@example.com"><img src={mail} alt='mailto-icon'/></a>
                    </div>
                </div>
                <div className='chat-body'>
                    <div className='chat'>
                        <div className='sent'>
                            <p>hello, How are u?</p>
                        </div>
                        <div className='received'>
                            <p>Hey! How are you? </p>
                        </div>
                        <div className='received'>
                            <p> I am GOOD!!</p>
                        </div>
                    </div>
                </div>
                <div className='type-message'>
                    <Input type='text' placeholder='Type a message...' isrequired={false} length='500' value={msgsent} onChange={handlemsg} name='typebox' />
                    <button className='sendmsg' type='submit'><img src={send} alt='send button'/></button>
                </div>
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