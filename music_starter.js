let modenum;
let facenum;
let charanum = 50;
let charaX = 350;
let charaY = 150;
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  drawBg();
  

   
if(counter<=3){
  modenum = 0;
  facenum = 1;
}

   if(counter%5==0){
    let = c = map(vocal,0,100,-90,90);
    let = d = map(drum,0,100,-90,90);
    let = o = map(other,0,100,185,360);
    let = b = map(bass,0,100,0,175);

   }

   
  
   if(c>0&&d>0){
    c = -1;
   }
  
  
   drawChara(modenum,facenum,0,charaX,charaY, c,0,-d,0, b,0,o,0, 0,0,0,0,0,7);
   drawChara(modenum,facenum,1,charaX+450,charaY, c,0,-d,0, b,0,o,0, 0,0,0,0,0,7);
   strokeWeight(1);
  
   if(counter%300==0&&counter!=0){
    
    print(counter);
      if(modenum==3){
        modenum=0;
      }else{
        modenum = modenum+1;
      }  
      charaX += charanum;
   }

   

   if(counter%300==0&&mode==3){
    print(counter);
      if(facenum==1){
        facenum = -1;
        charanum = charanum*-1;
      }else{
        facenum = 1;
        charanum = charanum*-1;
      }
   }
   print(counter);
   // display "words"
   stroke(colorArray[1]);
  fill(colorArray[0]);
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3);

   drawFg();
}

