import Logger from './logger.js';
import { Server } from 'socket.io';
import { type ServerToClientEvents, type ClientToServerEvents } from '../../types/events.js'
import { addTypingUser, addUser, removeTypingUser, removeUser, getTypingUserList, getUserList, editUser, getUser } from './user.js';
import { addMessage, cleanupOldMessages, getMessageList } from './message.js';

const PORT = 3000;
const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
    cors: {
        origin: "*", /* On autorise tout dans le cadre de l'exo pour simplifier */
        methods: ["GET", "POST"]
    }
});

Logger.success(`Socket.io Server started on port ${PORT}`);

io.on('connection', (socket) => {
    Logger.success(`Connection with id:${socket.id}`);

    socket.emit('welcome', { text: 'Welcome !' });
    Logger.emit(socket.id, 'welcome');
    
    socket.on('user_join', (payload) => {
        const addedUser = addUser(socket.id, payload.user);
        if (!addedUser) {
            Logger.warning(`User with id:${socket.id} already exists`);
            return;
        }
        
        Logger.creation(`Created new user with id:${addedUser.id} and username:${addedUser.username}`);

        io.emit('user_list',getUserList())
        Logger.broadcast('user_list');
    })
    
    socket.on('user_update', (payload) => {
        const updatedUser = editUser(socket.id, payload.user)
        if (!updatedUser) {
            Logger.warning(`No user with id:${socket.id} found`);
            return;
        }

        Logger.update(`Updated user with id:${updatedUser.id}`)

        io.emit('user_list',getUserList())
        Logger.broadcast('user_list');
    })

    socket.on('typing', (payload) => {
        if (payload.isTyping) {
            addTypingUser(payload.userId);
        } else {
            removeTypingUser(payload.userId);
        }
            
        const typingUserList = getTypingUserList();
        Logger.update(`Updated typing user list, now ${typingUserList.list.length} users typing`);

        io.emit('typing_user_list', getTypingUserList());
        Logger.broadcast('typing_user_list');
    })

    socket.on('send_message', (payload) => {
        if (!getUser(socket.id)) {
            Logger.warning(`No user associated with ${socket.id}, the message was not sent`);
            return;
        }

        const sentMessage = addMessage(socket.id, payload.message);
        Logger.creation(`Created message for userId:${sentMessage.userId} at timestamp:${sentMessage.timestamp}`);

        io.emit('receive_message', { message: sentMessage })
        Logger.broadcast('receive_message');
    });

    socket.on('user_leave', () => {
        const removedUser = removeUser(socket.id);
        if (!removedUser) {
            Logger.warning(`No user matching user with id:${socket.id} none was removed`)
            return;
        }
        Logger.recycle(`User with id:${socket.id} removed`)

        socket.emit('user_list', getUserList());
        Logger.broadcast('user_list');
    }); 

    socket.on('query_user_list', () => {
        socket.emit('user_list', getUserList());
        Logger.emit(socket.id, 'user_list');
    })

    socket.on('query_message_list', () => {
        socket.emit('message_list', getMessageList());
        Logger.emit(socket.id, 'message_list');
    })

    socket.on('query_typing_user_list', () => {
        socket.emit('typing_user_list', getTypingUserList());
        Logger.emit(socket.id, 'typing_user_list');
    })

    socket.on('disconnect', () => {
        removeUser(socket.id);
        Logger.recycle(`Disconnect: User with id:${socket.id} removed with id`);

        io.emit('user_list', getUserList());
        Logger.broadcast('user_list');
    });
});

let cleanupTimer: NodeJS.Timeout | null = null;
const startAutomaticCleanup = (intervalMinutes: number = 30, maxAgeHours: number = 20): void => {
    Logger.info(`Start Automatic Cleanup every ${intervalMinutes} minutes, removing messages older than ${maxAgeHours} hours`);
    if (cleanupTimer) {
        clearInterval(cleanupTimer);
    }

    const intervalMs = intervalMinutes * 60 * 1000;
    const maxAgeMs = maxAgeHours * 60 * 60 * 1000; 
    
    cleanupTimer = setInterval(() => {
        const deletedMessages = cleanupOldMessages(maxAgeMs);
        Logger.recycle(`Automatic cleanup, deleted ${deletedMessages} messages`);

        if (deletedMessages > 0) {
            io.emit('message_list', getMessageList())
            Logger.broadcast('message_list')
        }
    }, intervalMs);
  
};


startAutomaticCleanup();