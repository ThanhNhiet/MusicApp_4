import { Route } from 'expo-router/build/Route';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';

export default function PlayAudioScreen({ navigateToPlayListDetail, song }: any) {
    const [currentSong, setCurrentSong] = useState(song);
    const [sound, setSound] = useState<Audio.Sound | null>(null); //use state quan ly am thanh
    const [isPlaying, setIsPlaying] = useState(false); //Trang thai phat nhac

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
        if (sound === null) {
            // Tạo sound mới nếu chưa có sound
            const { sound: newSound } = await Audio.Sound.createAsync({
                uri: currentSong.uri,
            });
            setSound(newSound);
            setIsPlaying(true); // Đang phát nhạc
            await newSound.playAsync();
        } else {
            // Nếu đã có sound, kiểm tra xem đang phát hay tạm dừng
            if (isPlaying) {
                await sound.pauseAsync(); // Tạm dừng nhạc
                setIsPlaying(false);
            } else {
                await sound.playAsync(); // Phát lại nhạc
                setIsPlaying(true);
            }
        }
    }

    async function handleNavigateBack() {
        if (sound) {
            if (isPlaying) {
                await sound.stopAsync(); // Dừng nhạc nếu đang phát
            }
            await sound.unloadAsync(); // Giải phóng tài nguyên âm thanh
        }
        navigateToPlayListDetail(); // Điều hướng trở lại trang danh sách bài hát
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

                {/* Controls */}
                <View style={styles.controlsContainer}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/Play an Audio/randomIcon.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/Play an Audio/prevSong.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                        <Image source={require('../assets/images/Play an Audio/Icon Button 3.png')} style={styles.playButton} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/Play an Audio/nextSong.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/Play an Audio/moreIcon.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                </View>

                {/* Bottom bar */}
                <View style={styles.bottomBar}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <TouchableOpacity style={{ flexDirection: 'row'}}>
                            <Image source={require('../assets/images/Play an Audio/favoriteIcon.png')} style={styles.bottomIcon} />
                            <Text style={styles.bottomText}>12K</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15}}>
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
