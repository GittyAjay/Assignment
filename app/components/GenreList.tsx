import React from 'react';
import {FlatList} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Button from './Button';
interface props {
  data: any;
  onClick: (param: any) => void;
}
const GenreList: React.FC<props> = ({data, onClick}) => {
  const [selectedButton, setSelectedButton] = React.useState();
  return (
    <FlatList
      style={[t.alignCenter]}
      horizontal={true}
      renderItem={({item}) => (
        <Button
          bgColor={selectedButton === item.id ? 'red' : null}
          title={item.name}
          onPress={() => {
            setSelectedButton(item.id);
            onClick(item);
          }}
        />
      )}
      data={data}
    />
  );
};
export default GenreList;
