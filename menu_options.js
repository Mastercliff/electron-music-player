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
     let alt  = document.createAttribute('alt');
     let val  = document.createAttribute('value');
     var clas = document.createAttribute('class');
     on_click.value = 'set_music()';
     alt.value  = `${selectedPaths[x]}`;
     val.value  = `${selectedPaths.indexOf(selectedPaths[x])}`;
     clas.value = 'music_items';
     node.setAttributeNode(alt);
     node.setAttributeNode(val);
     node.setAttributeNode(on_click);
     node.setAttributeNode(clas)  
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

function about(){
   let message = `Version: ${version}\nThis app is still under development\n \nDeveloper: MasterCliff\nGithub: https://github.com/Mastercliff\nElectron Version: 7.1.2`
   main_box.style.display = 'none';
   alert_window.style.display = 'inline-block';
   alert_message.innerText = `${message}`;
   alert_message.style.textAlign = 'center';
   exit_button[0].style.zIndex = '-1'
   exit_button[0].style.color  = 'rgba(0, 0, 0, 0.2)'
   exit_button[0].style.borderColor = 'rgba(0, 0, 0, 0.2)'
   

}

function shutdown(){
    let message = "You really want leave the\n Aplication?"
    alert_message.innerText = message
    main_box.style.display = 'none';
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
}