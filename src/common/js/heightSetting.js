export function heightSetting() {
  let windowHeight = window.screen.height;
  console.log(`window:${windowHeight}`)
  let body = document.getElementsByTagName('body')[0];
  let bodyHeight = body.offsetHeight;
  console.log(bodyHeight)
  let html = document.getElementsByTagName('html')[0]
  let htmlHeight = html.offsetHeight;
  console.log(htmlHeight);
  (windowHeight > htmlHeight)?
    html.className = body.className = 'shortPage':
    html.className = body.className = 'longPage';
}

/**
 * config
 */

// &.shortPage {
//   width: 100%;
//   height: 100%;
//   min-width: 1280px;
//   min-height: 800px;
//   max-width: 1856px;
//   padding: 0;
//   margin: 0;
//   position: relative;
//   overflow: hidden;
// }
// &.scrollPage {
//   width: 100%;
//   height: 100%;
//   min-width: 1280px;
//   min-height: 800px;
//   padding: 0;
//   margin: 0;
//   position: relative;
//   overflow: visible;
// }
// &.longPage {
//   width: 100%;
//   height: auto;
//   min-width: 1280px;
//   min-height: 800px;
//   padding: 0;
//   margin: 0;
//   position: relative;
//   overflow: visible;
//   width: 100%;
//   height: 100%;
//   overflow-x: hidden;
//   max-width: 1856px;
//   min-width: 1280px;
//   min-height: 800px;
//   padding: 0;
//   margin: 0;
//   position: relative;
// }
