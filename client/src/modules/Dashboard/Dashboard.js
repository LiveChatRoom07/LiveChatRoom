import React from 'react';
import './Dashboard.css';
import mail from '../../assets/mailto.png';
// import send from '../../assets/send.png';
import profilepic from '../../assets/obanai.jpg';

export const Dashboard = () => {
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
                    <h1 className='username'>Don joe</h1>
                    <p className='bio'>I am bookworm & I love rain!</p>
                </div>
            </div> 
            <div className='myconnections'>
                <div className='heading'>
                    <h1>Messages</h1>
                </div>
                <div className='connection-list'>
                    {
                        connections.map(({uname, message, img})=>{
                            return(
                                <div className='connection'>
                                    <div className='connection-pic'>
                                        <img src={img} alt='profilepic'/>
                                    </div>
                                    <div className='connection-info'>
                                        <h1 className='connection-username'>{uname}</h1>
                                        <p className='connection-message'>{message}</p>
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
                            <p>hello, How are ?</p>
                        </div>
                        <div className='received'>
                            <p>Hey! How are you? I love you so..</p>
                        </div>
                        <div className='received'>
                            <p>Hey! How are you? I love you so.. i love you so..</p>
                        </div>
                    </div>
                </div>
                <div className='type-message'>
                    <input type='text' placeholder='Type a message...' />
                    <input type='submit' value='Send'>
                        {/* <img src={send} alt='sendmsg'/> */}
                    </input>
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