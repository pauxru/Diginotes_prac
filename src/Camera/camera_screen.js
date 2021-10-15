import React, {Component} from 'react';
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

// Dimensions for the screen, for use in relative positioning
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// for image size in the display on the flatlist. 3 columns of equal sized images
const imageWidth = width / 3 - 6;

export default class imagePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  // Push images in the flatlist display. Will be used for storage and backup
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

  // Take photos using the camera and crop them before saving
  // Can be used to take video and compress the image for storage
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

  // Choose images already on the phone with croping
  // Will add multiple selection later using Async storage
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

  // render the images for display after it is captured
  // Saving errors will be handled here
  renderItem = ({item, index}) => {
    return (
      <View style={styles.imageplacement}>
        <Image source={item.url} style={styles.imageItem} />
      </View>
    );
  };

  // Actionsheet for options from below
  // Animation parameters and functions is needed to handle its rendering
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    let {fileList} = this.state; // this will be used by Async storage to get
    // mutilple files from the device or backup

    return (
      <SafeAreaView styles={styles.safeArea}>
        <View style={styles.flat}>
          <FlatList // contains the aspects and characteristics of the list of images
            numColumns={3} // explicit definition of the number of images on the width scaled by the size of the device
            style={styles.listContainer}
            data={fileList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            //horizontal={true}
            ListEmptyComponent={
              // For empty flat list content
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
            title={'Select one'}
            // message={'Where is your notes'}
            options={['Take Photo', 'Choose from Gallery', 'Cancel']}
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
