export type User =  {
  id: string,
  username: string,
  avatar: string,
  color: string,
}

export type Message = {
  id: string;
  userId: string,
  timestamp: string;
  type: 'text' | 'gif' | 'emoji',
  content: string;
}

export type Info = {
  text: string
}

export type ServerToClientEvents = {
  welcome: (payload: Info) => void,
  user_list: (payload: { list: User[] }) => void,
  typing_user_list: (payload: { list: string[] }) => void,
  message_list: (payload: { list:  Message[] }) => void,
  receive_message: (payload: { message: Message }) => void,
}

export type ClientToServerEvents = {
  query_message_list: () => void,
  query_user_list: () => void,
  query_typing_user_list: () => void,
  user_join: (payload: { user?: Partial<User> }) => void;
  user_update: (payload: { user: Partial<User> }) => void;
  user_leave: () => void;
  send_message: (payload: { message: { type: Message['type'], content: Message['content'] }}) => void,
  typing: (payload: { userId: string, isTyping: boolean }) => void,
}