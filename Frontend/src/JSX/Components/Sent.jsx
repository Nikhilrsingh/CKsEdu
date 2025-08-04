import React from "react";
import { useOutletContext } from "react-router-dom";
import SentList from "./SentList";

export default function Sent() {
  const { setSelectedEmail } = useOutletContext();

  return (
    <SentList onSelect={(email) => setSelectedEmail(email)} />
  );
}


