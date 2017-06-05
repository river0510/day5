/**
 * Day 7
 * Basic pan gesture
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Image,StyleSheet,StatusBar,Text,TouchableHighlight,PanResponder,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

const initLeft = Util.size.width/2-40;
const initTop = Util.size.height/2-50;

class Ball extends Component{
	state = {
		left: initLeft,
		top: initTop,
		previousLeft: initLeft,
		previousTop: initTop,
		color: "rgba(255,255,255,0.7)"
	}
	
	_maxTop = Util.size.height-110;
	_maxLeft = Util.size.width-98;

	_endMove = (e, gestureState)=>{
		let previousTop, previousLeft;
		previousLeft = this.state.previousLeft + gestureState.dx;
		previousTop = this.state.previousTop + gestureState.dy;
		this.setState({
			color: "rgba(255,255,255,0.7)",
			previousTop: previousTop,
			previousLeft: previousLeft
		})
	}

	componentWillMount(){
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gestureState)=> true,
			onMoveShouldSetPanResponder: (e,gestureState)=>true,
			onPanResponderGrant: (e,gestureState)=>{
				this.setState({
					color: "#fff"
				})
			},
			onPanResponderMove: (e,gestureState)=>{
				let left,top;
				left = this.state.previousLeft + gestureState.dx;
				top = this.state.previousTop + gestureState.dy;
				left = left < 0 ? 0 : left;
				left = left > this._maxLeft ? this._maxLeft : left;
				top = top < 5 ? 5 : top;
				top = top > this._maxTop ? this._maxTop : top;
				
				this.setState({
					left: left,
					top: top
				})
			},
			onPanResponderTerminationRequest: (e,gestureState)=>true,
			onPanResponderRelease: (e,gestureState)=>this._endMove(e, gestureState),
			onPanResponderTerminate: (e,gestureState)=>this._endMove(e, gestureState)
		})

	}

	render(){
		return(
			<View style={[styles.ball,{left: this.state.left, top: this.state.top}]} {...this._panResponder.panHandlers}>
				<Icon name="ios-baseball" size={120} style={{color: this.state.color}}></Icon>
			</View>
		)
	}
}

export default class Main extends Component{
	render(){
		return(
			<View>
				<Image source={require('./img/agrass.png')} style={styles.bg}/>
				<View style={styles.ballContainer}>
					<Ball></Ball>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	bg: {
		width: Util.size.width,
		resizeMode:"stretch",
		position: "absolute"
	},
	ballContainer: {
		width: Util.size.width,
		height: Util.size.height
	},
	ball: {
		position: "absolute",
		backgroundColor: "transparent",
	}
})