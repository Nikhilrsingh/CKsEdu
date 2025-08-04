
import React from "react";
import { useOutletContext } from "react-router-dom";
import InboxList from "./InboxList";

export default function Inbox() {
  const { setSelectedEmail } = useOutletContext();

  return (
    <InboxList onSelect={(email) => setSelectedEmail(email)} />
  );
}
