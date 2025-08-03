import React from "react";
import { useOutletContext } from "react-router-dom";
import ComposeMail from "./ComposeMail";

export default function Compose() {
  const context = useOutletContext();

  return context?.pane === "right" ? <ComposeMail /> : null;
}
