import React from 'react';
import {ChatState} from '../context/chatProvider';
import {Box} from '@chakra-ui/layout';
import SingleChat from './SingleChat';

const ChatBox = (props) => {
  const {selectedChat} = ChatState();
  return (
    <Box display={{base: selectedChat? "flex":"none", md:"flex"}}
    alignItems={'center'}
    flexDir={'column'}
    padding={3}
    background={'white'}
    width={{base:'100%', md:'67.5%'}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <SingleChat fetchAgain={props.fetchAgain} setFetchAgain={props.setFetchAgain} />
    </Box>
  )
}

export default ChatBox
