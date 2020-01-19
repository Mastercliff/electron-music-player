//Progress bar
player.addEventListener("playing", function(_event) {
    var duration = _event.target.duration;
    advance(duration, player);
  });
  player.addEventListener("pause", function(_event) {
    clearTimeout(timer);
    console.log('exe')
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
  
    if(ct == dur){
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
    index = musicPath.indexOf(player.value)
    n_index = index + 1;
    if(n_index < musicPath.length){
      player.src   = musicPath[n_index]
      player.value = musicPath[n_index]
      music_name = get_music_name(musicPath[n_index])
      set_music_name(music_name);
      console.log(index)
      console.log(player.src)
      console.log(n_index)
      play_pause();
      play_pause();
    }
    else{
    console.log('Back to first music')
    player.src   = musicPath[0]
    player.value = musicPath[0]
    music_name = get_music_name(musicPath[0])
    set_music_name(music_name)
    play_pause();
    play_pause();
    }
    
}

function back_music(){
  let index;
  let n_index;
  clearTimeout(timer);
    index = musicPath.indexOf(player.value)
    n_index = index - 1;
    if(n_index <= musicPath.length){
      if(n_index != -1){
      player.src   = musicPath[n_index]
      player.value = musicPath[n_index]
      music_name = get_music_name(musicPath[n_index])
      set_music_name(music_name)
      play_pause();
      play_pause();
      }else{
      player.src   = musicPath[0]
      player.value = musicPath[0]
      }

    }
    else{
      console.log('Index error')
    }
    
}

  
//Controls of music states

//Set the music
function clear_list(){
    let music_items = document.getElementsByClassName('music_items');
  
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
  
  
function set_music(){
    
  
    document.getElementById('list').addEventListener('click', function(e) {
      e = e || window.event;
      var target = e.target || e.srcElement
         text = target.textContent || target.innerText;  
         target.alt = musicPath[target.value];
         clearTimeout(timer);
          player.src = target.alt;
          player.value = musicPath[target.value];
          console.log(target.alt, target.value);
          music_name = get_music_name(target.alt);
          set_music_name(music_name);
          stop_au();
          play_pause();
    }, false);
    
  
}
function set_music_name(name){
    act_music.innerHTML = `<marquee>${name}</marquee>`;
}
  
//Set the music