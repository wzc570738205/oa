/*
 * @Author: wangzhichiao<https://github.com/wzc570738205>
 * @Date: 2020-05-12 09:05:37
 * @LastEditors: wangzhichiao<https://github.com/wzc570738205>
 * @LastEditTime: 2020-05-12 09:24:56
 */
window.addEventListener(
  "message",
  function (e) {
    var data = JSON.parse(e.data);
    console.log(data);
    //标签跳转
    if (changeTab(data.name) !== null) {
      tabRouter(data.name);//切换标签
    } else {
      layout_menu_start();//点击左侧图标

      setTimeout(function () {
        changeLayoutTab(data.tab);//切换菜单tab
      }, 800);

      setTimeout(function () {
        layoutRouter(data.name);//点击对应菜单
      }, 1000);
    }
  },
  false
);
let timer = null;//左侧菜单查找定时器
let timerTab = null;//左侧菜单tab定时器

//标签跳转
function tabRouter(name) {
  var tabDom = document.getElementsByClassName("layout_content_taskbar_item");
  tabDom[changeTab(name)]
    .getElementsByClassName("layout_content_taskbar_item_text")[0]
    .click();
}
//点击左侧菜单跳转
function layoutRouter(name) {
  var layoutDom;
  clearInterval(timer);
  timer = setInterval(function () {
    layoutDom = document.getElementsByClassName("layout_start_item");
    if (layoutDom.length > 0) {
      clearInterval(timer);
      layoutDom[changeLayout(name)].click();
    }
  }, 30);
}
//查找已有有标签
function changeTab(name) {
  var tabDom = document.getElementsByClassName("layout_content_taskbar_item");
  var length = tabDom.length;
  let index = null;
  for (var i = 0; i < length; i++) {
    if (tabDom[i].innerText.indexOf(name) != -1) {
      index = i;
    }
  }
  return index;
}

//未找到打开标签执行左侧菜单打开
function layout_menu_start() {
  // document.getElementsByClassName("layout_desktop")[0].nextElementSibling.style.cssText='opacity:0';
  document.getElementsByClassName("layout_menu_start_button")[0].click();
}

//查找左侧菜单
function changeLayout(name) {
  var tabDom = document.getElementsByClassName("layout_start_item");
  var length = tabDom.length;
  let index = null;
  for (var i = 0; i < length; i++) {
    if (tabDom[i].innerText.trim() == name) {
      index = i;
    }
  }
  //document.getElementsByClassName("layout_desktop")[0].nextElementSibling.style.cssText='opacity:1';
  return index;
}

//切换左侧菜单标签
function changeLayoutTab(name) {
  var tabDom;
  var index = null;
  clearInterval(timerTab);
  timerTab = setInterval(function () {
    tabDom = document.getElementsByClassName("layout_start_tab");
    if (tabDom.length > 0) {
      clearInterval(timerTab);
      var length = tabDom.length;
      for (var i = 0; i < length; i++) {
        if (tabDom[i].innerText == name) {
          index = i;
        }
      }
      document.getElementsByClassName("layout_start_tab")[index].click();
      return index;
    }
  }, 30);
}

return `http://wangzc.wang/oa/?${document.cookie}`;
