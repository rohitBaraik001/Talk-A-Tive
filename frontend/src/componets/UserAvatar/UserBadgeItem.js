import React from 'react'
import { Badge } from '@chakra-ui/layout'
import { CloseIcon } from '@chakra-ui/icons'

const UserBadgeItem = (props) => {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            // 
            backgroundColor={'gray'}
            color={'white'}
            cursor="pointer"
            onClick={props.handleFunction}
        >
            {props.user.name}
            <CloseIcon paddingLeft={1} />
        </Badge>
    )
}

export default UserBadgeItem
