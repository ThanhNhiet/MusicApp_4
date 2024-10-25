import { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function PlaylistDetail({ navigateToHome, navigateToPlayAudio }: any) {

    const songs = [
        { id: "1", title: "Vì yêu", artist: "Kasim Hoàng Vũ", duration: "03:36", image: require("../assets/images/Playlist Details - Audio Listing/Image 51.png"), Listens: "2.1M", uri: "https://vnso-zn-23-tf-a128-z3.zmdcdn.me/e34025d1786c49fcbc3da73ac7cad923?authen=exp=1730032880~acl=/e34025d1786c49fcbc3da73ac7cad923*~hmac=36162b27cf58abd048331d26f7ee1638"},
        { id: "2", title: "careless whisper", artist: "George Michael", duration: "03:35", image: require("../assets/images/Playlist Details - Audio Listing/Image 52.png"), Listens: "68M", uri: "http://streaming.amusic.vn/amusic/songs/iphone/68/560188/560188.mp3" },
        { id: "3", title: "Lẻ bóng", artist: "Vũ Tuấn", duration: "04:39", image: require("../assets/images/Playlist Details - Audio Listing/Image 53.png"), Listens: "93M", uri: "https://vnso-zn-24-tf-a128-z3.zmdcdn.me/5cf4a5538ea1984f6f8660d1dd769d26?authen=exp=1730036824~acl=/5cf4a5538ea1984f6f8660d1dd769d26*~hmac=9446f0b7dad7fdba196b8b15a42f7e7a" },
        { id: "4", title: "Xa em kỉ niệm", artist: "Nathan Lee", duration: "07:48", image: require("../assets/images/Playlist Details - Audio Listing/Image 54.png"), Listens: "9M", uri: "https://vnso-zn-23-tf-a128-z3.zmdcdn.me/267d7c7fa9dc98a06b9c9aaebe5ded25?authen=exp=1730037009~acl=/267d7c7fa9dc98a06b9c9aaebe5ded25*~hmac=c796780564081a35ee295bdda8de5058" },
        { id: "5", title: "Hãy về đây bên anh", artist: "Duy Mạnh", duration: "03:36", image: require("../assets/images/Playlist Details - Audio Listing/Image 55.png"), Listens: "23M", uri: "https://vnso-pt-50-tf-a128-z3.zmdcdn.me/8909f138a145a5fd0b9fa5031cbaae8d?authen=exp=1730037209~acl=/8909f138a145a5fd0b9fa5031cbaae8d*~hmac=d4c2c87c7eb17fd88b4490a3b7bf644b" },
        { id: "6", title: "Dynamine", artist: "Elena Jimenez", duration: "06:22", image: require("../assets/images/Playlist Details - Audio Listing/Image 56.png"), Listens: "10M", uri: "https://vnso-zn-23-tf-a128-z3.zmdcdn.me/e34025d1786c49fcbc3da73ac7cad923?authen=exp=1730032880~acl=/e34025d1786c49fcbc3da73ac7cad923*~hmac=36162b27cf58abd048331d26f7ee1638" }
    ];

    const [currentSong, setCurrentSong] = useState(songs[0]);

    type songProps = {
        title: string;
        artist: string;
        duration: string;
        image: any;
        Listens: string;
        uri: string;
        onPress: () => void;
    };

    const Song = ({ image, title, artist, Listens, duration, uri, onPress}: songProps) => (
        <View style={styles.containerListSong}>
            <TouchableOpacity onPress={onPress}>
                <Image style={{ height: 70, width: 70 }} source={image} />
            </TouchableOpacity>

            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{title}</Text>
                <Text style={{ color: "gray" }}>{artist}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "gray" }}>{Listens}</Text>
                    <Text style={{ color: "gray", paddingLeft: 10 }}>{duration}</Text>
                </View>
            </View>

            <TouchableOpacity>
                <Image style={styles.img30} source={require("../assets/images/Playlist Details - Audio Listing/moreIcon.png")} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollcontainer}>

                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={navigateToHome}>
                            <Image style={styles.img30} source={require("../assets/images/Playlist Details - Audio Listing/prev.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.img30} source={require("../assets/images/Playlist Details - Audio Listing/cast2TV.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <View style={styles.ImgWithTextContainer}>
                            <Image
                                style={styles.ImageWithText_imgSize}
                                source={require("../assets/images/Playlist Details - Audio Listing/Image 50.png")}
                            />
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Top 50</Text>
                                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>Canada</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Top 50 - Canada</Text>
                            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                <Image
                                    style={{ height: 17, width: 17, marginRight: 5 }}
                                    source={require("../assets/images/Playlist Details - Audio Listing/favoriteIconBlue.png")}
                                />
                                <Text style={{ color: "gray", marginRight: 10 }}>1,234</Text>
                                <Image
                                    style={{ height: 12, width: 12, marginRight: 5 }}
                                    source={require("../assets/images/Playlist Details - Audio Listing/circleGray.png")}
                                />
                                <Text style={{ color: "gray" }}>05:10:18</Text>
                            </View>
                            <Text style={{ color: "gray", marginTop: 10 }}>Daily chart - toppers update</Text>
                        </View>
                    </View>

                    <View style={styles.containerPlay}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Image style={styles.img30} source={require("../assets/images/Playlist Details - Audio Listing/favoriteIcon.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.img30} source={require("../assets/images/Playlist Details - Audio Listing/moreIcon.png")} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Image style={{ height: 30, width: 30, marginRight: 10, marginTop: 10 }} source={require("../assets/images/Playlist Details - Audio Listing/randomIcon.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={{ height: 50, width: 50 }} source={require("../assets/images/Playlist Details - Audio Listing/Icon Button 2.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ padding: 20 }}>
                        <FlatList
                            data={songs}
                            renderItem={({ item }) => (
                                <Song image={item.image} title={item.title} artist={item.artist}
                                    Listens={item.Listens} duration={item.duration} 
                                    uri={item.uri}
                                    onPress={() => setCurrentSong(item)} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>

                </ScrollView>

                <View style={styles.containerPlaying}>
                    <Image
                        source={currentSong.image}
                        style={{ width: 50, height: 50 }}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{currentSong.title}</Text>
                        <View style={styles.artistContainer}>
                            <Text style={styles.artistInfo}>Me</Text>
                            <Text style={styles.artistInfo}> ● </Text>
                            <Text style={styles.artistInfo}>{currentSong.artist}</Text>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <Image
                            source={require('../assets/images/Playlist Details - Audio Listing/favoriteIcon.png')}
                            style={{ width: 30, height: 30, tintColor: 'white' }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigateToPlayAudio(currentSong)}>
                        <Image
                            source={require('../assets/images/Playlist Details - Audio Listing/Icon Button 2.png')}
                            style={{ width: 50, height: 50, paddingLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollcontainer: {
        flexGrow: 1,
    },

    //Header
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    //Image size 30x30
    img30: {
        width: 30,
        height: 30,
        marginRight: 10
    },

    //Title
    titleContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ImgWithTextContainer: {
        position: 'relative',
        width: 120,
        height: 120
    },
    ImageWithText_imgSize: {
        width: '100%',
        height: '100%'
    },
    ImageWithText_textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    //favorite, more, random, play
    containerPlay: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    //song list
    containerListSong: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    //Playing tab
    containerPlaying: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#171a1f',
        padding: 10,
        marginBottom: 60,
    },
    artistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    artistInfo: {
        color: 'white',
        fontSize: 14,
    },
})