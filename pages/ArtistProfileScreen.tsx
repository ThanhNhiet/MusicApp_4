import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function ArtistProfile({ navigateToHome, idArtist }: { navigateToHome: any, idArtist: string }) {

    const artists = [
        { id: '1', name: 'Jennifer Wilson', img: require("../assets/images/Home - Audio Listing/Image 39.png") },
        { id: '2', name: 'Elizabeth Hall', img: require("../assets/images/Home - Audio Listing/Image 40.png") },
        { id: '3', name: 'Anthony Thow', img: require("../assets/images/Home - Audio Listing/Image 41.png") },
    ];
    type artistProps = {
        id: string;
        name: string;
        img: any;
    };

    const songs = [
        { id: "1", title: "Let you free", duration: "03:36", image: require("../assets/images/Playlist Details - Audio Listing/Image 51.png"), Listens: "2.1M" },
        { id: "2", title: "Blinding Lights", duration: "03:35", image: require("../assets/images/Playlist Details - Audio Listing/Image 52.png"), Listens: "68M" },
        { id: "3", title: "Levitating", duration: "04:39", image: require("../assets/images/Playlist Details - Audio Listing/Image 53.png"), Listens: "93M" },
        { id: "4", title: "Astronaut in the Ocean", duration: "07:48", image: require("../assets/images/Playlist Details - Audio Listing/Image 54.png"), Listens: "9M" },
        { id: "5", title: "Dyamite", duration: "03:36", image: require("../assets/images/Playlist Details - Audio Listing/Image 55.png"), Listens: "23M" }
    ];
    type songProps = {
        title: string;
        duration: string;
        image: any;
        Listens: string;
    };

    const albums = [
        { id: "1", title: 'Me', image: require("../assets/images/Artist Profile/Image 71.png") },
        { id: "2", title: 'Magna nost', image: require("../assets/images/Artist Profile/Image 72.png") },
        { id: "3", title: 'Proident nuke', image: require("../assets/images/Artist Profile/Image 77.png") },
    ]
    type albumProps = {
        title: string;
        image: any;
    }

    const recommends = [
        { id: "1", title: 'Magna nost', image: require("../assets/images/Artist Profile/Image 74.png") },
        { id: "2", title: 'Exerciatio', image: require("../assets/images/Artist Profile/Image 75.png") },
        { id: "3", title: 'Tempor nate', image: require("../assets/images/Artist Profile/Image 76.png") },
    ]
    type recommendsProps = {
        title: string;
        image: any;
    }

    const [artist, setArtist] = useState<artistProps | null>(null);

    useEffect(() => {
        if (idArtist) {
            const artistFound = artists.find((artist) => artist.id === idArtist);
            setArtist(artistFound || null);
        }
    }, [idArtist]);

    const Song = ({ image, title, Listens, duration }: songProps) => (
        <View style={styles.containerListSong}>
            <TouchableOpacity>
                <Image style={{ height: 70, width: 70 }} source={image} />
            </TouchableOpacity>

            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{title}</Text>
                <Text style={{ color: "gray" }}>{artist?.name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "gray" }}>{Listens}</Text>
                    <Text style={{ color: "gray", paddingLeft: 10 }}>{duration}</Text>
                </View>
            </View>

            <TouchableOpacity>
                <Image style={styles.img30} source={require("../assets/images/Artist Profile/moreIcon.png")} />
            </TouchableOpacity>
        </View>
    );

    const Album = ({ image, title }: albumProps) => (
        <View style={styles.paddingItem}>
            <TouchableOpacity>
                <Image source={image} />
            </TouchableOpacity>
            <Text style={{ fontWeight: '500' }}>{title}</Text>
            <Text style={{ color: 'gray' }}>{artist?.name}</Text>
        </View>
    );

    const Recommend = ({ image, title }: recommendsProps) => (
        <View style={styles.paddingItem}>
            <TouchableOpacity>
                <Image source={image} />
            </TouchableOpacity>
            <Text style={{ fontWeight: '500' }}>{title}</Text>
            <Text style={{ color: 'gray' }}>{artist?.name}</Text>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollcontainer}>
                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={navigateToHome}>
                            <Image style={styles.img30} source={require("../assets/images/Artist Profile/prev.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={artist?.img} />
                        <Text style={styles.artistName}>{artist?.name}</Text>
                        <Text style={{ color: 'gray' }}>65.1K Followers</Text>
                    </View>

                    <View style={styles.playBtnContainer}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                <Text style={{
                                    fontSize: 17,
                                    color: 'gray',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    padding: 10,
                                    width: 100,
                                    textAlign: 'center',
                                    alignContent: 'center',
                                    borderRadius: 30,
                                }}>Follow</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <Image style={styles.img40} source={require('../assets/images/Artist Profile/moreIcon.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                <Image style={styles.img40} source={require('../assets/images/Artist Profile/randomIcon.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <Image style={styles.img40} source={require('../assets/images/Artist Profile/Icon Button 4.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.popularSongContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Popular</Text>
                        <FlatList
                            data={songs}
                            renderItem={({ item }) => (
                                <Song image={item.image} title={item.title}
                                    Listens={item.Listens} duration={item.duration}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={styles.albumsContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Albums</Text>
                        <FlatList
                            data={albums}
                            renderItem={({ item }) => (
                                <Album image={item.image} title={item.title}
                                />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                        <Image source={require('../assets/images/Artist Profile/Image 73.png')} />
                        <Text style={{color: 'gray'}}>I give to desire, and to duties, to work, is a cure, unless the pain of the result 
                            is the pleasure of the two. I'll come to see who wants to rush to the market, some of
                            them are a market with some pleasure to not a large market. Give them no
                        </Text>
                        <TouchableOpacity style={{marginTop: 5}}>
                            <Text style={{color: 'blue', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>View more</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{paddingHorizontal: 20, marginBottom: 100}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Albums</Text>
                        <FlatList
                            data={recommends}
                            renderItem={({ item }) => (
                                <Album image={item.image} title={item.title}
                                />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
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
        marginBottom: 10,
    },

    //Avatar
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 250,
        height: 250,
        marginBottom: 10,
    },
    artistName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    //Image size
    img30: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    img40: {
        width: 40,
        height: 40,
    },

    //Play button
    playBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    //song list
    containerListSong: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    //Popular song
    popularSongContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },

    //Albums
    albumsContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    paddingItem: {
        marginRight: 10,
    },
});
