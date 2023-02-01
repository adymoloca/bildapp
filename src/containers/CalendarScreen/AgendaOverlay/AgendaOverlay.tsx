import AgendaOverlayStyle from './styles';
import * as React from 'react';
import {View, Text, ScrollView, PanResponder} from 'react-native';
import {useMemo, useState} from 'react';
import AgendaItem from './AgendaItem';
import DraggingOverlay from './DraggingOverlay';
import {ICalendarOrder, ITimeInterval} from '../../../utils/interfaces';

export const START_HOUR = 0;
export const INTERVAL_HOURS = 24;

export const HOUR_HEIGHT: number = 70;
export const HOUR_BORDER_WIDTH: number = 1;
export const ITEM_WIDTH: number = 120;

const AgendaOverlay: React.FC<AgendaOverlayProps> = ({
  navigate,
  orderList,
  onChange,
}) => {
  const itemsWithHoursAndColumns = useMemo<ICalendarOrder[]>(() => {
    let itemsWithHours = [...orderList];
    itemsWithHours = itemsWithHours.sort((a, b) => a.time.start - b.time.start);
    for (let i = 0; i < itemsWithHours.length; i++) {
      let currentColumn = 1;
      while (currentColumn <= itemsWithHours.length) {
        let columnOccupied = false;
        for (let j = 0; j < i; j++) {
          if (itemsWithHours[j].columnIdx !== currentColumn) continue;

          //check if item[i] interlaps with item[j]
          const hours =
            itemsWithHours[j].time.end - itemsWithHours[j].time.start;
          let minI = itemsWithHours[i].time.start * 60;
          let maxJ = itemsWithHours[j].time.start * 60 + hours * 60;

          if (minI < maxJ) {
            //item[i] starts before item[j] ends so they overlap
            columnOccupied = true;
            break;
          }
        }
        if (!columnOccupied) break;
        currentColumn++;
      }
      itemsWithHours[i].columnIdx = currentColumn;
    }
    return itemsWithHours;
  }, [orderList]);

  const hoursInterval = useMemo<number[]>(
    () => [...Array(INTERVAL_HOURS).keys()].map((el, idx) => START_HOUR + idx),
    [],
  );

  const [draggedItem, setDraggedItem] = useState<ICalendarOrder>();
  const [initialMoveY, setInitialMoveY] = useState<number | undefined>();

  const saveDraggedItem = () => {
    if (!draggedItem?.orderId) return;

    let idx = orderList.findIndex(el => el.orderId === draggedItem.orderId);
    const copy = [...orderList];
    const numberOfHours = draggedItem.time.end - draggedItem.time.start;
    const timeInterval = {
      start: draggedItem.currentHour,
      end: draggedItem.currentHour + numberOfHours,
    };
    copy[idx].time = timeInterval;
    onChange(copy, {time: timeInterval, orderId: draggedItem.orderId});
  };

  const updateDraggedItem = (moveY: number) => {
    let dy = moveY - (initialMoveY ?? 0);
    if (!draggedItem) {
      return;
    }
    const newHour = draggedItem.time.start + Math.round(dy / HOUR_HEIGHT);
    const numberOfHours = draggedItem.time.end - draggedItem.time.start;
    setDraggedItem({
      ...draggedItem,
      currentHour: Math.min(
        Math.max(newHour, START_HOUR),
        START_HOUR + INTERVAL_HOURS - numberOfHours,
      ),
    });
  };

  const calculateLeft: (idx: number) => number = idx => {
    return (
      ((itemsWithHoursAndColumns?.[idx]?.columnIdx || 0) - 1) * (ITEM_WIDTH + 5)
    );
  };

  const getHorizontalScrollWidth = () => {
    let index = 0;
    itemsWithHoursAndColumns.forEach(item => {
      if (item.columnIdx != undefined && item.columnIdx > index) {
        index = item.columnIdx;
      }
    });
    if (index < 5) {
      return 6 * ITEM_WIDTH;
    } else {
      return index * ITEM_WIDTH + 200;
    }
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => !!draggedItem,
        onPanResponderGrant: (evt, gestureState) => {
          // console.log('panGrant');

          if (!draggedItem) {
            return;
          }
          //    console.warn('panGrant');
          setInitialMoveY(gestureState.moveY);
        },
        onPanResponderMove: (evt, gestureState) => {
          // console.log('panMove');

          if (!draggedItem) {
            return;
          }
          //    console.warn('panMove');
          updateDraggedItem(gestureState.moveY);
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (!draggedItem) {
            return;
          }
          //    console.warn('onPanResponderRelease');
          saveDraggedItem();
          setDraggedItem(undefined);
          setInitialMoveY(undefined);
        },
      }),
    [draggedItem],
  );

  return (
    <ScrollView
      {...panResponder.panHandlers}
      style={AgendaOverlayStyle.container}
      scrollEnabled={draggedItem === undefined}>
      <ScrollView
        contentContainerStyle={{width: getHorizontalScrollWidth()}}
        scrollEnabled={draggedItem === undefined}
        horizontal={true}>
        <View style={AgendaOverlayStyle.hours}>
          {hoursInterval.map((h, idx) => (
            <View
              key={idx}
              style={[AgendaOverlayStyle.row, {height: HOUR_HEIGHT}]}>
              <Text style={AgendaOverlayStyle.time}>{`${
                h < 10 ? `0${h}` : h
              }:00`}</Text>
              <View style={AgendaOverlayStyle.line} />
              <Text style={AgendaOverlayStyle.time}>{`${
                h < 10 ? `0${h}` : h
              }:00`}</Text>
            </View>
          ))}
        </View>
        <View style={AgendaOverlayStyle.itemsContainer}>
          {itemsWithHoursAndColumns &&
            itemsWithHoursAndColumns.map((item, idx) => (
              <AgendaItem
                setDraggedItem={setDraggedItem}
                navigate={navigate}
                key={idx}
                item={item}
                draggedItem={draggedItem?.orderId === item.orderId?draggedItem: undefined}
                left={calculateLeft(idx)}
              />
            ))}
          {draggedItem && <DraggingOverlay draggedItem={draggedItem} />}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default AgendaOverlay;

interface AgendaOverlayProps {
  orderList: ICalendarOrder[];
  onChange: (
    list: ICalendarOrder[],
    data: {orderId: string; time: ITimeInterval},
  ) => void;
  navigate: Function;
}
