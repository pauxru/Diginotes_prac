import React, {Component, createRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {useRef} from 'react/cjs/react.development';

const actionSheetRef = createRef();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const imageWidth = width / 3 - 6;

export default class notesCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  onSelectedImage = image => {
    let newDataImg = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
    };
    newDataImg.push(item);
    this.setState((state = {fileList: newDataImg}));
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  };

  choosePhotFromLib = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.imageplacement}>
        <Image source={item.url} style={styles.imageItem} />
      </View>
    );
  };

  showActionSheet = () => {
    // const fadeAnim = useRef(new Animated.Value(0)).current;
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 5000,
    // }).start();
    this.ActionSheet.show();
  };

  render() {
    // let actionSheet = useRef();
    // let optionArray = ['Take Photo', 'Choose Photo Lib', 'Cancel'];
    let {fileList} = this.state;

    return (
      <SafeAreaView styles={styles.safeArea}>
        <View style={styles.flat}>
          <FlatList
            numColumns={3}
            style={styles.listContainer}
            data={fileList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            //horizontal={true}
            ListEmptyComponent={
              <View style={styles.emptyTxt}>
                <Text style={{fontSize: 20}}>
                  Your Diginotes is currently Empty
                </Text>
                <Text>Your notes will appear here</Text>
              </View>
            }
          />
          <View style={styles.addBtnContainer}>
            <TouchableOpacity
              onPress={this.showActionSheet}
              style={styles.btnAddImage}>
              <Text style={styles.txtStyle}> +</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Where are your notes?'}
            // message={'Where is your notes'}
            options={['Take Photo', 'Choose Photo Lib', 'Cancel']}
            cancelButtonIndex={2}
            //destructiveButtonIndex={1}
            onPress={index => {
              switch (index) {
                case 0:
                  this.takePhotoFromCamera();
                  break;
                case 1:
                  this.choosePhotFromLib();
                  break;
                default:
                  break;
              }
            }}
          />
        </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
    numColumns: 3,
  },
  imageplacement: {
    padding: 2,
    //flexDirection: 'row',
    flexWrap: 'wrap',
  },
  safeArea: {
    borderRightColor: 'green',
    borderWidth: 0,

    // width: '100%',
    // height: '95%',
    padding: 0,
  },
  flat: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  addBtnContainer: {
    //flex: 1,
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {height: 10},
  },
  btnAddImage: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 30,

    // width: width - 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStyle: {
    color: 'blue',
  },
  imageItem: {
    width: imageWidth,
    height: imageWidth,

    borderRadius: 8,
    // resizeMode: 'contain',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  emptyTxt: {
    paddingTop: height / 2,
    //flexDirection: 'row',
    //flex: 0,
    alignContent: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
