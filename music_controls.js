//Progress bar
player.addEventListener("playing", function(_event) {
    var duration = _event.target.duration;
    advance(duration, player);
  });
  player.addEventListener("pause", function(_event) {
    clearTimeout(timer);
    console.log('timer clear');
  });

  var advance = function(duration, element) {

    increment = 10/duration
    percent = Math.min(increment * element.currentTime * 10, 100);
    a =  percent+'%'
    progress.style.width = a;
    startTimer(duration, element);
  }
  var startTimer = function(duration, element){

    timer = setTimeout(function (){advance(duration, element)}, 100);

    let dur = (player.duration/60).toFixed(2)
    let ct  = (player.currentTime/60).toFixed(2)

    console.log(`duraçao: ${dur}, ct: ${ct}`)

    if(ct == dur || (ct + 0.01) == dur){
      next_music()
    }

  }
//Progress bar


//Controls of music states
function play_pause(){

    if(pause.style.display == 'none'){
        player.play()
        pause.style.display = 'inline-block'
        play.style.display = 'none'

    }
    else{
        player.pause()
        pause.style.display = 'none'
        play.style.display = 'inline-block'
    }

}

function stop_au(){
    player.pause();
    player.currentTime = 0;
    pause.style.display = 'none'
    play.style.display = 'inline-block'
}

function next_music(){
  let index;
  let n_index;
  clearTimeout(timer);
    index = pathList.indexOf(player.value)
    n_index = index + 1;
    if(n_index < pathList.length){
      player.src   = pathList[n_index]
      player.value = pathList[n_index]
      music_name = get_music_name(pathList[n_index])
      set_music_name(music_name);
      console.log(index)
      console.log(player.src)
      console.log(n_index)
      play_pause();
      play_pause();
    }
    else{
    console.log('Back to first music')
    player.src   = pathList[0]
    player.value = pathList[0]
    music_name = get_music_name(pathList[0])
    set_music_name(music_name)
    play_pause();
    play_pause();
    }

}

function back_music(){
  let index;
  let n_index;
  clearTimeout(timer);
    index = pathList.indexOf(player.value)
    n_index = index - 1;
    if(n_index <= pathList.length){
      if(n_index != -1){
      player.src   = pathList[n_index]
      player.value = pathList[n_index]
      music_name = get_music_name(pathList[n_index])
      set_music_name(music_name)
      play_pause();
      play_pause();
      }else{
      player.src   = pathList[0]
      player.value = pathList[0]
      }

    }
    else{
      console.log('Index error')
    }
}


//Controls of music states


function clear_list(){
    let music_items = document.getElementsByClassName('music-list-item');

    if(music_items.length == 0){
      console.log('continue')
    }
    else{
      for(let index=0; index < music_items.length;index=0){
        console.log(music_items)
        if(music_items.length == 0){
          console.log('all has been removed')
        }
        else{
          music_items[index].remove()
          console.log('remove ' + index)
        }

      }
    }



  }

//Set the music
function set_music(){
    
    document.getElementById('list').addEventListener('click', function(e) {
      e = e || window.event;

      var target = e.target.id || e.srcElement

         text = target.textContent || target.innerText;
         target.alt = pathList[target.value];
         clearTimeout(timer);
          console.log("Chegou aqui " + target.alt);
          player.src = target.alt;
          player.value = pathList[target.value];
          console.log(target.alt, target.value);
          music_name = get_music_name(target.alt);
          set_music_name(music_name);
          stop_au();
          play_pause();
    }, false);


}
function set_music_name(name){
   // act_music.innerHTML = `<marquee>${name}</marquee>`;
   act_music_name.innerText = name;
}

function clear_act_list(){
  fs.writeFileSync(musicPath, "")
  clear_list()
  updateMusicList()
}
//Set the music
/*
function set_volume(){
  let vol_value = audio_control.value;
  let vol_result = vol_value/100;
  player.volume = `${vol_result}`;
}*/