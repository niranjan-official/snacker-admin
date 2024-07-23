"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { ref, set } from "firebase/database";
import { rtdb } from "@/firebase/config";

const UpdationSwitch = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}) => {
  return <Switch checked={checked} onCheckedChange={setChecked} />;
};

export default UpdationSwitch;
