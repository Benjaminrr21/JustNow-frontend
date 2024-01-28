import React from 'react'
import createOwnerNotificationConnection from './createOwnerNotificationConnection';
import { useEffect } from 'react';

const Notifications = () => {
    const ownerNotificationHub = createOwnerNotificationConnection();

useEffect(() => {
    ownerNotificationHub.on("ReceiveNotification", (message) => {
        // Display the notification message
        console.log(message);
    });

    ownerNotificationHub.start()
        .then(() => {
            console.log('Owner notification connection established');
        })
        .catch(err => console.error(err));

    return () => {
        ownerNotificationHub.stop();
    };
}, []);

  return (
    <div>
      
    </div>
  )
}

export default Notifications
