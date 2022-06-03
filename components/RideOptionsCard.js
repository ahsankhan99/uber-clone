import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 22.5,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-Lux-789',
    title: 'Uber LUX',
    multiplier: 27.5,
    image: 'https://links.papareact.com/7pf'
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 32.5,
    image: 'https://links.papareact.com/5w8'
  },
]

const SURCHARGE_RATE = 1.5;

const RideOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaProvider>
      <View>
        <View style={tw`absolute top-3 left-5 z-50`}>
          <TouchableOpacity onPress={() => navigation.navigate('NavigateCard')}>
            <Icon name="chevron-left" type="font-awesome" />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-center py-2 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList data={data} keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-4 ${id === selected?.id && "bg-gray-200"}`}>
            <Image
              style={{ width: 80, height: 80, resizeMode: 'contain' }}
              source={{ uri: image }}
            />
            <View style={tw`ml-1`}>
              <Text style={tw`text-xl font-semibold`}>
                {title}
              </Text>
              <Text>
                {travelTimeInformation?.duration.text} Travel Time
              </Text>
            </View>

            <Text style={tw`text-xl ml-4 -mt-5`}>
              {Math.ceil((travelTimeInformation?.duration.value * SURCHARGE_RATE * multiplier) / 100)} Rs.
            </Text>
          </TouchableOpacity>
        )} />
      <View>
        <TouchableOpacity style={tw`bg-black m-3 py-3 ${!selected && 'bg-gray-300'}`} disabled={!selected}>
          <Text style={tw`text-white text-center text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaProvider>
  );
};

export default RideOptions;

const styles = StyleSheet.create({});
