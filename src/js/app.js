let dialog = window.api.dialog;
let shell = window.api.shell;
let browserWindow = window.api.browserWindow;

let readFileSync = window.api.readFileSync;
let writeFileSync = window.api.writeFileSync;
let fs = window.api.fs;
let platform = window.api.platform;




//getting the HTML elements
let player = document.getElementById("player");
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let progress = document.getElementById("progress");
let act_music = document.getElementById("m_name");
let music_list = document.getElementById("list");
let main_box = document.getElementById("main-box");
let alert_box = document.getElementById("alert-box");
let alert_input = document.getElementById("alert-input");
let exit_button = document.getElementsByClassName("alert-buttons");
let side_left_bar = document.getElementById("side-left-bar");
let left_menu_button = document.getElementsByClassName("left-menu-button");
let music_box = document.getElementsByClassName("music-box");
let music_art = document.getElementsByClassName("music-art");
let box_into_main = document.getElementsByClassName("box-into-main");
let playlists_list = document.getElementById("playlists-list");
let music_list_name = document.getElementById("music-list-name");
let act_music_name = document.getElementById("act-music-name");
let info_read = document.getElementById("info-read");
let info_blocks = document.getElementsByClassName("info-blocks");
//getting the HTML elements


//declaring the variables
let version = '1.1.1';
let timer;
let percent = 0;
let selectedPaths;
let musicPath;
let pathList;
let music_name;
let persistenceJson;
let option = {
  defaultPath: '/home/cliff',
  properties: ['openFile', 'multiSelections'],
  title: 'Select a music please',
  filters: [
    { name: 'All', extensions: ['mp3', 'm4a'] },
    { name: 'Mp3', extensions: ['mp3'] },
    { name: 'M4a', extensions: ['m4a'] }
  ]
}


function update_lists() {
  try {
    persistenceJson = JSON.parse(readFileSync('./persistence.json', "utf-8"))
    musicPath = persistenceJson["actList"]["path"]
    music_list_name.value = persistenceJson["actList"]["name"]

    for (i = 0; persistenceJson["lists"].length > i; i += 1) {
      let node = document.createElement("LI");
      let div = document.createElement("DIV");
      let textnode = document.createTextNode(`${persistenceJson["lists"][i]["name"]}`);
      let on_click = document.createAttribute('onclick');
      let alt_item = document.createAttribute('alt');
      let val_item = document.createAttribute('value');
      let item_class = document.createAttribute('class');

      on_click.value = 'set_list(); selectPlayList(true);';
      val_item.value = i;
      alt_item.value = `${persistenceJson["lists"][i]["path"]}`;
      console.log(persistenceJson["lists"][i])

      node.setAttributeNode(on_click);
      node.setAttributeNode(alt_item);
      node.setAttributeNode(val_item);
      node.setAttributeNode(item_class);
      node.appendChild(textnode);
      node.appendChild(div);
      playlists_list.appendChild(node);
    }

    console.log("Json read");
  }
  catch (e) {

  }
}

update_lists();
//Check existing playlist

function updateMusicList() {
  pathList = readFileSync(musicPath, { encoding: 'utf-8' }).split('\n')
  if (pathList.length > 0) {
    console.log('create');
    let temp;
    let size = pathList.length;
    console.log(size);
    temp = pathList;
    pathList = temp.splice(0, size - 1);
    for (let x = 0; x < pathList.length; x++) {
      music_name = get_music_name(pathList[x]);
      let node = document.createElement("LI");
      let div = document.createElement("DIV");
      let textnode = document.createTextNode(`${music_name}`);
      let on_click = document.createAttribute('onclick');
      let alt_item = document.createAttribute('alt');
      let val_item = document.createAttribute('value');
      let item_class = document.createAttribute('class');

      on_click.value = 'set_music()';
      alt_item.value = `${pathList[x]}`;
      val_item.value = `${pathList.indexOf(pathList[x])}`;
      item_class.value = 'music-list-item';

      node.setAttributeNode(on_click);
      node.setAttributeNode(alt_item);
      node.setAttributeNode(val_item);
      node.setAttributeNode(item_class);
      node.appendChild(textnode);
      node.appendChild(div);
      music_list.appendChild(node);
    }
  }
  else {
    console.log('normal')
  }
}
updateMusicList()
//Check existing playlist

//Read the list of playlists



//Select actual list
function selectPlayList(backIsTrue) {

  if (backIsTrue == true) {
    info_blocks[0].style.display = "";
    info_read.style.display = "";
    box_into_main[0].style.display = "";
  }
  else {
    info_blocks[0].style.display = "none";
    info_read.style.display = "none";
    box_into_main[0].style.display = "flex";
  }
}

function set_list() {

  document.getElementById('playlists-list').addEventListener('click', function (e) {
    e = e || window.event;

    let target = e.target.id || e.srcElement
    console.log("chgou aqui" + target.value)
    target.alt = `${persistenceJson["lists"][target.value]["path"]}`
    music_list_name.value = `${persistenceJson["lists"][target.value]["name"]}`
    musicPath = target.alt;
    persistenceJson["actList"]["name"] = music_list_name.value;
    persistenceJson["actList"]["path"] = musicPath;
    writeFileSync("./persistence.json", JSON.stringify(persistenceJson, null, 2))
    clear_list();
    updateMusicList()
  }, false);
}

//Getting the music name
function get_music_name(path_name) {
  platform = window.navigator.platform;
  if (platform == 'Linux x86_64') {
    path_name = path_name.replace('/\/g', "/");
    let arch_name = path_name.substring(path_name.lastIndexOf('/') + 1);
    let exten = arch_name.substring(arch_name.lastIndexOf('.') + 1);
    return arch_name;
  }
  if (platform == 'Win32') {
    path_name = path_name.match(/[^\\]+$/)
    return path_name
  }
  else {
    window.alert('Your system dont suport this application')
  }

}


function miniMize() {
  remote.BrowserWindow.getFocusedWindow().minimize();
}

function maxMize() {
  let window = remote.BrowserWindow.getFocusedWindow();
  window.isMaximized() ? window.unmaximize() : window.maximize();
}

function exitApp() {
  window.close();
}

function openLink() {
  shell.openExternal('https://github.com/Mastercliff')
}