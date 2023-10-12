import React, { Component } from "react";
import ContactsComp from "../components/ContactsComp";

export default class ContactsPage extends Component {
  render() {
    return (
      <div className="AdminPage">
        <ContactsComp />
      </div>
    );
  }
}
