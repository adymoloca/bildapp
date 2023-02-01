import {StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../../themes';
import {HOUR_BORDER_WIDTH, HOUR_HEIGHT} from "./AgendaOverlay";

const AgendaOverlayStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  hours: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  row: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    width: Fonts.small*5,
    textAlign: "center",
    fontSize: Fonts.small,
    color: Colors.greyIrina,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGreyIrina,
  },
  itemsContainer: {
    position: "absolute",
    width: '100%',
    height: '100%',
    top: Fonts.regular,
    left: 75,
  }
});

export default AgendaOverlayStyle;

export const AgendaItemStyle = StyleSheet.create({
  root: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 5,
  },
  title: {
    width: '100%',
    textAlign: "left",
    fontSize: Fonts.medium,
    paddingHorizontal: 5,
  },
  description: {
    width: '100%',
    textAlign: "left",
    fontSize: Fonts.tiny,
    padding: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
  }
});

export const AgendaDraggingOverlayStyle = StyleSheet.create({
  root: {
    position: "absolute",
    width: '100%',
    height: '100%',
    left: -10,
    backgroundColor: Colors.lightGreyIrina,
    opacity: 0.5,
  },
  currentInterval: {
    opacity: 0.1,
    position: "absolute",
    left: 0,
    width: '100%',
    backgroundColor: Colors.greyIrina,
  }
});
