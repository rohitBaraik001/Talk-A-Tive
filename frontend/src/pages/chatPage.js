import React, { useState } from 'react';
import { ChatState } from '../context/chatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../miscellaneous/SideDrawer';
import MyChat from '../componets/MyChat';
import ChatBox from '../componets/ChatBox';

function ChatPage() {
  const {user} = ChatState();
  const [fetchAgain,setFetchAgain] = useState();
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display="flex"
      width="100%"
      justifyContent={'space-between'}
      height='91.5vh'
      padding='10px'
      >
        {user && <MyChat fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default ChatPage
