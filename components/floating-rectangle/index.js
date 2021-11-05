import React, { useRef, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Easing,
	PanResponder,
	Dimensions,
} from 'react-native'

const {width, height} = Dimensions.get('window')

const FloatingRectangle = ({setShowFloatingRectangle}) => {
	const pan = useRef(new Animated.ValueXY({x: width-70-20, y: height-70-20})).current
	const [cur, setCur] = useState({x: width-70-20, y: height-70-20})
	let lastGesture = useRef({dx: 0, dy: 0}).current

	const panResponder = PanResponder.create({    
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (event, gesture) => {
			pan.setValue({
				x: cur.x + gesture.dx,
				y: cur.y + gesture.dy,
			})
			lastGesture = {
				dx: gesture.dx,
				dy: gesture.dy,
			}
		},
		onPanResponderRelease: (event, gesture) => {
			const movingLeft = event.nativeEvent.pageX - event.nativeEvent.locationX + 35 <= width / 2
			Animated.spring(pan, {
				toValue: {
					x: movingLeft ? 20 : width - 70 - 20,
					y: cur.y + gesture.dy,
				},
				useNativeDriver: false,
			}).start(() => {
				setCur({
					x: movingLeft ? 20 : width - 70 - 20, 
					y: cur.y + lastGesture.dy,
				})
			});
		}
	});

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={pan.getLayout()}
		>
			<View style={styles.rectangle} />
			<TouchableOpacity 
				style={styles.button}
				onPress={() => setShowFloatingRectangle(mode => !mode)}
			>
				<Text style={styles.textButton}>x</Text>
			</TouchableOpacity>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	rectangle: {
		width: 70, 
		height: 70, 
		borderRadius: 50, 
		backgroundColor: 'blueviolet'
	},
	button: {
		...StyleSheet.absoluteFillObject,
		width: 12, 
		height: 12, 
		borderRadius: 3, 
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textButton: {
		fontSize: 8,
		color: '#ffffff',
		marginTop: -2,
	}
})

export default FloatingRectangle