import React from 'react';
import {Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import {t} from 'react-native-tailwindcss';

interface ButtonProps {
  onPress: () => void;
  title: String;
  bgColor?: String;
  color?: String;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  bgColor = 'black',
  color = 'white',
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={
      [
        t.p4,
        t.rounded,
        t.mR5,
        t.mB3,
        !bgColor ? t.bgGray800 : {backgroundColor: bgColor},
      ] as ViewStyle
    }>
    <Text style={[t.textAuto, t.textWhite, t.fontBold, {color}] as TextStyle}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
