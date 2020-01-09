import React, { Component } from "react";
import Notification from "../components/Notification";

const NotificationContext = React.createContext({});

const initialState = {
  open: false,
  message: "",
  type: ""
};

class NotificationContextProvider extends Component {
  state = initialState;

  showNotification = ({ message, type }) => {
    this.setState({
      open: true,
      message,
      type
    });
  };

  closeNotification = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <NotificationContext.Provider
        value={{
          showNotification: this.showNotification,
          closeNotification: this.closeNotification
        }}
      >
        <Notification {...this.state} onClose={this.closeNotification} />
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}

export default NotificationContext;
export { NotificationContextProvider };
