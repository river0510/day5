/**
 * Day 7
 * Basic pan gesture
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Image,StyleSheet,StatusBar,Text,TouchableHighlight,PanResponder,View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

class Ball extends Component{
	state = {
		color: "rgba(255,255,255,0.7)"
	}
	
	_previousLeft = Util.size.width/2-40;
	_previousTop = Util.size.height/2-50;
	_maxTop = Util.size.height-110;
	_maxLeft = Util.size.width-98;
	_circleStyles = {};

	_updatePosition = ()=>{
		this.circle.setNativeProps(this._circleStyles);
	}

	_endMove = (e, gestureState)=>{
		this._previousLeft += gestureState.dx;
		this._previousTop += gestureState.dy;
		this.setState({
			color: "rgba(255,255,255,0.7)"
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
				this._circleStyles.style.left = this._previousLeft + gestureState.dx;
				this._circleStyles.style.top = this._previousTop + gestureState.dy;
				this._circleStyles.style.left = this._circleStyles.style.left < 0 ? 0 : this._circleStyles.style.left;
				this._circleStyles.style.left = this._circleStyles.style.left > this._maxLeft ? this._maxLeft : this._circleStyles.style.left;
				this._circleStyles.style.top = this._circleStyles.style.top < 5 ? 5 : this._circleStyles.style.top;
				this._circleStyles.style.top = this._circleStyles.style.top > this._maxTop ? this._maxTop : this._circleStyles.style.top;

				this._updatePosition();
			},
			onPanResponderTerminationRequest: (e,gestureState)=>true,
			onPanResponderRelease: (e,gestureState)=>this._endMove(e, gestureState),
			onPanResponderTerminate: (e,gestureState)=>this._endMove(e, gestureState)
		})

		this._circleStyles = {
			style : {
				left: this._previousLeft,
				top: this._previousTop
			}
		}
	}

	componentDidMount(){
		this._updatePosition();
	}

	render(){
		return(
			<View style={styles.ball} ref={(e) => {this.circle = e}} {...this._panResponder.panHandlers}>
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