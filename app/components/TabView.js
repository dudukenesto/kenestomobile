
import React from "react";
import {View, Text, StyleSheet, AsyncStorage, ListView, Image }
        from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import LeftMenuItem from './LeftMenuItem';
 

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        height: 100,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F5F6F8",
        borderBottomWidth: 2,
        borderBottomColor: '#EbEbEb',
        marginBottom: 10
    },
    avatarContainer: {
        margin: 5
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
  },
    userInfoContainer: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
     rowSeparator: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 1,
        marginLeft: 4,
  },
  rowSeparatorSelected: {
        opacity: 1,
  },
  rowSeparatorHide: {
        opacity: 0
  }
});




class TabView extends React.Component {

    constructor(props){
        super (props);
        this.state = {
                dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
        }), 
        }
    }

    componentWillMount(){
        this.loadMenu();
    }




    getDataSource(menuItems: Array<any>) : ListView.DataSource  {
        return this.state.dataSource.cloneWithRows(menuItems);
    }

    loadMenu(){
        var menuItems = [
            {
                Id: 'recentDocs',
                itemTitle : 'Recent Documents', 
                itemCount : 60, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: true
            },
            {
                Id: 'myDocs',
                itemTitle : 'My Documents', 
                itemCount : 140, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: false
            },
            {
                Id: 'allDocs',
                itemTitle : 'All Documents', 
                itemCount : 60, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: false
            },
            {
                Id: 'chckDocs',
                itemTitle : 'Checked-out Documents', 
                itemCount : 42, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: false
            },
             {
                Id: 'archivedDocs',
                itemTitle : 'Archived Documents', 
                itemCount : 18, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: false
            },
            {
                Id: 'spaceUsage',
                itemTitle : 'My usage space', 
                itemCount : null, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: false
            },
            {
                Id: 'logout',
                itemTitle : 'Logout', 
                itemCount : null, 
                itemIcon: '../assets/images/folder_icon.png',
                selected: false
            }
        ]; 

 this.setState({
          dataSource:  this.getDataSource(menuItems)
        });
       
    }

    render(){
        const drawer = this.context.drawer;
        var  imageSource = require('../assets/images/folder_icon.png');
         
        return (
            <View style={styles.screenContainer}>
                <View style={[styles.headerContainer, this.props.sceneStyle]}>
                    <View style={styles.avatarContainer}>
                        <Image source = {imageSource} style={styles.avatar} />
                    </View>
                    <View  style={styles.userInfoContainer}>
                        <Text style={{color: '#000'}}>Username</Text>
                        <Text>{this.props.loggedUser}</Text>
                    </View>
                                        
                </View>
                <View>
                    <ListView 
                        ref="MenuList"
                        renderSeparator={this.renderSeparator.bind(this)}
                        dataSource={this.state.dataSource}
                        renderFooter={null}
                        renderRow={this.renderRow.bind(this)}
                        onEndReached={null}
                        automaticallyAdjustContentInsets={false}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={true}
                        showsVerticalScrollIndicator={false}
                    />
                
                </View>
            </View>
            
        );
    }


    SelectItem(menuitem : Object){
        menuitem.selected = true;
        alert(menuitem.Id)

    }

    renderSeparator( sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean){
        var style = styles.rowSeparator;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (
        <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
        );
    }

    renderRow(listItem: Object,
        sectionID: number | string,
        rowID: number | string,
        highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void){
     
    return (
        <LeftMenuItem
                key={listItem.Id}
                onSelect={() => this.SelectItem(listItem)}
                onHighlight={() => highlightRowFunc(sectionID, rowID)}
                onUnhighlight={() => highlightRowFunc(null, null)}
                listItem={listItem}
            />
    );
     
    }


    
    _ClearCredentials(){
        AsyncStorage.multiRemove(["kenestoU","kenestoP", "env"]); 
    }
}


module.exports = TabView;

// TabView.contextTypes = {
//     drawer: React.PropTypes.object
// };