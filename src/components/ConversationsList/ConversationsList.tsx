import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { IConversation, IUser } from "../../types";
import { timeSinceText } from "../../util";
import './ConversationList.scss';

const ConversationsList = ({ conversations = [], onClick, selectedUser }: { conversations: IConversation[], onClick: any, selectedUser: IUser }) => {
    if (!conversations?.length) {
        return <div className="no-conversation">
            <img src="./talking.png" />
            <div>
                <Typography component="span"
                    variant="body1">
                    Looks like you have not started  <br />any conversation?
                </Typography>
            </div>
        </div>
    }

    const getTime = useCallback((createdAt: string) => {
        return createdAt ? timeSinceText(new Date(createdAt)) : null
    }, [conversations])

    return conversations && conversations.length ? <div className="chat-users">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {conversations.map((conversation: IConversation, key: number) => {
                const user: IUser = conversation.users[0]._id !== selectedUser.id ? conversation.users[0] : conversation.users[1];
                return <ListItem sx={{ backgroundColor: selectedUser?.id === conversation?.id ? 'lightgray' : '', cursor: 'pointer' }} key={key + "_" + Math.random()} alignItems="flex-start" onClick={() => onClick(user, conversation)}>
                    <ListItemAvatar>
                        <Avatar alt={user.firstName} src={user.userImage} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.firstName + ' ' + user.lastName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {conversation.messages.length > 0 ? 'Message' : 'No Message'}
                                </Typography>
                            </React.Fragment>
                        }
                    >

                    </ListItemText>
                    <div className="time flex items-center	">
                        <span className="text">{getTime(conversation.createdAt)}</span>
                    </div>
                </ListItem>
            })}
        </List>
    </div> : null
}


export default ConversationsList;