import React from "react"; 
import {View, Text,TextInput, StyleSheet, Animated, Dimensions} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../utils/app.config';

var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    displayIcon: {
        fontSize: 30,
        height: 30,
        color: 'blue',
  },
   content:{
        flexDirection:'row',
    },
    textEdit: {
        height: 40, 
        width: 100,
        borderColor: 'grey', 
        backgroundColor: 'white',
 
        borderWidth: 1
  },
});

export default class extends React.Component {
    constructor(props){
        super (props);

        this.state = {
            offset: new Animated.Value(-deviceHeight), 
            folderName: '',
          //  currentFolderId : props.folderId, 
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();

        this.refs.folderName.focus();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    create(){

    

    var env = this.state.env; 
    //const {curEnv} = config.env;
    
     var {ApiBaseUrl} = config.dev 
     
    

     switch (env) {
            case 'devDudu':
                    ApiBaseUrl = config.devDudu.ApiBaseUrl;  
                    break;
                case 'devAdam':
                    ApiBaseUrl = config.devAdam.ApiBaseUrl; 
                    break;
                case 'devKonstya':
                    ApiBaseUrl = config.devKonstya.ApiBaseUrl; 
                     break;
                case 'qa':
                    ApiBaseUrl = config.qa.ApiBaseUrl; 
                    break;
                case 'staging':
                    ApiBaseUrl = config.staging.ApiBaseUrl; 
                        break;
                case 'production':
                    ApiBaseUrl = config.production.ApiBaseUrl; 
             default:
                 break;
         }

   const sessionToken  = encodeURIComponent(this.props.sessionToken);
   var fId = this.props.currentFolderId == null? '00000000-0000-0000-0000-000000000000' :this.props.currentFolderId;
    var createFolderUrl = `${ApiBaseUrl}/KDocuments.svc/CreateFolder?t=${sessionToken}&pid=${fId}&fn=${this.state.folderName}&folderDescription=''`;
    
    this.closeModal(); 
    this.props.updateLoading();

      fetch(createFolderUrl)
        .then((response) => response.json())
        .catch((error) => {
          //  this.updateIsLoading(false);
             Actions.error({data: 'Add folder failed'})
        })
         .then( (responseData) => {
           //var newfolderId = responseData.ResponseData.Id;
           //alert(newfolderId);

           
           // this.props.afterCreateCallback({ Id: })
       
           this.props.afterCreateCallback('success', 'folder successfully added');
         }).done();


    }

    render(){
        return (
            <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,0.5)"},
                                  {transform: [{translateY: this.state.offset}]}]}>
                <View style={{  width:250,
                                height:250,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor:"white" }}>
                    <Text>Create new folder</Text>
                    <View style={styles.content}>
                         <Icon name="folder" style={styles.displayIcon} />
                          <TextInput
                            ref="folderName"
                            value={this.state.folderName} 
                            onChangeText={folderName => this.setState({folderName})}
                            style={styles.textEdit}
                            placeholder="Folder Name"
                           
                            />
                    </View>
                    <View style={styles.content}>
                        <Button onPress={this.create.bind(this)}>Create</Button>
                        <Button onPress={this.closeModal.bind(this)}>Close</Button>
                    </View>
                </View>
            </Animated.View>
        );
    }
}
