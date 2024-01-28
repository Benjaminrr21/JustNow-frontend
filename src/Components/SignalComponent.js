import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { notification, Button, Input } from "antd";
import React, { useEffect, useState } from "react";

const SignalComponent = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    console.log("Connections...");
    const connect = new HubConnectionBuilder()
      .withUrl("https://benjamin002-001-site1.jtempurl.com/hubs/notifications")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection && connection.state === "Disconnected") {
      console.log("State:", connection.state);
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            notification.open({
              message: "New Notification",
              description: message,
            });
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) await connection.send("SendMessage", inputText);
    setInputText("");
  };

  return (
    <>
      <Input
        type='text'
        value={inputText}
        onChange={(input) => {
          setInputText(input.target.value);
        }}
      />
      <Button onClick={sendMessage} type="primary">
        Send
      </Button>
    </>
  );
};
export default SignalComponent