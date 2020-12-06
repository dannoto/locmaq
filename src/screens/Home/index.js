import React, {useState} from 'react';
import { Platform } from 'react-native';
import { Background, Container, HeaderArea, HeaderTitle, SearchButton, LocationArea, LocationInput, IconButton, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { set } from 'react-native-reanimated';

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const handleLocation = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ?
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            :
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result == 'granted') {

            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getInfo();
                // console.log(info);
            })
        }
    }

    const get = () => {}

    return (
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>O que você está procurando?</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <FontAwesome5
                        name='search'
                        size= {26}
                        color="#222"
                        />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                     placeholder="Onde você está?"
                     placeholderTextColor="#d2d2d2"
                     value={locationText}
                     onChangeText={t => setLocationText(t)}
                    />

                    <IconButton onPress={handleLocation}>
                        <MaterialIcons
                        name='gps-fixed'
                        size= {28}
                        color="#222"
                        />
                    </IconButton>
                </LocationArea>

                {loading &&
                <LoadingIcon size="large" color="#222"/>
                }
    
            </Container>
        </Background>
    );
}