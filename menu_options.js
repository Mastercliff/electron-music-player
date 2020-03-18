function open_file(){ //This function opens the files and saves them to a .txt file
    selectedPaths = dialog.showOpenDialogSync(null ,option);
    if(selectedPaths == undefined){
       console.log('erro')
   }
    else{
     let teste = '';
     let temp;
     clear_list()
     musicPath = selectedPaths;
     for(let x=0; x<selectedPaths.length;x++){
     music_name =  get_music_name(selectedPaths[x]);
     var node = document.createElement("LI");
     var textnode = document.createTextNode(`${music_name}`);
     var on_click = document.createAttribute('onclick');
     let alt_item  = document.createAttribute('alt');
     let val_item  = document.createAttribute('value');


     var item_class = document.createAttribute('class');
     on_click.value = 'set_music()';

     alt_item.value = `${musicPath[x]}`;
     val_item.value  = `${musicPath.indexOf(musicPath[x])}`;
     item_class.value = 'music-list-item';
    
     node.setAttributeNode(on_click);

     node.setAttributeNode(alt_item);
     node.setAttributeNode(val_item);
     node.setAttributeNode(item_class);
     node.appendChild(textnode);
     music_list.appendChild(node);
     temp = `${selectedPaths[x]}\n`
     teste = teste + temp

     try { fs.writeFileSync('music-list-paths.txt',teste, 'utf-8'); }
     catch(e) { alert('not save!'); }

     stop_au();
     }
    }



}
//Active the player Viwer
function player_Viwer(){
    main_box.style.display = 'inline';
    left_menu_button[0].style.display = '';
    side_left_bar.style.display   = '';
}

function about(){
   let message = `Version: ${version}\nThis app is still under development\n \nDeveloper: MasterCliff\nGithub: https://github.com/Mastercliff\nElectron Version: 7.1.2`
   dNone();
   alert_window.style.display = 'inline-block';
   alert_message.innerText = `${message}`;
   alert_message.style.textAlign = 'left';
   exit_button[0].style.zIndex = '-1'
   exit_button[0].style.color  = 'rgba(0, 0, 0, 0.2)'
   exit_button[0].style.borderColor = 'rgba(0, 0, 0, 0.2)'


}

function shutdown(){
    let message = "You really want leave the\n Aplication?"
    dNone();
    alert_message.innerText = message
    alert_window.style.display = 'inline-block';
    alert_message.style.textAlign = 'center';
    exit_button[0].style.zIndex = ''
    exit_button[0].style.color  = ''
    exit_button[0].style.borderColor = ''
 
}

function exit(){
    window.close()
}
function cancel(){
    main_box.style.display = 'inline';
    alert_window.style.display = 'none';
    left_menu_button[0].style.display = '';
    side_left_bar.style.display   = '';
    audio_control_block.style.display = '';
}

//Set the elements display to 'none'
function dNone(){
    audio_control_block.style.display = 'none';
    main_box.style.display = 'none';
    left_menu_button[0].style.display = 'none';
    side_left_bar.style.display   = 'none';
}