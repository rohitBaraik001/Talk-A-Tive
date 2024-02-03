import React from 'react';
import { IconButton, useDisclosure, Button, Image, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                children ? <span onClick={onOpen}>{children}</span> : (
                    <IconButton
                        display={{ base: 'flex' }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    />
                )
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent height={'350px'}>
                    <ModalHeader
                        fontSize='40px'
                        fontFamily='worksans'
                        display='flex'
                        justifyContent='center'
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                    display={'flex'}
                    flexDir={'column'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    >
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={user.pic}
                            alt={user.name}
                        />
                        <Text
                            display={{ base: '28px', md: '30px' }}
                            fontFamily={'worksans'}
                        >
                            {user.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal
