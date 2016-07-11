import React from 'react';
import ReactNative from 'react-native';
import Button from "react-native-button";
import config from '../utils/app.config';
var FileUpload = require('NativeModules').FileUpload;
const Android_Download_Path = '/storage/emulated/0/download';
var RNFS = require('react-native-fs');

const {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform,
  NativeModules: {
    ImagePickerManager
  }, 
  CameraRoll
} = ReactNative;

export default class App extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null, 
    avatarData: null,
  };

  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: false
    };
    
   

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        var source;
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
              source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
          //source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        this.setState({
          avatarSource: source,
          avatarData: response.data
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }
  
     saveToCameraRoll() {



        var downloadpath = '';

         if (Platform.OS === 'ios')
              downloadpath =RNFS.DocumentDirectoryPath;
         else
              downloadpath = Android_Download_Path;

         
        var filePath = downloadpath + '/gaga.text';

        var url = 'http://images.one.co.il/images/d/dmain/ms/gg1232472.jpg';

          RNFS.downloadFile({ fromUrl: url, toFile: '/storage/emulated/0/download/shoinfeld.jpg'}).then(res => {
     // this.setState({ output: JSON.stringify(res) });
    //  this.setState({ imagePath: { uri: 'file://' + testImage1Path } });
        //alert('done');
    }).catch(err => alert(err));
  

       
        
          //  RNFS.writeFile(filePath, 'Lorem ipsum dolor sit amet', 'utf8')
          //               .then((success) => {
          //                 alert('file written: ');
          //               })
          //               .catch((err) => {
          //                 alert(err.message)
          //               });
        
        // console.log('saving to camera roll');
        // console.log(this.state.photo.uri);
        
        // fetch('http://images.one.co.il/images/d/dmain/ms/gg1247180.jpg',{
        //         method: 'get',
        //         headers: {
        //             'Accept': 'multipart/form-data',
        //             'Content-Type': 'multipart/form-data'
        //         }
        //         }).then(response => {
        //             var path = RNFS.DocumentDirectoryPath + '/zuzu.png';
        //            // debugger
                   
        //            alert(response);
        //            var path = RNFS.DocumentDirectoryPath + '/test.txt';

        //          //   RNFS.writeFile(path, base64Icon, 'base64')
        //          RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        //                 .then((success) => {
        //                   alert('file written!');
        //                 })
        //                 .catch((err) => {
        //                   alert(err.message)
        //                 });
                        
  
        //         }).done();
 

        

    }
  
  _uploadPhoto(){
      
      var progress1 = data => {
     // var text = JSON.stringify(data);
     // this.setState({ output: text });
    };

    var begin1 = res => {
     // jobId1 = res.jobId;
    };

        var {ApiBaseUrl} = config.dev.ApiBaseUrl; 
         
           // var fd = new FormData();
    
       //  var myObj = { "FileName": BLOB.FileName, "Length": BLOB.Length, "FileByteStream": BLOB.FileByteStream };
       //  var dataToSend = '{"request":' + JSON.stringify(myObj) + '}';
         
         var _uploadUrl = `${ApiBaseUrl}/KDocuments.svc/uploadfile/kababa`; 


        var options = {
          toUrl: _uploadUrl,
          files: [{ name: 'myfile', filename: 'thing.jpg', filepath: testImage1Path, filetype: 'image/jpeg' }],
          beginCallback: begin1,
          progressCallback: progress1
        };

    RNFS.uploadFiles(options).then(res => {
      var response = JSON.parse(res.response);

     // this.assert('Upload should have name', response.myfile.name, 'thing.jpg');
     // this.assert('Upload should have type', response.myfile.type, 'image/jpeg');
     // this.assert('Upload should have size', response.myfile.size, 312428);

    //  this.setState({ output: JSON.stringify(res) });
    }).



       // fd.append('input', {uri: this.state.source, data: encodeURIComponent(this.state.avatarData)}); // works
        //    fd.append('imData', encodeURIComponent(this.state.avatarData))
         //NativeModules.ReadImageData.readImage(this.state.avatarSource.uri, (image) =>{
              fetch('http://10.0.0.104/Kenesto.Web.API/KDocuments.svc/uploadfile/baba',{
                method: 'post',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Content-Type': 'multipart/form-data'
                },
                body:  this.state.avatarData// JSON.stringify({fileContents : this.state.avatarData})
                }).then(response => {
                }).done();
 
      //   });
         
         
     
    
  }
  
  
    // <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
    //       <View style={[styles.avatar, styles.avatarContainer]}>
    //         <Text>Select a Video</Text>
    //       </View>
    //     </TouchableOpacity>

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

      

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }
        
          <Button onPress={this._uploadPhoto.bind(this)}>submit</Button>
          
         <Button onPress={this.saveToCameraRoll.bind(this)}>save to device</Button>
         
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
