const APPLICATION_KEY = "25109abf9bb96a6a929a3ae3d3a6de74320adf03dd33655e46e31d7eeb365c59";
const CLIENT_KEY = "c24f859e28e7281e30d0a72d679bddfcdd6c59004a47edc8d28b9df413b09a63";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "GameScore";
let GameScore = ncmb.DataStore(DBName);
let timer = null;
const MAX = q.length;
num = 0;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);


  for(let i=0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id","num"+i)
    s.addEventListener('click', function() {
      if (this.textContent == q[qNum][1]){
        correct.play();
        num++;
        alert("great!!");
        while (cells.firstChild){
          cells.removeChild(cells.firstChild);
        }
        stage.textContent = num+1;
        gameStart();
      }else{
        wrong.play();
        alert("donmai!!");
      }
    });
    cells.appendChild(s);
    if (i%size == size-1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }



  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num"+p);
  ans.textContent = q[qNum][1];
  if (num == 2){
    while (cells.firstChild){
      cells.removeChild(cells.firstChild);
    }
    clearTimeout(timer);
    let end = document.createElement("span");
    end.textContent="Clear!!";
    cells.appendChild(end);
    save();
  }

}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime()-start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);

}

  function fetch(){
    let times;
    GameScore
    .order("score")
    .fetchAll()
    .then(function(results){
      times=[];
      for(let i=0;i<results.length;i++)
        times.push(results[i].score);
        console.log("times",times,score.textContent,times[0],parseInt(score.textContent)==times[0]);
        if(parseInt(score.textContent)==times[0])
        alert("High Score!! :"+score.textContent);
    })
    .catch(function(err){
      console.log("エラー",err);
    });
  }

  function save(){
    console.log("save("+score.textContent+")");
    let test = new GameScore();
    let key = "score";
    let value = parseInt(score.textContent);
    test.set(key,value);
    test.save()
    .then(function(){
      console.log("成功");
      fetch()
    })
    .catch(function(err){
      console.log("失敗");
    });
  }
