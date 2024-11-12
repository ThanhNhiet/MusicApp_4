import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios";

const api = "https://6716220e33bc2bfe40bc87df.mockapi.io/api/songs";

type songProps = {
    id: string;
    title: string;
    artist: string;
    duration: string;
    image: string;
    Listens: string;
    uri: string;
    onPress: () => void;
};

export default function PlaylistDetail({ navigateToHome, navigateToPlayAudio }: any) {

    const [songs, setSongs] = useState<songProps[]>([]);
    const [currentSong, setCurrentSong] = useState<songProps | null>(null);

    const fetchSongs = async () => {
        try {
            const response = await axios.get(api);
            setSongs(response.data);
            setCurrentSong(response.data[0]); // Đặt bài hát đầu tiên làm bài hát hiện tại
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);



    const Song = ({ id, image, title, artist, Listens, duration, uri, onPress }: songProps) => (
        <View style={styles.containerListSong}>
            <TouchableOpacity onPress={onPress}>
                <Image style={{ height: 70, width: 70 }} source={{ uri: image }} />
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
                            renderItem={({ item }: any) => (
                                <Song id={item.id} image={item.image} title={item.title} artist={item.artist}
                                    Listens={item.Listens} duration={item.duration}
                                    uri={item.uri}
                                    onPress={() => setCurrentSong(item)} />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>

                </ScrollView>

                {currentSong &&(
                <View style={styles.containerPlaying}>
                    <Image
                        source={{ uri: currentSong.image }}
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
                )}
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