import { Route } from 'expo-router/build/Route';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

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

export default function PlayAudioScreen({ navigateToPlayListDetail, song }: any) {

    const [songs, setSongs] = useState<songProps[]>([]);
    const [currentSong, setCurrentSong] = useState<songProps | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null); //use state quan ly am thanh
    const [isPlaying, setIsPlaying] = useState(false); //Trang thai phat nhac
    const [PPicon, setPPicon] = useState(require('../assets/images/Play an Audio/playIcon.png'))

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
                // Tạo sound mới nếu chưa có sound
                if (currentSong && currentSong.uri) { // Kiểm tra xem currentSong và URI không phải null
                    const { sound: newSound } = await Audio.Sound.createAsync(
                        { uri: currentSong.uri }
                    );
                    setSound(newSound);
                    setIsPlaying(true); // Đang phát nhạc
                    setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'));
                    await newSound.playAsync();
                } else {
                    throw new Error("No song selected");
                }
            } else {
                // Nếu đã có sound, kiểm tra xem đang phát hay tạm dừng
                if (isPlaying) {
                    await sound.pauseAsync(); // Tạm dừng nhạc
                    setIsPlaying(false);
                    setPPicon(require('../assets/images/Play an Audio/playIcon.png'))
                } else {
                    await sound.playAsync(); // Phát lại nhạc
                    setIsPlaying(true);
                    setPPicon(require('../assets/images/Play an Audio/pauseIcon.png'))
                }
            }
        } catch (error) {
            console.error("Error playing/pausing audio:", error); // Log lỗi cho developer
            Alert.alert("Error", "403"); // Thông báo lỗi cho người dùng
            setPPicon(require('../assets/images/Play an Audio/playIcon.png'))
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
            setIsPlaying(true); // Đang phát nhạc
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
            await newSound.playAsync();
        } catch (error) {
            console.error(error);
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
                            <Text style={styles.artist}>{currentSong.artist}</Text>
                        </View>

                        {/* Audio wave image */}
                        <Image
                            source={require('../assets/images/Play an Audio/Group 4.png')}
                            style={styles.audioWave}
                        />

                        {/* Time display */}
                        <View style={styles.timeContainer}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>0:06</Text>
                            <Text style={styles.timeText}>{currentSong.duration}</Text>
                        </View>
                    </View>
                )}
                {/* Controls */}
                <View style={styles.controlsContainer}>
                    <TouchableOpacity>
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
