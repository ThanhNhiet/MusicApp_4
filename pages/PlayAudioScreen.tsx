import { Route } from 'expo-router/build/Route';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

const api = "https://6716220e33bc2bfe40bc87df.mockapi.io/api/src";

export default function PlayAudioScreen({ navigateToPlayListDetail, song }: any) {

    const [songs, setSongs] = useState<songProps[]>([]);
    type songProps = {
        id: string;
        title: string;
        artist: string;
        artist_id: string;
        duration: string;
        image: string;
        Listens: string;
        uri: string;
        onPress: () => void;
    };

    const [artists, setArtists] = useState<artistProps[]>([]);
    type artistProps = {
        id: string;
        name: string;
        image: string;
    };
    const [currentSong, setCurrentSong] = useState<songProps | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null); //use state quan ly am thanh
    const [isPlaying, setIsPlaying] = useState(false); //Trang thai phat nhac
    const [PPicon, setPPicon] = useState(require('../assets/images/Play an Audio/playIcon.png'))
    const [positionMillis, setPositionMillis] = useState(0);
    const [durationMillis, setDurationMillis] = useState(0);

    const fetchSongs = async () => {
        try {
            const response = await axios.get(api);
            const dataWithSongs = response.data.find((item: any) => item.songs);

            if (dataWithSongs && dataWithSongs.songs) {
                setSongs(dataWithSongs.songs);
            }
            const dataWithArtists = response.data.find((item: any) => item.artists);
            if (dataWithArtists && dataWithArtists.artists) {
                setArtists(dataWithArtists.artists);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    useEffect(() => {
        if (song) {
            setCurrentSong(song); // Cập nhật bài hát hiện tại
        }
        return () => {
            // Cleanup khi component bị unmount
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [song]);

    // Hàm phát hoặc tạm dừng nhạc
    async function handlePlayPause() {
        try {
            if (sound === null) {
                if (currentSong && currentSong.uri) {
                    const { sound: newSound } = await Audio.Sound.createAsync(
                        { uri: currentSong.uri }
                    );
                    setSound(newSound);
                    setIsPlaying(true);
                    setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'));

                    newSound.setOnPlaybackStatusUpdate((status) => {
                        if (status.isLoaded) {
                            setPositionMillis(status.positionMillis);
                            setDurationMillis(status.durationMillis || 1);
                        }
                    });
                    await newSound.playAsync();
                } else {
                    throw new Error("No song selected");
                }
            } else {
                if (isPlaying) {
                    await sound.pauseAsync();
                    setIsPlaying(false);
                    setPPicon(require('../assets/images/Play an Audio/playIcon.png'));
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                    setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'));
                }
            }
        } catch (error) {
            console.error("Error playing/pausing audio:", error);
            Alert.alert("Error", "403");
            setPPicon(require('../assets/images/Play an Audio/playIcon.png'));
        }
    }

    //Điều hướng trở lại playlist detail
    async function handleNavigateBack() {
        try {
            if (sound) {
                if (isPlaying) {
                    await sound.stopAsync(); // Dừng nhạc nếu đang phát
                }
                await sound.unloadAsync(); // Giải phóng tài nguyên âm thanh
            }
            navigateToPlayListDetail(); // Điều hướng trở lại trang danh sách bài hát
        } catch (error) {
            console.error("Error playing/pausing audio:", error); // Log lỗi cho developer
            navigateToPlayListDetail();
        }
    }

    async function handleNext() {
        try {
            // Tìm chỉ số hiện tại của currentSong trong danh sách songs
            if (!currentSong) throw new Error("No song selected");
            const currentIndex = songs.findIndex(song => song.id === currentSong.id);

            // Tính chỉ số bài hát tiếp theo
            const nextIndex = (currentIndex + 1) % songs.length;

            // Lấy bài hát tiếp theo
            const nextSong = songs[nextIndex];
            setCurrentSong(nextSong); // Cập nhật bài hát hiện tại

            // Dừng bài hát hiện tại (nếu có)
            if (sound) {
                await sound.unloadAsync();
            }

            // Tạo và phát bài hát tiếp theo
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: nextSong.uri });
            setSound(newSound);
            setIsPlaying(true);
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPositionMillis(status.positionMillis);
                    setDurationMillis(status.durationMillis || 1);
                }
            });
            setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'));
            await newSound.playAsync();
        } catch (error) {
            console.error(error);
        }
    }

    async function handlePrev() {
        try {
            // Tìm chỉ số hiện tại của currentSong trong danh sách songs
            if (!currentSong) throw new Error("No song selected");
            const currentIndex = songs.findIndex(song => song.id === currentSong.id);

            // Tính chỉ số bài hát trước đó
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;

            // Lấy bài hát trước đó
            const prevSong = songs[prevIndex];
            setCurrentSong(prevSong); // Cập nhật bài hát hiện tại

            // Dừng bài hát hiện tại (nếu có)
            if (sound) {
                await sound.unloadAsync();
            }

            // Tạo và phát bài hát trước đó
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: prevSong.uri });
            setSound(newSound);
            setIsPlaying(true); // Đang phát nhạc
            setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'));
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPositionMillis(status.positionMillis);
                    setDurationMillis(status.durationMillis || 1);
                }
            });
            await newSound.playAsync();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRandom() {
        try {
            // Kiểm tra nếu danh sách bài hát rỗng
            if (songs.length === 0) throw new Error("Song list is empty");
    
            // Lấy ngẫu nhiên một bài hát không trùng với bài hát hiện tại
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (currentSong && songs[randomIndex].id === currentSong.id);
    
            // Lấy bài hát ngẫu nhiên
            const randomSong = songs[randomIndex];
            setCurrentSong(randomSong); // Cập nhật bài hát hiện tại
    
            // Dừng bài hát hiện tại (nếu đang phát)
            if (sound) {
                await sound.unloadAsync();
            }
    
            // Tạo và phát bài hát ngẫu nhiên
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: randomSong.uri });
            setSound(newSound);
            setIsPlaying(true);
            setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'));
    
            // Cập nhật trạng thái phát nhạc
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPositionMillis(status.positionMillis);
                    setDurationMillis(status.durationMillis || 1);
                }
            });
    
            await newSound.playAsync(); // Phát bài hát
        } catch (error) {
            console.error("Error in handleRandom:", error);
            Alert.alert("Error", "Could not play a random song");
            setPPicon(require('../assets/images/Play an Audio/playIcon.png'));
        }
    }
    

    return (
        <ImageBackground
            source={require('../assets/images/Play an Audio/Image 58.png')}
            style={styles.backgroundImage}
        >

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Play</Text>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Image source={require('../assets/images/Play an Audio/dropdown.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Main content */}
            <View style={styles.mainContent}>

                {/* Info */}
                {(currentSong &&
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.songTitle}>{currentSong.title}</Text>
                            <Text style={styles.artist}>{artists.find((item: artistProps) => item.id === currentSong.artist_id)?.name}</Text>
                            {/* <Text style={styles.artist}>{currentSong.artist}</Text> */}
                        </View>

                        {/* Audio wave image AKA progress bar */}
                        {/* <Image
                            source={require('../assets/images/Play an Audio/Group 4.png')}
                            style={styles.audioWave}
                        /> */}

                        {/* Time display */}
                        {/* <View style={styles.timeContainer}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>0:06</Text>
                            <Text style={styles.timeText}>{currentSong.duration}</Text>
                        </View> */}

                        <View style={styles.progressBarContainer}>
                            <View
                                style={[
                                    styles.progressBar,
                                    { width: `${(positionMillis / durationMillis) * 100}%` }
                                ]}
                            />
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                                {new Date(positionMillis).toISOString().substr(14, 5)}
                            </Text>
                            <Text style={styles.timeText}>
                                {new Date(durationMillis).toISOString().substr(14, 5)}
                            </Text>
                        </View>
                    </View>
                )}
                {/* Controls */}
                <View style={styles.controlsContainer}>
                    <TouchableOpacity onPress={handleRandom}>
                        <Image source={require('../assets/images/Play an Audio/randomIcon.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePrev}>
                        <Image source={require('../assets/images/Play an Audio/prevSong.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                        <Image source={PPicon} style={styles.playButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <Image source={require('../assets/images/Play an Audio/nextSong.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/Play an Audio/moreIcon.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                </View>

                {/* Bottom bar */}
                <View style={styles.bottomBar}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Image source={require('../assets/images/Play an Audio/favoriteIcon.png')} style={styles.bottomIcon} />
                            <Text style={styles.bottomText}>12K</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }}>
                            <Image source={require('../assets/images/Play an Audio/comment.png')} style={styles.bottomIcon} />
                            <Text style={styles.bottomText}>450</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/images/Play an Audio/upload.png')} style={styles.bottomIcon} />
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        justifyContent: 'space-between',
    },

    //Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    icon: {
        width: 20,
        height: 20,
    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    //Main content container
    mainContent: {
        flex: 1,
        marginTop: '90%',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    //Info
    infoContainer: {
        paddingHorizontal: 20,
    },
    songDetails: {
        alignItems: 'center',
    },
    songTitle: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
    audioWave: {
        width: 300,
        height: 50,
        marginVertical: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    timeText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        width: '100%',
        height: 4,
        backgroundColor: '#555',
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'white',
    },

    //Controls buttons
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
    },
    controlIcon: {
        width: 30,
        height: 30,
        tintColor: '#f9f9fb'
    },
    playButton: {
        width: 60,
        height: 60,
        tintColor: '#f9f9fb'
    },

    //Bottom bar
    bottomBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    bottomIcon: {
        width: 25,
        height: 25,
        tintColor: '#f9f9fb',
    },
    bottomText: {
        color: 'gray',
        fontSize: 13,
        marginLeft: 5,
        marginTop: 5,
    },
});
