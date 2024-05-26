import React from 'react';
import {View, Text, ActivityIndicator, Image, ScrollView} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {t} from 'react-native-tailwindcss';
import {IMAGE_BASE_URL} from '../../utils/apiUrl';
interface props {
  data: any;
  width: number;
  height: number;
  onEndReached: () => void;
  onScroll: () => void;
  onItemLayout: () => void;
  recyclerRef: any;
}
const MyComponent: React.FC<props> = ({
  data,
  width,
  height,
  onEndReached,
  onScroll,
  onItemLayout,
  recyclerRef,
}) => {
  const [itemHeights, setItemHeights] = React.useState([]);
  const calculateItemHeight = index => {
    let totalHeight = 0;
    const rowData = data[index];
    if (rowData && rowData.movies) {
      rowData.movies
        ?.slice(0, Math.ceil(rowData?.movies.length / 2))
        .forEach(movie => {
          totalHeight += 290;
          const titleHeight = movie.title.length > 27 ? 14 : 0;
          totalHeight += titleHeight;
        });
    }
    return totalHeight;
  };
  const layoutProvider = new LayoutProvider(
    index => 0,
    (type, dim, index) => {
      const itemHeight = itemHeights[index] || calculateItemHeight(index);
      dim.width = width;
      dim.height = itemHeight;
    },
  );
  React.useEffect(() => {
    const newHeights = data.map((_, index) => calculateItemHeight(index));
    setItemHeights(newHeights);
  }, [data]);

  const rowRenderer = (type, data) => {
    return (
      <View style={[t.flex1]}>
        <Text style={[t.textRed600]}>{data.year}</Text>
        <View style={[t.flexWrap, t.flexRow, t.mY5, t.justifyStart]}>
          {data.movies?.map((r, id) => {
            return (
              <View key={id} style={{width: width / 2.2, marginBottom: 10}}>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri: IMAGE_BASE_URL + r.poster_path,
                  }}
                  resizeMode="cover"
                />
                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', padding: 5}}>
                  <Text style={{color: 'white', fontSize: 13}}>{r?.title}</Text>
                  <Text style={{color: 'white', fontSize: 13}}>
                    {r?.vote_average}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <RecyclerListView
      ref={recyclerRef}
      scroll
      style={{height: height}}
      dataProvider={new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data)}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
      forceNonDeterministicRendering={true}
      onScroll={onScroll}
      onItemLayout={onItemLayout}
      // renderFooter={() => <ActivityIndicator color={'white'} size={40} />}
    />
  );
};

export default MyComponent;
