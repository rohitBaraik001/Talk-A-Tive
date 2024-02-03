import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";


const UserListItem = (props) => {



  return (
    <Box
      onClick={props.handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={props.Userrr.name}
        src={props.Userrr.pic}
      />
      <Box>
        <Text>{props.Userrr.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {props.Userrr.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;