import React, {FC} from 'react';
import {ActivityIndicator, View, useWindowDimensions} from 'react-native';
import {t} from 'react-native-tailwindcss';
import GenreList from '../../components/GenreList';
import {
  getGenreList,
  getMovieList,
  updateReleaseYear,
  filterMovieListOnGenreId,
} from './Home.action';
import {connect} from 'react-redux';
import {store_reducers} from '../../utils/interface';
import SectionList from './RecyclerList';
interface Props {
  getGenreList: () => void;
  getMovieList: (param?: String) => void;
  filterMovieListOnGenreId: (param?: String) => void;
  genreList: any;
  filtered_movieList: [];
  movieList: any;
  totalPages: Number;
  totalResuls: Number;
  primary_release_year: String;
  loading: Boolean;
}
const HomePage: FC<Props> = ({
  getGenreList,
  getMovieList,
  genreList,
  movieList,
  filtered_movieList,
  updateReleaseYear,
  filterMovieListOnGenreId,
  loading,
  primary_release_year,
}) => {
  const {width, height} = useWindowDimensions();
  const [getGenreCalled, setGetGenreCalled] = React.useState(false);
  const recyclerRef = React.useRef(null);

  React.useEffect(() => {
    getGenreList();
    getMovieList(primary_release_year);
    // if (genreList) onGenreSelected(genreList[0]);
  }, []);

  const onEndReached = () => {
    if (!loading) {
      if (primary_release_year) {
        updateReleaseYear();
        getMovieList(primary_release_year);
      }
    }
  };
  const onGenreSelected = (selected_genre: any) => {
    setGetGenreCalled(true);
    filterMovieListOnGenreId(selected_genre.id);
  };
  const onScroll = () => {
    setGetGenreCalled(false);
  };
  const onItemLayout = () => {
    // if (recyclerRef) {
    //   recyclerRef.current.scrollToEnd({animated: false});
    // }
  };
  return (
    <View style={[t.flex, t.pL3, t.pT4, t.bgBlack]}>
      <GenreList onClick={onGenreSelected} data={genreList} />
      {movieList && movieList.length > 0 && (
        <View style={{width: width, height: height + 50}}>
          <SectionList
            data={filtered_movieList}
            width={width}
            height={height}
            onScroll={onScroll}
            onEndReached={!getGenreCalled ? onEndReached : () => {}}
            onItemLayout={onItemLayout}
            recyclerRef={recyclerRef}
          />
          {loading && <ActivityIndicator color={'white'} size={20} />}
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state: store_reducers) => ({
  genreList: state.homePageData.genreList,
  movieList: state.homePageData.movieList,
  totalPages: state.homePageData.totalPages,
  totalResuls: state.homePageData.totalResuls,
  primary_release_year: state.homePageData.primary_release_year,
  loading: state.homePageData.loading,
  filtered_movieList: state.homePageData.filtered_movieList,
});
export default connect(mapStateToProps, {
  getGenreList,
  getMovieList,
  updateReleaseYear,
  filterMovieListOnGenreId,
})(HomePage);
