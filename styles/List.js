import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from "../settings/Colors";

export default StyleSheet.create({
	rowFront: {
 		display: 'flex',
		backgroundColor: '#fff',
		borderBottomColor: Colors.border,
		borderBottomWidth: 0,
    paddingLeft: 0,
    marginLeft:0,
    marginTop: 0,
    paddingTop: 0,
	},

	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
		height: '100%'
	},

	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
  label: {
	  color:'#9b9b9b'
  },
	input: {
		paddingBottom:0,
		paddingHorizontal: 0
	}
});