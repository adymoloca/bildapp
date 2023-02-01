// @ts-ignore
import React, {useState} from "react";
import {View, PanResponder} from "react-native";
import {AgendaDraggingOverlayStyle} from "./styles";
import {HOUR_HEIGHT, START_HOUR} from "./AgendaOverlay";
import { ICalendarOrder } from "../../../utils/interfaces";

const DraggingOverlay: React.FC<DraggingOverlayProps> = ({draggedItem}) => {

  const top = (draggedItem.currentHour - START_HOUR) * HOUR_HEIGHT + 20;

  return (
    <View style={AgendaDraggingOverlayStyle.root}>
      <View style={[AgendaDraggingOverlayStyle.currentInterval, {height: HOUR_HEIGHT*(draggedItem.time.end-draggedItem.time.start)-5, top: top ?? 0}]}/>
    </View>
  );
};

export default DraggingOverlay;

interface DraggingOverlayProps {
  draggedItem: ICalendarOrder;
}
