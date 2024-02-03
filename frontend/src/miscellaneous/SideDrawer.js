import React, { useState } from 'react';
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, } from '@chakra-ui/icons';
import { ChatState } from '../context/chatProvider'
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios'
import ChatLoading from '../componets/ChatLoading';
import UserListItem from '../componets/UserAvatar/UserListItem';
import { getSender } from '../config/ChatLogics';
import NotificationBadge, { Effect } from 'react-notification-badge'
const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const { user, selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const toast = useToast();

    const history = useHistory();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
            // console.log(data);


        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });

            console.log(error)
        }
    };

    const accessChat = async (userId) => {
        // console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            //   console.log("data:",data)
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        history.push('/')
    }

    return (
        <>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                bg={'white'}
                width='100%'
                p='5px 10px 5px 10px'
                borderWidth='5px'
            >
                <Tooltip label="Search users to Chat" hasArrow placement='bottom-end' color='grey'>
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <Text display={{ base: "none", md: "flex" }} px='4'>Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize='2xl' fontFamily='worksans'>
                    Talk-A-Tive
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                            count = {notification.length}
                            effect = {Effect.SCALE}
                            />
                            <BellIcon fontSize='3xl' m='2' />
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottom={'1px'}>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display={'flex'} paddingBottom={'2px'}>
                            <Input
                                placeholder='Search by name or email'
                                marginRight={'2'}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >
                                Go
                            </Button>
                        </Box>
                        {loading ? (<ChatLoading />) :


                            (

                                searchResult.map((u) => (
                                    <UserListItem
                                        key={u._id}
                                        Userrr={u}
                                        handleFunction={() => accessChat(u._id)}
                                    />
                                ))
                            )
                        }
                    </DrawerBody>
                    {loadingChat && <Spinner ml={'auto'} display={'flex'} />}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
