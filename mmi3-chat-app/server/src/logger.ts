import chalk from "chalk";


const IGNORED_TYPES: string[] = []; /* Edit this to unlog some logs */
type TYPES = 'success' | 'info' | 'update' | 'message' | 'warning';
const colors = {
    success: '#087246',
    info: '#104999',
    message: '#6638ca',
    update: '#d42f8f',
    warning: '#ea7019'
} satisfies Record<TYPES, string>;

const log = (type: TYPES, message: string) => {
    if (IGNORED_TYPES.includes(type)) { return; }
    console.log(chalk.hex(colors[type])(message));
}

class Logger {
    success(message: string) {
        log('success', `✅ ${message}`);
    }

    recycle(message: string) {
        log('info',  `🗑️ ${message}`);
    }

    creation(message: string) {
        log('success',  `🆕 ${message}`);
    }

    update(message: string) {
        log('update',  `✍️ ${message}`);
    }

    broadcast(message: string) {
        log('message', `📢 BROADCASTED: ${message}`)
    }

    emit(userId: string, message: string) {
        log('message', `🎤 EMITTED[${userId}]: ${message}`)
    }

    warning(message: string) {
        log('warning', `⚠️ ${message}`)
    }

    info(message: string) {
        log('info', message);
    }
    

}

export default new Logger;