import * as signalR from '@microsoft/signalr';

export const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://benjamin002-001-site1.jtempurl.com/adminNotificationHub') // Update with your API URL
    .withAutomaticReconnect()
    .build();

export const startConnection = async () => {
    try {
        await hubConnection.start();
        console.log('SignalR Connected');
    } catch (err) {
        console.error('SignalR Connection Error: ', err);
    }
};

export const addNotificationListener = (callback) => {
    hubConnection.on('ReceiveNotification', (notification) => {
        callback(notification);
    });
};