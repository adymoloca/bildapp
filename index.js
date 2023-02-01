/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


// TODO this is a workaround for react-native-gesture-handler which in current version displays a warning, to update
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  '[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!',
]);
//--------------------------

AppRegistry.registerComponent(appName, () => App);
