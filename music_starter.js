let modenum;
let facenum;
let charanum = 50;
let charaX = 300;
let charaY = 150;
let alp = 10;
let boop = false;
let beep = 7;
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  drawBg();
  
 if(counter<=5000){
    beep = 70;
    charaX=300;
    charaY = 200;
  }
   
if(counter<=3){
  modenum = 0;
  facenum = 1;
}

   if(counter%10==0){
    let = c = map(vocal,0,100,-90,90);
    let = d = map(drum,0,100,-90,90);
    let = o = map(other,0,100,185,360);
    let = b = map(bass,0,100,0,175);

   }

   
  
   if(c>0&&d>0){
    c = -1;
   }
  
  
   drawChara(modenum,facenum,0,charaX,charaY, c,0,-d,0, b,0,o,0, 0,0,0,0,0,beep);
   drawChara(modenum,facenum,1,charaX+450,charaY, c,0,-d,0, b,0,o,0, 0,0,0,0,0,beep);
   strokeWeight(1);
   if(counter<3000){

   if(counter%100==0&&counter!=0){
    
    print(counter);
    
      if(modenum==3){
        modenum=0;
      }else{
        modenum = modenum+1;
      }  
      charaX += charanum;
   }


   

   if(counter%100==0&&mode==3){
    print(counter);
      if(facenum==1){
        facenum = -1;
        charanum = charanum*-1;
      }else{
        facenum = 1;
        charanum = charanum*-1;
      }
   }
  }else if(charaX<=300||boop == true){
    boop=true;
    charanum = 60;
    if(counter%100==0&&counter!=0){
    
      print(counter);
      
        if(modenum==0){
          modenum=3;
        }else{
          modenum = modenum-1;
        }  
        charaX += charanum;
     }
  
  
     
  
     if(counter%100==0&&mode==3){
      print(counter);
        if(facenum==1){
          facenum = -1;
          charanum = charanum*-1;
        }else{
          facenum = 1;
          charanum = charanum*-1;
        }
     }


  }
   print(counter);
 

   drawFg();

   alp = 100-((vocal+drum+bass)/3);
   let alpha = map(alp,0,100,5,120);

   noStroke();
   fill(27, 0, 110,alpha);
   rect(0,0,width,height);

     // display "words"
     stroke(colorArray[1]);
     fill(colorArray[0]);
      textAlign(CENTER);
      textSize(vocal/2);
      text(words, width/2, height*2.5/3);
}

