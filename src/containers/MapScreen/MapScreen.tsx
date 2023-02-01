/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, AnimatedRegion, Region} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import {Colors, Fonts} from '../../themes';
import MapScreenLtrStyle from '../../themes/styles/mapScreen.ltr.style';
import BottomMapSheet from './components/BottomMapSheet';
import {actions as applicationSlice} from '../../redux/slices/applicationSlice';
import {actions} from '../../redux/slices/orderSlice';
import {actions as persistedActions} from '../../redux/slices/persistedUserSlice';
import {connect} from 'react-redux';
import {IAddressSearch} from '../../utils/interfaces';
import {RootState} from '../../redux/store';
import SearchModal from './components/SearchModal';
import ChevronLeft from '../../atoms/SvgIcons/ChevronLeft';
import {useIsFocused} from '@react-navigation/native';
import CustomIcon from '../../atoms/CustomIcon';
import _ from 'lodash';

let _mapView: MapView | null = null;
const MapScreen = (props: IStateProps & {navigation: any}): JSX.Element => {
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });
  const {height, width} = Dimensions.get('window');
  const defaultRegion = React.useMemo(() => {
    const LATITUDE_DELTA = 0.0043;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    return {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  }, [height, width]);

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);

  const [marker, setMarker] = useState<AnimatedRegion>(
    new AnimatedRegion(defaultRegion),
  );
  const [mapRegion, setMapRegion] = useState<Region>(defaultRegion);

  const [currentCoordinate, setCurrentCoordinates] =
    useState<Region>(defaultRegion);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      Keyboard.dismiss();
      setAddress('');
      setCity('');
      setIsMapReady(false);
      setMarker(new AnimatedRegion(currentCoordinate));
      setMapRegion(currentCoordinate);
    } else {
      setIsModalVisible(true);
    }
  }, [isFocused]);
  useEffect(() => {
    monitorPosition();
  }, []);

  const monitorPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        if (position) {
          const data = {
            ...defaultRegion,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentCoordinates(data);
          onRegionChangeComplete(data);
          setMarker(new AnimatedRegion(data));
          _mapView &&
            _mapView.animateCamera({
              center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              zoom: 17,
              altitude: 1000,
            });
        }
      },
      error => {
        console.error(error.code, error.message);
      },
    );
  };

  const sheetRef = React.useRef<BottomSheet>();

  const changeSearchList = (address: IAddressSearch) => {
    const {searchList, setSearchList} = props;
    const newSearchList = [...(searchList || [])];
    if (newSearchList.length === 3) {
      newSearchList.pop();
      newSearchList.unshift(address);
    } else {
      newSearchList.unshift(address);
    }
    setSearchList(newSearchList);
  };

  const loadAppointmentScreen = () => {
    if (marker.latitude === null) return;
    changeSearchList({
      address,
      city,
      coordinates: {lat: marker.latitude, lng: marker.longitude},
    });
    props.setOrderData({
      ...props.orderData,
      address,
      coordinates: {
        lat: marker.latitude,
        lng: marker.longitude,
      },
    });
    props.navigation.goBack();
  };

  const searchAddress = (address: string, recenter = true) => {
    Geocoder.from(address)
      .then(response => {
        if (!recenter) return;
        const location = response.results[0].geometry.location;
        if (_mapView != null) {
          _mapView.animateCamera({
            center: {
              latitude: location.lat,
              longitude: location.lng,
            },
            zoom: 17,
            altitude: 1000,
          });
        }
        const coords = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: defaultRegion.latitudeDelta,
          longitudeDelta: defaultRegion.longitudeDelta,
        };
        setMapRegion(coords);
        const address = response.results[0].formatted_address;
        const city = response.results[0].address_components[2].long_name;
        setAddress(address);
        setCity(city);
        sheetRef.current?.snapTo(2);
      })
      .catch(error => console.warn(error));
  };

  const onRegionChangeComplete = (region: Region) => {
    setMapRegion(region);
    Geocoder.from(region)
      .then(response => {
        const address = response.results[0].formatted_address;
        const city = response.results[0].address_components[2].long_name;
        setAddress(address);
        setCity(city);
      })
      .catch(error => console.warn(error));
  };

  const recenterMap = () => {
    if (_mapView == null || currentCoordinate.latitude == 0) return;
    _mapView.animateCamera({
      center: {
        latitude: currentCoordinate.latitude,
        longitude: currentCoordinate.longitude,
      },
      altitude: 1000,
      zoom: 17,
    });
    setMarker(new AnimatedRegion(currentCoordinate));
    onRegionChangeComplete(currentCoordinate);
  };
  const onChangeRegion = (data: Region) => {
    marker.setValue(data);
    // marker.spring(data as any).start();
    // setMarker(new AnimatedRegion(data));
  };

  const setRegion = (data: Region) => {
    if (_mapView != null && data.latitude != null && data.longitude != null) {
      setMarker(new AnimatedRegion(data));
      isMapReady &&
        _mapView?.animateCamera({
          center: {
            ...data,
          },
          altitude: 1000,
          zoom: 17,
        });
    }
  };
  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <View
        style={[
          MapScreenLtrStyle.container,
          {
            backgroundColor: 'transparent',
            display: isModalVisible ? 'none' : 'flex',
            position: 'relative',
          },
        ]}>
        <TouchableOpacity
          style={MapScreenLtrStyle.topPart}
          onPress={() => {
            setIsModalVisible(true);
            setAddress('');
            setCity('');
          }}>
          <View style={MapScreenLtrStyle.searchAddress}>
            <ChevronLeft />
          </View>
        </TouchableOpacity>

        <BottomMapSheet
          address={address}
          setCity={setCity}
          city={city}
          setAddress={setAddress}
          openModal={() => {
            setIsModalVisible(true);
          }}
          loadAppointmentScreen={loadAppointmentScreen}
        />
        {!!currentCoordinate.latitude && (
          <>
            <MapView
              needsOffscreenAlphaCompositing={true}
              style={[
                MapScreenLtrStyle.map,
                {
                  backgroundColor: 'transparent',
                },
              ]}
              onMapReady={() => {
                setIsMapReady(true);
              }}
              initialRegion={isMapReady ? currentCoordinate : undefined}
              onRegionChange={onChangeRegion}
              ref={mapView => {
                _mapView = mapView;
              }}
              zoomEnabled={true}
              scrollEnabled={true}
              onRegionChangeComplete={onRegionChangeComplete}
              showsUserLocation={true}></MapView>
            <View
              style={{
                position: 'absolute',
                left: (Dimensions.get('window').width - Fonts.h1 * 2) / 2,
                top: (Dimensions.get('window').height - Fonts.h1 * 3.4) / 2,
              }}>
              <Icon size={Fonts.h1 * 2} color={Colors.green} name="room" />
            </View>
          </>
        )}

        <View style={MapScreenLtrStyle.recenter_button}>
          <CustomIcon
            size={Fonts.h6}
            color={Colors.black}
            style={{opacity: 1}}
            onPress={() => {
              recenterMap();
            }}
            name="navigation-outline"
            iconPack="custom"
          />
        </View>
      </View>
      <SearchModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        mapRegion={mapRegion}
        setMarker={(data: any) => {
          setRegion(data);
        }}
        setCity={setCity}
        address={address}
        city={city}
        searchAddress={searchAddress}
        setAddress={setAddress}
        useCurrentLocation={() => {
          recenterMap();
        }}
        searchList={props.searchList || []}
      />
      <SafeAreaView />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  searchList: state.persistedUser.searchList,
  orderData: state.order.orderData,
});

type IStateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const mapDispatchToProps = {
  logout: applicationSlice.logout,
  setOrderData: actions.setOrderData,
  setSearchList: persistedActions.setSearchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
