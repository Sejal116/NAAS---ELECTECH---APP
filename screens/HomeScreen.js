import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform, ImageBackgroun, TouchableHighlight} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {themeColors} from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories, clientItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import ClientCard from '../components/clientCard';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon, BellAlertIcon } from 'react-native-heroicons/solid'

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <Image 
        source={require('../assets/images/bg1.png')} 
        style={{height: height*0.2, opacity: 2}} 
        className="w-full absolute -top-5 opacity-2" />
    
      <SafeAreaView className={ios? '-mb-8': ''}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <Image source={require('../assets/images/avatar.png')} 
            className="h-9 w-9 rounded-full" />
          
          <View className="flex-row items-center space-x-">
            <MapPinIcon size="25" color={themeColors.bgMap} />
            <Text className="font-semibold text-base">
              New York, NYC
            </Text>

          </View>
          <TouchableOpacity>
          <BellAlertIcon size="27" color="#FFDF00" />
          </TouchableOpacity>
        </View>
        {/* search bar */}
        <View className="mx-5 shadow" style={{marginTop: height*0.06}}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity 
              className="rounded-full p-2" 
              style={{backgroundColor: themeColors.bgLight}}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* categories */}
        <View className="px-5 mt-6">
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item=> item.id}
            className="overflow-visible"
            renderItem={({item})=>{
              isActive = item.id==activeCategory;
              let activeTextClass = isActive? 'text-white': 'text-gray-700';
              return (
                <TouchableOpacity 
                onPress={()=> setActiveCategory(item.id)}
                style={{backgroundColor: isActive? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
                className="p-4 px-5 mr-2 rounded-full shadow">
                  <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
          
      </SafeAreaView>

      {/* client cards */}
      <View className={`overflow-visible flex justify-center flex-1 ${ios? 'mt-10':''}`}>
        <View>
          <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={clientItems}
            renderItem={({item})=> <ClientCard item={item} />}
            firstItem={1}
            loop={true}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width*0.63}
            slideStyle={{display: 'flex', alignItems: 'center'}}
          />
        </View>
        
      </View>
      
      
    </View>
  )
}
