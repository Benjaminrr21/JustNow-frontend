import * as signalR from '@microsoft/signalr';

class OwnerNotificationHub {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://your-api-url/adminNotificationHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    startConnection() {
        return this.connection.start();
    }

    addNotificationListener(callback) {
        this.connection.on("ReceiveNotification", callback);
    }

    stopConnection() {
        return this.connection.stop();
    }
}

const createOwnerNotificationConnection = () => {
    return new OwnerNotificationHub();
};

export default createOwnerNotificationConnection;
