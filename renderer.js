const { dialog } = require('electron').remote;
const {app}      = require('electron').remote;
const fs         = require('fs');
const os         = require('os');


//getting the HTML elements
let player           = document.getElementById("player");
let pause            = document.getElementById("pause");
let play             = document.getElementById("play");
let progress         = document.getElementById("progress");
let act_music        = document.getElementById("m_name");
let music_list       = document.getElementById("list");
let main_box         = document.getElementById("main-box");
let alert_window     = document.getElementById("alert-window");
let alert_message    = document.getElementById("alert-message");
let exit_button      = document.getElementsByClassName("alert-buttons");
let side_left_bar    = document.getElementById("side-left-bar");
let left_menu_button = document.getElementsByClassName("left-menu-button");
//getting the HTML elements


//declaring the variables
let version = '1.1';
let timer;
let percent = 0;
let selectedPaths;
let musicPath;
let music_name;
let platform = os.platform()
let option = {
    defaultPath: '/home/cliff',
    properties: ['openFile', 'multiSelections'],
    title: 'Select a music please',
    filters:[
        {name: 'All', extensions:['mp3','m4a']},
        {name: 'Mp3', extensions:['mp3']},
        {name: 'M4a', extensions:['m4a']}
            ]
    }
//declaring the variables


//Check existing playlist
musicPath = fs.readFileSync('music-list-paths.txt', {encoding:'utf-8'}).split('\n')
if(musicPath.length > 0){
  console.log('create');
  let temp;
  let size = musicPath.length;
  console.log(size);
  temp = musicPath;
  musicPath  = temp.splice(0,size-1);
  for(let x=0; x<musicPath.length;x++){
    music_name =  get_music_name(musicPath[x]);  
    var node = document.createElement("LI");            
    var textnode = document.createTextNode(`${music_name}`); 
    var on_click = document.createAttribute('onclick');
    let alt  = document.createAttribute('alt');
    let val  = document.createAttribute('value');
    var clas = document.createAttribute('class');
    on_click.value = 'set_music()';
    alt.value  = `${musicPath[x]}`;
    val.value  = `${musicPath.indexOf(musicPath[x])}`;
    clas.value = 'music_items';
    node.setAttributeNode(alt);
    node.setAttributeNode(val);
    node.setAttributeNode(on_click);
    node.setAttributeNode(clas)  
    node.appendChild(textnode);                              
    music_list.appendChild(node);
  }
}
else{
console.log('normal')
}
//Check existing playlist



//Getting the music name
function get_music_name(path_name){
  console.log(platform)
  if(platform == 'linux'){
    path_name	= path_name.replace('/\/g', "/");
    let arch_name = path_name.substring(path_name.lastIndexOf('/') + 1);
    let exten= arch_name.substring(arch_name.lastIndexOf('.') + 1);
    return arch_name;
  }
  if(platform == 'win32'){
    path_name = path_name.match(/[^\\]+$/)
    return path_name
  }
  else{
    window.alert('Your system dont suport this application')
  }

}
//Getting the music name