/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var getImageSource = require('../components/getImageSource');
//var getStyleFromScore = require('./getStyleFromScore');
//var getTextFromScore = require('./getTextFromScore');

var DocumentScreen = React.createClass({
  render: function() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Image
            source={getImageSource(this.props.docuement, 'det')}
            style={styles.detailsImage}
          />
          <View style={styles.rightPane}>
            <Text style={styles.documetTitle}>{this.props.document.Title}</Text>
            <Text>some text for the document</Text>
            <View style={styles.mpaaWrapper}>
              <Text style={styles.mpaaText}>
                some rating score or something
              </Text>
            </View>
             <Text>This is where the rating used to be</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Text>
          {this.props.document.Description}
        </Text>
        <View style={styles.separator} />
         <Text>Some more bullshit to read</Text>
      </ScrollView>
    );
  },
});

var Ratings = React.createClass({
  render: function() {
    var criticsScore = this.props.ratings.critics_score;
    var audienceScore = this.props.ratings.audience_score;

    return (
      <View>
        <View style={styles.rating}>
          <Text style={styles.ratingTitle}>Critics:</Text>
          <Text style={[styles.ratingValue, { color: '#999999'} ]}>
            some text
          </Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingTitle}>Audience:</Text>
          <Text style={[styles.ratingValue, { color: '#999999'} ]}>
            some more text
          </Text>
        </View>
      </View>
    );
  },
});

var Cast = React.createClass({
  render: function() {
    if (!this.props.actors) {
      return null;
    }

    return (
      <View>
        <Text style={styles.castTitle}>Actors</Text>
        {this.props.actors.map(actor =>
          <Text key={actor.name} style={styles.castActor}>
            &bull; {actor.name}
          </Text>
        )}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  documentTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    marginTop: 10,
  },
  ratingTitle: {
    fontSize: 14,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '500',
  },
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  mpaaText: {
    fontFamily: 'Palatino',
    fontSize: 13,
    fontWeight: '500',
  },
  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  castTitle: {
    fontWeight: '500',
    marginBottom: 3,
  },
  castActor: {
    marginLeft: 2,
  },
});

module.exports = DocumentScreen;
