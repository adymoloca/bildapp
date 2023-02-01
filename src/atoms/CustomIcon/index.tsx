import React from 'react';
import {ColorValue, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Add from '../SvgIcons/Add';
import ArrowBack from '../SvgIcons/ArrowBack';
import Briefcase from '../SvgIcons/Briefcase';
import BriefcaseOutline from '../SvgIcons/BriefcaseOutline';
import Calendar from '../SvgIcons/Calendar';
import CalendarOutline from '../SvgIcons/CalendarOutline';
import Canceled from '../SvgIcons/Canceled';
import Cash from '../SvgIcons/Cash';
import ChevronLeft from '../SvgIcons/ChevronLeft';
import ChevronRight from '../SvgIcons/ChevronRight';
import Close from '../SvgIcons/Close';
import Completed from '../SvgIcons/Completed';
import Edit from '../SvgIcons/Edit';
import EditCalendar from '../SvgIcons/EditCalendar';
import Help from '../SvgIcons/Help';
import Home from '../SvgIcons/Home';
import Location from '../SvgIcons/Location';
import LockClosed from '../SvgIcons/LockClosed';
import Logout from '../SvgIcons/Logout';
import Mail from '../SvgIcons/Mail';
import Navigation from '../SvgIcons/Navigation';
import NavigationOutline from '../SvgIcons/NavigationOutline';
import Notes from '../SvgIcons/Notes';
import Notification from '../SvgIcons/Notification';
import Payment from '../SvgIcons/Payment';
import Person from '../SvgIcons/Person';
import PersonFilled from '../SvgIcons/PersonFilled';
import Phone from '../SvgIcons/Phone';
import Quantity from '../SvgIcons/Quantity';
import Receipt from '../SvgIcons/Receipt';
import Reload from '../SvgIcons/Reload';
import Settings from '../SvgIcons/Settings';
import Star from '../SvgIcons/Star';
import Wallet from '../SvgIcons/Wallet';

interface IProps {
  name: string;
  onPress?: () => void;
  size?: number;
  color?: number | ColorValue;
  iconPack?: 'ionicons' | 'material' | 'custom' | string;
  style?: any;
  disabled?: boolean;
}

const CustomIcon = ({
  onPress,
  style,
  size,
  color,
  name,
  iconPack,
  disabled,
}: IProps) => {
  const getIcon = () => {
    if (iconPack === 'custom') {
      if (name === 'arrow-back') {
        return <ArrowBack />;
      } else if (name === 'chevron-right') {
        return <ChevronRight color={color} />;
      } else if (name === 'chevron-left') {
        return <ChevronLeft color={color} />;
      } else if (name === 'navigation-outline') {
        return <NavigationOutline color={color} />;
      } else if (name === 'reload') {
        return <Reload />;
      } else if (name === 'calendar-outline') {
        return <CalendarOutline color={color} />;
      } else if (name === 'home') {
        return <Home color={color} />;
      } else if (name === 'calendar') {
        return <Calendar color={color} />;
      } else if (name === 'edit-calendar') {
        return <EditCalendar color={color} />;
      }else if (name === 'person') {
        return <Person color={color} />;
      } else if (name === 'person-fill') {
        return <PersonFilled color={color} />;
      } else if (name === 'wallet') {
        return <Wallet color={color} />;
      } else if (name === 'briefcase') {
        return <Briefcase color={color} />;
      } else if (name === 'lock-closed') {
        return <LockClosed color={color} />;
      } else if (name === 'notification') {
        return <Notification color={color} />;
      } else if (name === 'settings') {
        return <Settings color={color} />;
      } else if (name === 'help') {
        return <Help color={color} />;
      } else if (name === 'briefcase-outline') {
        return <BriefcaseOutline color={color} />;
      } else if (name === 'location') {
        return <Location color={color} />;
      } else if (name === 'mail') {
        return <Mail color={color} />;
      } else if (name === 'phone') {
        return <Phone color={color} />;
      } else if (name === 'receipt') {
        return <Receipt color={color} />;
      } else if (name === 'edit') {
        return <Edit color={color} />;
      } else if (name === 'payment') {
        return <Payment color={color} />;
      } else if (name === 'cash') {
        return <Cash color={color} />;
      } else if (name === 'quantity') {
        return <Quantity color={color} />;
      } else if (name === 'notes') {
        return <Notes color={color} />;
      } else if (name === 'add') {
        return <Add color={color} />;
      } else if (name === 'completed') {
        return <Completed color={color} />;
      } else if (name === 'canceled') {
        return <Canceled color={color} />;
      } else if (name === 'navigation-outline') {
        return <NavigationOutline color={color} />;
      } else if (name === 'navigation') {
        return <Navigation color={color} />;
      } else if (name === 'close') {
        return <Close color={color} />;
      } else if (name === 'logout') {
        return <Logout color={color} />;
      } else if (name === 'star') {
        return <Star color={color} />;
      }
      return null;
    }
    return iconPack === 'material' ? (
      <MaterialComunity size={size} color={color} name={name} />
    ) : (
      <Ionicon size={size} color={color} name={name} />
    );
  };
  return (
    <TouchableOpacity
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      style={style}
      disabled={disabled}
      onPress={onPress}>
      {getIcon()}
    </TouchableOpacity>
  );
};

export default CustomIcon;
