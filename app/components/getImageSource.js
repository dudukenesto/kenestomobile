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

function getImageSource(document: Object, kind: ?string): {uri: ?string} {
  var uri = document && document.HasThumbnail ? document.Thumbnail : null;
 uri = 'http://10.0.0.117/Kenesto.Images/Images.svc/4_df733dd2-1e6e-4702-8ed5-9e58af166133.jpg';
  // if (uri && kind) {
  //   uri = uri.replace('tmb', kind);
  // }
  
  return { uri };
}

module.exports = getImageSource;
