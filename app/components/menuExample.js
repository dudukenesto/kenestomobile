'use strict';

const React = require('react');
const {
  ScrollView,
  StyleSheet,
  Text,
  View
} = React;

import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';

const Example = React.createClass({
  componentDidMount() {
    // We can use the public context API to open/close/toggle the menu.
    //setInterval(() => {
    //  this.refs.MenuContext.toggleMenu('menu1');
    //}, 2000);
  },
  getInitialState() {
    return {
      dropdownSelection: '-- Choose --'
    };
  },
 
 
  render() {
    return (
      <MenuContext style={{ flex: 1 }} ref="MenuContext">
      
        <View style={styles.content}>
          <Text style={styles.contentText}>
            You can also make it a dropdown
          </Text>
          <Menu style={styles.dropdown} onSelect={(value) => this.setState({ dropdownSelection: value })}>
            <MenuTrigger>
              <Text>{this.state.dropdownSelection}</Text>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                         renderOptionsContainer={(options) => <ScrollView><Text>CHOOSE SOMETHING....</Text>{options}</ScrollView>}>
              <MenuOption value="Option One">
                <Text>Option One</Text>
              </MenuOption>
              <MenuOption value="Option Two">
                <Text>Option Two</Text>
              </MenuOption>
              <MenuOption value="Option Three">
                <Text>Option Three</Text>
              </MenuOption>
              <MenuOption value="Option Four">
                <Text>Option Four</Text>
              </MenuOption>
              <MenuOption value="Option Five">
                <Text>Option Five</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </MenuContext>
    );
  }
});

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  menuTrigger: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  contentText: {
    fontSize: 18
  },
  dropdown: {
    width: 300,
    borderColor: '#999',
    borderWidth: 1,
    padding: 5
  },
  dropdownOptions: {
    marginTop: 30,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 300,
    height: 200
  }
});

module.exports = Example;