import React,{ useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Text,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels
} from '@chakra-ui/react';
import Signup from '../componets/Authentication/Signup';
import Login from '../componets/Authentication/Login';


function HomePage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        textAlign="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text as='b' fontSize='4xl' fontFamily='work sans' color='red'>
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderWidth="lpx" borderRadius="lg">
        <Tabs variant='soft-rounded'>
          <TabList marginBottom='2'>
            <Tab width='50% '>Login</Tab>
            <Tab width='50%'>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
