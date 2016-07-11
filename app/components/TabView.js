
import React from "react";
import {View, Text, StyleSheet, AsyncStorage,ListView }
        from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import LeftMenuItem from './LeftMenuItem';
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
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
                itemIcon: '../assets/images/folder_icon.png'
            },
            {
                Id: 'myDocs',
                itemTitle : 'My Documents', 
                itemCount : 140, 
                itemIcon: '../assets/images/folder_icon.png'
            },
            {
                Id: 'allDocs',
                itemTitle : 'All Documents', 
                itemCount : 60, 
                itemIcon: '../assets/images/folder_icon.png'
            },
            {
                Id: 'chckDocs',
                itemTitle : 'Checked-out Documents', 
                itemCount : 60, 
                itemIcon: '../assets/images/folder_icon.png'
            },
            {
                Id: 'spaceUsage',
                itemTitle : 'My usage space', 
                itemCount : null, 
                itemIcon: '../assets/images/folder_icon.png'
            },
            {
                Id: 'logout',
                itemTitle : 'Logout', 
                itemCount : null, 
                itemIcon: '../assets/images/folder_icon.png'
            }
        ]; 

 this.setState({
          dataSource:  this.getDataSource(menuItems)
        });
       
    }

    render(){
        const drawer = this.context.drawer;
         
        return (
            <View>
                <View style={[styles.container, this.props.sceneStyle]}>
                    <Text>Logged in as</Text>
                    <Text>{this.props.loggedUser}</Text>
                    <Button onPress={() => {drawer.close();this._ClearCredentials(); Actions.launch();}}>Log off</Button>
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
