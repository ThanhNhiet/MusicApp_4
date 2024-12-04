import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function ArtistProfile({ navigateToHome, idArtist }: { navigateToHome: any, idArtist: string }) {

    const [songss, setSongss] = useState<songPropss[]>([]);
    type songPropss= {
        id: string;
        title: string;
        duration: string;
        image: string;
        Listens: string;
        artist_id: string;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.101.7:5000/songs');
                setSongss(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);
        
    const [artists, setArtists] = useState<artistProps[]>([]);
    type artistProps = {
        id: string;
        name: string;
        img: string;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.101.7:5000/artists');
                setArtists(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);


    
    const [albums, setAlbums] = useState<albumProps[]>([]);
    type albumProps = {
        id: string;
        name: string;
        img: string;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.101.7:5000/albums');
                setAlbums(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, []);


    
    const [recommends, setRecommends] = useState<recommendsProps[]>([]);
    type recommendsProps = {
        id: string;
        title: string;
        image: string;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.101.7:5000/recommends');
                setRecommends(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);


    const [artist, setArtist] = useState<artistProps | null>(null);
    useEffect(() => {
        if (idArtist && artists.length > 0) {
            const artistFound = artists.find((artist) => artist.id === idArtist);
            setArtist(artistFound || null);

            if(artistFound) {
                getSongByArtistId(artistFound.id);
            }
        }
    }, [idArtist, artists]);

    const [artistSongs, setArtistSongs] = useState<songPropss[]>([]);
    function getSongByArtistId(artistId: string) {
        const songByArtist = songss.filter(song => song.artist_id === artistId);
        setArtistSongs(songByArtist);
    }

    const Song = ({ image, title, Listens, duration }: songPropss) => (
        <View style={styles.containerListSong}>
            <TouchableOpacity>
                <Image style={{ height: 70, width: 70 }} source={{uri: image}} />
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

    const Album = ({id, img, name }: albumProps) => (
        <View style={styles.paddingItem}>
            <TouchableOpacity>
                <Image source={{uri: img}} style={{height: 150, width: 150}}/>
            </TouchableOpacity>
            <Text style={{ fontWeight: '500' }}>{name}</Text>
            <Text style={{ color: 'gray' }}>{artist?.name}</Text>
        </View>
    );

    const Recommend = ({ image, title }: recommendsProps) => (
        <View style={styles.paddingItem}>
            <TouchableOpacity>
                <Image source={{uri: image}} style={{height: 150, width: 150}}/>
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
                        <Image style={styles.avatar} source={{ uri: artist?.img }} />
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
                            data={artistSongs}
                            renderItem={({ item }) => (
                                <Song id={item.id} artist_id={item.artist_id} image={item.image} title={item.title} Listens={item.Listens} duration={item.duration}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={styles.albumsContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Albums</Text>
                        <FlatList
                            data={albums}
                            renderItem={({ item }: any) => (
                                <Album id={item.id} img={item.img} name={item.name}
                                />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                        <Image source={require('../assets/images/Artist Profile/Image 73.png')} />
                        <Text style={{ color: 'gray' }}>I give to desire, and to duties, to work, is a cure, unless the pain of the result
                            is the pleasure of the two. I'll come to see who wants to rush to the market, some of
                            them are a market with some pleasure to not a large market. Give them no
                        </Text>
                        <TouchableOpacity style={{ marginTop: 5 }}>
                            <Text style={{ color: 'blue', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>View more</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Fan also like</Text>
                        <FlatList
                            data={recommends}
                            renderItem={({ item }) => (
                                <Recommend id={item.id} image={item.image} title={item.title}
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
