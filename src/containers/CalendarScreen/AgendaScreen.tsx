import React, {Component, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
  WeekCalendar,
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import {useIsFocused} from '@react-navigation/native';
import {Colors, Fonts} from '../../themes';
import {prettyDateForCalendar, sameDay} from '../../utils/dateUtils';
import {ICalendarOrder, ITimeInterval} from '../../utils/interfaces';
import {OrderStatus} from '../../utils/orderUtil';
import AgendaOverlay from './AgendaOverlay/AgendaOverlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import I18n from 'i18n-js';
import CustomIcon from '../../atoms/CustomIcon';

interface State {
  items?: AgendaSchedule;
  selectedDate: Date;
  viewBig: boolean;
}

interface IProps {
  orderList: ICalendarOrder[];
  onChange: (
    list: ICalendarOrder[],
    data: {orderId: string; time: ITimeInterval},
  ) => void;
  navigate: Function;
  onAdd: Function;
}

const dots: any = {
  [OrderStatus.InDelivery]: {
    color: Colors.greenStrong,
    key: OrderStatus.InDelivery,
  },
  [OrderStatus.Scheduled]: {
    color: Colors.orangeStrong,
    key: OrderStatus.Scheduled,
  },
  [OrderStatus.Completed]: {
    color: Colors.greyStrong,
    key: OrderStatus.Completed,
  },
  [OrderStatus.Canceled]: {
    color: Colors.redStrong,
    key: OrderStatus.Canceled,
  },
};

export default class AgendaScreen extends Component<IProps, State> {
  state: State = {
    items: undefined,
    selectedDate: new Date(),
    viewBig: false,
  };

  generateDotsForCalendar = (): any => {
    const data: any = {};
    this.props.orderList.forEach((order: ICalendarOrder) => {
      if (!order.deliveryDate || !dots[order.status]) return;
      const date = prettyDateForCalendar(order.deliveryDate);
      if (data[date]) {
        const dotExist = data[date].dots.find(
          (item: any) => item.key === order.status,
        );
        if (!dotExist) {
          data[date].dots.push(dots[order.status]);
        }
      } else {
        data[date] = {dots: [dots[order.status]]};
      }
    });
    return data;
  };

  onChangeMount = (changer: 1 | -1) => {
    const {selectedDate} = this.state;
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + changer);
    newDate.setDate(1);
    this.setState({selectedDate: newDate});
    this.loadItems({timestamp: newDate.getTime()} as any);
  };
  sheetRef = null;
  render() {
    return (
      <View style={{position: 'relative'}}>
        <CalendarView
          onDayPress={(date: any) => {
            this.setState({selectedDate: new Date(date.timestamp)});
          }}
          onChangeMount={this.onChangeMount}
          markedDates={this.generateDotsForCalendar()}
          selected={new Date(this.state.selectedDate).toISOString()}
          onAdd={this.props.onAdd}
        />
        <View style={{height: '100%', paddingTop: 150}}>
          <AgendaOverlay
            navigate={this.props.navigate}
            orderList={this.props.orderList.filter(
              item =>
                item.deliveryDate &&
                sameDay(item.deliveryDate, this.state.selectedDate),
            )}
            onChange={this.onChange}
          />
        </View>
      </View>
    );
  }

  loadItems = (day: DateData) => {
    const items: any = this.state.items || {};
    const time = day.timestamp;
    const strTime = this.timeToString(time);

    if (!items[strTime]) {
      items[strTime] = [];

      items[strTime].push({
        name: 'Item for ' + strTime + ' #',
        height: Math.max(50, Math.floor(Math.random() * 150)),
        day: strTime,
      });
    }

    const newItems: AgendaSchedule = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    this.setState({
      items: newItems,
    });
  };

  onChange = (
    list: ICalendarOrder[],
    data: {orderId: string; time: ITimeInterval},
  ) => {
    this.props.onChange(
      this.props.orderList.map(item => {
        if (item.orderId === data.orderId) {
          return {
            ...item,
            time: data.time,
          };
        }
        return item;
      }),
      data,
    );
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const CalendarView = (props: any) => {
  const viewAnimation = useRef<Animatable.View & View>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const Animation = async () => {
      if (isFocused) {
        //@ts-ignore
        // await viewAnimation?.current?.fadeIn(1000);
      }
    };

    Animation();
  }, [isFocused, viewAnimation]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: -15,
        width: '110%',
        zIndex: 1000,
        backgroundColor: 'white',
        display: 'flex',
      }}>
      <View
        style={{
          position: 'absolute',
          paddingRight: 25,
          zIndex: 1001,
          right: 0,
          top: 5,
        }}>
        <TouchableOpacity onPress={() => props.onAdd(props.selected)}>
          <Icon size={Fonts.h3} color={Colors.black} name="add" />
        </TouchableOpacity>
      </View>
      {isFocused && (
        <Animatable.View ref={viewAnimation}>
          <CalendarProvider
            style={{width: '100%'}}
            date={props.selected.split('T')[0]}>
            <ExpandableCalendar
              theme={{
                // @ts-ignore
                'stylesheet.calendar.header': {
                  header: {
                    flexDirection: 'row',
                    paddingHorizontal: 13,
                  },
                },
                selectedDayBackgroundColor: Colors.green,
              }}
              allowShadow={false}
              onDayPress={date => {
                props.onDayPress(date);
              }}
              onPressArrowRight={() => {
                // use for swiping the current header is override
                props.onChangeMount(1);
              }}
              onPressArrowLeft={() => {
                // use for swiping the current header is override
                props.onChangeMount(-1);
              }}
              // hideArrows
              enableSwipeMonths={true}
              // initialPosition={closed}
              renderHeader={d => {
                const date = new Date(props.selected);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: Fonts.regular,
                        width: 140,
                      }}>
                      {I18n.t('month_' + (date.getMonth() + 1))}{' '}
                      {date.getFullYear()}
                    </Text>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <CustomIcon
                        size={Fonts.h5}
                        color={Colors.black}
                        name="chevron-back-sharp"
                        onPress={() => {
                          props.onChangeMount(-1);
                        }}
                      />
                      <CustomIcon
                        style={{marginLeft: 20}}
                        size={Fonts.h5}
                        color={Colors.black}
                        onPress={() => {
                          props.onChangeMount(1);
                        }}
                        name="chevron-forward-sharp"
                      />
                    </View>
                  </View>
                );
              }}
              markedDates={props.markedDates}
              markingType={'multi-dot'}
              calendarStyle={{paddingRight: 8}}
            />
          </CalendarProvider>
        </Animatable.View>
      )}
      <View style={{overflow: 'hidden', paddingBottom: 5}}>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            width: '99%',
            height: 10,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
    TIMELINE_CALENDAR: 'timeline_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {CONTAINER: 'calendarList'},
  horizontalList: {CONTAINER: 'horizontalList'},
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {CONTAINER: 'expandableCalendar'},
  weekCalendar: {CONTAINER: 'weekCalendar'},
};
