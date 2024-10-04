import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PlaylistDetail({ navigateToHome }: any) {

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Image style={styles.imgHeader} source={require("../assets/images/Playlist Details - Audio Listing/prev.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.imgHeader} source={require("../assets/images/Playlist Details - Audio Listing/cast2TV.png")} />
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
                <View style={{marginLeft: 10,}}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Top 50 - Canada</Text>
                    <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                        <Image
                            style={{ height: 17, width: 17, marginRight: 5 }}
                            source={require("../assets/images/Playlist Details - Audio Listing/favorite.png")}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    imgHeader: {
        width: 30,
        height: 30,
    },

    titleContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    ImgWithTextContainer:{
        position: 'relative', 
        width: 120, 
        height: 120
    },
    ImageWithText_imgSize:{
        width: '100%', 
        height: '100%'
    },
    ImageWithText_textContainer:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
})