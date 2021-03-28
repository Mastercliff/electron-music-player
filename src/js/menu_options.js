function createAboutWindow() {
    let aboutWin = new window.api.BrowserWindow({
        width: 500,
        height: 600,
        resizable: false,
        frame: false,
        webPreferences: {
            enableRemoteModule: true,

        }
    })
    aboutWin.loadFile('./src/about.html');
}


function open_file() { //This function opens the files and saves them to a .txt file
    selectedPaths = dialog.showOpenDialogSync(null, option);
    pathList = selectedPaths;
    if (selectedPaths == undefined) {
        console.log('Cancelado')
    }
    else {
        let teste = '';
        let temp;
        clear_list()
        console.log(selectedPaths)
        for (let x = 0; x < selectedPaths.length; x++) {
            music_name = get_music_name(selectedPaths[x]);
            var node = document.createElement("LI");
            var textnode = document.createTextNode(`${music_name}`);
            var on_click = document.createAttribute('onclick');
            let alt_item = document.createAttribute('alt');
            let val_item = document.createAttribute('value');


            var item_class = document.createAttribute('class');
            on_click.value = 'set_music()';

            alt_item.value = `${selectedPaths[x]}`;
            val_item.value = `${selectedPaths.indexOf(selectedPaths[x])}`;
            item_class.value = 'music-list-item';

            node.setAttributeNode(on_click);

            node.setAttributeNode(alt_item);
            node.setAttributeNode(val_item);
            node.setAttributeNode(item_class);
            node.appendChild(textnode);
            music_list.appendChild(node);
            temp = `${selectedPaths[x]}\n`
            teste = teste + temp

            try { fs.writeFileSync(musicPath, teste, 'utf-8'); }
            catch (e) { console.log(e) }

            stop_au();
        }
    }

}

function add_music() {
    console.log(dialog);
    selectedPaths = dialog.showOpenDialogSync(null, option);
    data = fs.readFileSync(musicPath, 'utf-8');
    console.log(data);
    for (i = 0; selectedPaths.length > i; i++) {
        temp = `${selectedPaths[i]}\n`;
        if (data.indexOf(get_music_name(temp)) == -1) {
            console.log("add path: " + selectedPaths[i])
            data = data + temp;
        }
        else {
            console.log("replicate remove path: " + selectedPaths[i])
        }
    }

    try {
        fs.writeFileSync(musicPath, data, 'utf-8');
        clear_list()
        updateMusicList()
    }
    catch (e) { console.log(e) }
}

function add_new_list() {
    let pathName = persistenceJson["lists"].length;
    let listName = alert_input.value;
    let newPlayList = {
        "name": `${listName}`,
        "path": `./music_lists/${pathName}.txt`
    }
    persistenceJson["lists"].push(newPlayList);
    fs.writeFileSync(`./music_lists/${pathName}.txt`, "");
    fs.writeFileSync("./persistence.json", JSON.stringify(persistenceJson, null, 2));
    playlists_list.innerHTML = "";
    update_lists();
    alert_box.style.display = '';
}

function clear_act_list() {
    let result = window.confirm('You want delete all musics in this list?');

    if (result == true) {
        fs.writeFileSync(musicPath, "")
        clear_list()
        updateMusicList()
    }

}

//Active the player Viwer
function player_Viwer() {
    main_box.style.display = 'flex';
    left_menu_button[0].style.display = '';
    side_left_bar.style.display = '';
}

function about() {

    createAboutWindow();

}

function shutdown() {
    const options = {
        type: 'question',
        buttons: ['Yes', 'No'],
        defaultId: 2,
        title: 'Exit',
        message: 'Do you want to do this?',
        detail: 'please dont :)',
    };

    dialog.showMessageBox(null, options,).then((res) => {
        if (res.response == 0) {
            exit();
        }
        else if (res.response == 1) {
            console.log("okay");
        }
    });
}

function exit() {
    window.close()
}
function cancel() {
    main_box.style.display = '';
    alert_window.style.display = 'none';
    left_menu_button[0].style.display = '';
    side_left_bar.style.display = '';
}

//Set the elements display to 'none'
function dNone() {
    main_box.style.display = 'none';
    left_menu_button[0].style.display = 'none';
    side_left_bar.style.display = 'none';
}