
import React from "react";
import {View, Text, StyleSheet, AsyncStorage,ListView }
        from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import LeftMenuItem from './LeftMenuItem';
 

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F6F8", 
        borderBottomWidth: 2,
        borderBottomColor: '#EbEbEb',
        marginBottom: 10
    },
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff"
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
                rowHasChanged: (row1, row2) => row1 !== row2,}), 
                selectedItem: 0        
            }
    }

    componentWillMount(){
        this.loadMenu();
    }




    getDataSource(menuItems: Array<any>) : ListView.DataSource  {
        return this.state.dataSource.cloneWithRows(menuItems);
    }

    loadMenu(selectedIndex = 0){
        var menuItems = [
            {
                Index: 0,
                itemTitle : 'Recent Documents', 
                itemCount : 60, 
                itemIcon: 'folder_icon',
                iconSeleted : 'rotten_tomatoes_icon',
                selected: true
            },
            {
                Index: 1,
                itemTitle : 'My Documents', 
                itemCount : 140, 
                itemIcon: 'folder_icon',
                iconSeleted : 'rotten_tomatoes_icon',
                selected: false
            },
            {
                Index: 2,
                itemTitle : 'All Documents', 
                itemCount : 60, 
                itemIcon: 'folder_icon',
                iconSeleted : 'rotten_tomatoes_icon',
                selected: false
            },
            {
                Index: 3,
                itemTitle : 'Checked-out Documents', 
                iconSeleted : 'rotten_tomatoes_icon',
                itemCount : 60, 
                itemIcon: 'folder_icon',
                selected: false
            },
             {
                Index: 4,
                itemTitle : 'Archived Documents', 
                itemCount : 60, 
                itemIcon: 'folder_icon',
                iconSeleted : 'rotten_tomatoes_icon',
                selected: false
            },
            {
                Index: 5,
                itemTitle : 'My usage space', 
                itemCount : null, 
                itemIcon: 'folder_icon',
                iconSeleted : 'rotten_tomatoes_icon',
                selected: false
            },
            {
                Index: 6,
                itemTitle : 'Logout', 
                itemCount : null, 
                itemIcon: 'folder_icon',
                iconSeleted : 'rotten_tomatoes_icon',
                selected: false
            }
        ]; 

 this.setState({
          dataSource:  this.getDataSource(menuItems), 
          selectedItem : selectedIndex 
        });
       
    }

    render(){
        const drawer = this.context.drawer;
        return (
            <View style={styles.screenContainer}>
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

        this.loadMenu(menuitem.Index);
       
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
                key={listItem.Index}
                onSelect={() => this.SelectItem(listItem)}
                onHighlight={() => highlightRowFunc(sectionID, rowID)}
                onUnhighlight={() => highlightRowFunc(null, null)}
                listItem={listItem}
                IsSelected = {listItem.Index == this.state.selectedItem}
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
