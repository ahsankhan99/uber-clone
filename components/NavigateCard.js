import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "../components/NavFavourites";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, John!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Where to?"
                        enablePoweredByContainer={false}
                        debounce={300}
                        styles={styles}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: "en",
                        }}
                        minLength={2}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            );
                            navigation.navigate("RideOptionsCard");
                        }}
                    />
                    <NavFavourites />
                </View>
                <View
                    style={tw`flex-row justify-evenly py-2 mt-auto border-t border-gray-100`}
                >
                    <TouchableOpacity
                        disabled={!destination}
                        style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full ${!destination && 'bg-gray-600'}`}
                        onPress={() => navigation.navigate("RideOptionsCard")}
                    >
                        <Icon name="car" type="font-awesome" color="white" size={16}></Icon>
                        <Text style={tw`text-white text-center`}>Rides</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`flex flex-row w-24 justify-between px-4 py-3 rounded-full`}
                    >
                        <Icon name="fast-food-outline" type="ionicon" size={16}></Icon>
                        <Text style={tw`text-black text-center`}>Eats</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NavigateCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});
