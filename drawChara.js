var colorArray = [
    "#f5f2ed", //0 white
    "#a3a09b", //1 white outline
    "#30302f", //2 black
    "#1f1f1b", //3 black outline/shade
    "#7d0707", //4 dress red
    "#610505", //5 dress outline/shade
    "#574d50", //6 hair grey
    "#3b3234", //7 hair grey outline
    "#e0b636", //8 button yellow
    "#470404", //9 shade outline dress
    "#b5932b"  //10 button outline
];

let mode; let face; let chara;
let s = 7;
let headX;
let headY;
let headW = 5*s;
let headH = 6*s;

let angleTL;                //left thigh angle
let angleCL;                //left calve angle
let angleTR;                //right thigh angle
let angleCR;                //right calve angle

let angleUL;                // left upper arm angle
let angleFL;                // left forearm angle
let angleUR;                // right upper arm angle
let angleFR;                // right forearm angle

let angleHead;
let angleTorso;
let angleHips;

let angleStart;
let angleEnd;

let armX1;
let armX2;
let armY;
let armL;
let armW;

function oval(){ //used for testing things lmao
fill(255);
ellipse(20,20,100,100);
}

function drawChara(m,f,c,x,y,a1,a2,a3,a4,a5,a6,a7,a8,aHe,aT,aHi,sideL,sideA,si){
    mode = m; //0-3
    face = f; //either 1 or -1
    chara = c;//0 or 1
    headX = x;
    headY = y;

    size = si;
    angleTL = a1;
    angleCL = a2;
    angleTR = a3;
    angleCR = a4;

    angleUL = a5;
    angleFL = a6;
    angleUR = a7;
    angleFR = a8;

    angleHead = aHe;
    angleTorso = aT;
    angleHips = aHi;

   
    if(mode==0){
        if(face==1){
        underclothes();
        }
        leg(sideL);
        if(sideL==1){
            leg(0);
        }else{
            leg(1);
        }
        
        arm(sideA); //draws upperarms
        if(sideA==1){
            arm(0);
        }else{
            arm(1);
        }

        head(); //calls head which in turn calls rest of body its self in correct order

        //arms and legs are seperate to this to give finer control over what layer they are on

        if(sideA==0){//draws forearms
            arm(2);
            arm(3);
        }else{
            arm(3);
            arm(2);
        } 
        if(face==-1){
            underclothes();
            }

        
    }else if (mode==1||mode==2){
        if(mode==2){
            underclothes();
        }
        if(face==1){
            leg(1);
            arm(1);
            arm(3)
            leg(0);
            if(mode==1){
                underclothes();
            }
            torso();
            overclothes(-1*face);
            arm(0);
            arm(2);
        }else{
            leg(0);
            arm(0);
            arm(2);
            leg(1);
            if(mode==1){
                underclothes();
            }
            torso();
            arm(1);
            arm(3);

        }
        clothes();
        
        head();
        
    }else if (mode==3){
        if(face==1){
            leg(1);
            arm(0);
            arm(2)
            leg(0);
            torso();
            underclothes();
            if(chara==0){
                overclothes();
            }
            arm(1);
            arm(3);
        }else{
            leg(0);
            arm(1);
            arm(3);
            leg(1);
            torso();
            underclothes();
            if(chara==0){
                overclothes();
            }
            arm(0);
            arm(2);

        }
        clothes();
        head();
        
    }

    
}

function head(){ //calls all the functions to create the head in the order needed, as well as torso
    // push();
    // rotate(angleHead);
    if(mode==0){
        if(face==1){
            hair();
            torso();
            horn(1);
            horn(-1);
            skull();
            eyes();
        }else if (face == -1){
            torso();
            horn(1);
            horn(-1);
            hair();
        }
    }else if (mode==1){
        horn(1*face);
        neck();
        if(chara==1){
            overclothes(-1*face);
        }
        skull();
        eyes();
        hair();
        horn(-1*face);
    }else if(mode==2){
        horn(1*face);
        hair();
        neck();
        if(chara==1&&face==-1){
            overclothes(-1);
            overclothes(1);
        }
        skull();
        eyes();
        horn(-1*face);

    }else if(mode==3){
        horn(-1*face);
        skull();
        neck();
        if(chara==1){
          underclothes();
        }
        hair();
        horn(1*face);
    }
   // pop();
}

function torso(){ //draws torso, including clothes and neck
    push();
    rotate(angleTorso);
    if(mode==0){
        if(face==1){           
            chest();
            hips();
            clothes();
            neck();
        }else if (face == -1){
            hips();
            chest();
            clothes();
            neck();  
        }
    }else if(mode==1){
        hips();
        underclothes();
        chest();
        neck();

    }else if(mode==2||mode==3){
        hips();
        chest();
        neck();
    }
   pop();
}

function skull(){ 
    let a = headW/2;        //to make adjusting vertexes that are symetrical easier
    let b = 7*headW/15;
    let c = headY+headH/4;
    let d = headY+5*headH/6;
    strokeWeight(2);
    stroke(colorArray[1]);
    fill(colorArray[0]);
    ellipse(headX,headY,headW,headH);
if(mode==0){
    beginShape();
    vertex(headX-a, headY);
    vertex(headX-b, c);
    vertex(headX,d);
    vertex(headX+b, c);
    vertex(headX+a, headY);
    endShape();
}else if(mode==1){
    beginShape();
    vertex(headX-(a*face), headY);
    vertex(headX-(b*0.9*face), c+b/3);
    vertex(headX+(a*face),d);
    vertex(headX+(a*face), headY);
    endShape();
}else if(mode==2||mode==3){
    beginShape();
    vertex(headX-a, headY);
    vertex(headX-b, c);
    vertex(headX+face*b/2,d);
    vertex(headX+b, c);
    vertex(headX+a, headY);
    endShape();
}
}



function hair(){
    let hairX = headX;
    let hairY = headY+headH/4; 
    let hairW = headW+headW/5;  
    let hairH = headH+headH/5;  
    if(chara==0){
        strokeWeight(2);
        stroke(colorArray[7]);
        fill(colorArray[6]);

        let a = hairW/2;
        let b = hairW/20;
        let c = hairH/1.5;
        const hair0X = [
            a, a+b, a+3*b, a/2, 0.75*hairW,
            hairW, 0.90*hairW, hairW+3*b
        ]
        if(mode==0||mode==2){
            ellipse(hairX,hairY,hairW,hairH);   
            push();
            translate(hairX,0);
            if(mode==2){
                translate(0,hairY);
                rotate(face*10);
                translate(0,-hairY);
            }
            beginShape();                        //vertexes labelled as in hair diagram
            vertex(-hair0X[0]*face,hairY);              //top left (1)

            vertex(-hair0X[1]*face,hairY+c);          //leftmost strand (2)
            vertex(-hair0X[2]*face,hairY+c+c/4);    //3
            vertex(-hair0X[0]*face,hairY+hairH);        // bottom left  (4)
            vertex(-hair0X[0]*face,hairY+0.9*hairH);    //5

            vertex(-hair0X[3]*face,hairY+1.1*hairH);  //next strand (6)
            vertex(0,hairY+0.85*hairH);     //7

            vertex(hair0X[3]*face,hairY+0.9*hairH);  //second to last strand (8)
            vertex(0,hairY+1.1*hairH);      //9
            vertex(hair0X[0]*face,hairY+hairH);        //10
            vertex(hair0X[4]*face,hairY+0.85*hairH);  //11   

            vertex(hair0X[5]*face,hairY+0.90*hairH);  //12
            vertex(hair0X[6]*face,hairY+hairH);    //bottom right (13)
            vertex(hair0X[7]*face,hairY+0.95*hairH);//14
            vertex(hair0X[1]*face,hairY+0.3*hairH);      // 15
            vertex(hair0X[0]*face,hairY);              //top right(16)
            endShape();
            pop();
            
            
        }else if(mode==1||mode==3){
            
                push();
                translate(headX-face*b,0);
                beginShape();
                vertex(-hair0X[1]*face,hairY-0.4*hairH);
                vertex(-hair0X[3]*face,hairY-0.7*hairH);
                vertex(hair0X[3]*face,hairY-0.63*hairH);
                vertex(0,hairY);
                vertex(0,hairY+0.85*hairH);     //7

                vertex(-hair0X[3]*face,hairY+0.9*hairH);  //second to last strand (8)
                vertex(0,hairY+1.1*hairH);      //9
                vertex(-hair0X[0]*face,hairY+hairH);        //10
                vertex(-hair0X[4]*face,hairY+0.85*hairH);  //11   

                vertex(-hair0X[5]*face,hairY+0.90*hairH);  //12
                vertex(-hair0X[6]*face,hairY+hairH);    //bottom right (13)
                vertex(-hair0X[7]*face,hairY+0.95*hairH);//14
                vertex(-hair0X[1]*face,hairY+0.3*hairH);      // 15
                vertex(-hair0X[0]*face,hairY);              //top right(16)
                endShape(CLOSE);
                pop();
            
        }
    }else{
        strokeWeight(2);
        stroke(colorArray[3]);
        fill(colorArray[2]);
        const hair1X = [
            hairW/2, 3*hairW/5, 4*hairW/5, hairW/3,
            hairW/2-hairW/8, 3*hairW/5-hairW/8,
            4*hairW/5-hairW/8, hairW/4, hairW/2.7,
            hairW/7           
        ]

        if(mode==0||mode==2){
            ellipse(hairX,hairY,hairW,hairH);
          
            push();
            translate(hairX,0);
            if(mode==2){
                translate(0,hairY);
                rotate(face*10);
                translate(0,-hairY);
            }
            beginShape();
            curveVertex(-hair1X[0],hairY);              //hair strand 1
            curveVertex(-hair1X[0],hairY);

            curveVertex(-hair1X[1],hairY+0.15*hairH);

            curveVertex(-hair1X[2],hairY+0.1*hairH);
            curveVertex(-hair1X[2],hairY+0.1*hairH);

            curveVertex(-hair1X[1],hairY+0.25*hairH);

            curveVertex(-hair1X[0],hairY+0.2*hairH);
            curveVertex(-hair1X[0],hairY+0.2*hairH);   
            
            curveVertex(-hair1X[0],hairY+0.2*hairH);    //hair strand 2
            curveVertex(-hair1X[0],hairY+0.2*hairH);

            curveVertex(-hair1X[1],hairY+0.5*hairH);

            curveVertex(-hair1X[2],hairY+0.5*hairH);
            curveVertex(-hair1X[2],hairY+0.5*hairH);

            curveVertex(-hair1X[1],hairY+0.65*hairH);

            curveVertex(-hair1X[3],hairY+0.65*hairH);
            curveVertex(-hair1X[3],hairY+0.65*hairH); 

            curveVertex(-hair1X[4],hairY+0.65*hairH);              //hair strand 3
            curveVertex(-hair1X[4],hairY+0.65*hairH);

            curveVertex(-hair1X[5],hairY+0.75*hairH);

            curveVertex(-hair1X[6],hairY+0.7*hairH);
            curveVertex(-hair1X[6],hairY+0.7*hairH);

            curveVertex(-hair1X[5],hairY+0.85*hairH);

            curveVertex(-hair1X[4],hairY+0.8*hairH);
            curveVertex(-hair1X[4],hairY+0.8*hairH);  
            
            curveVertex(-hair1X[4],hairY+0.8*hairH);     //   centre half
            curveVertex(-hair1X[4],hairY+0.8*hairH); 

            curveVertex(-hair1X[7],hairY+0.9*hairH);

            curveVertex(0,hairY+hairH);
            curveVertex(0,hairY+hairH);

            //same thing reflected for otherside of hair

            curveVertex(0,hairY+hairH);
            curveVertex(0,hairY+hairH);

            curveVertex(hair1X[7],hairY+0.9*hairH);

            curveVertex(hair1X[4],hairY+0.8*hairH);     //   centre half right
            curveVertex(hair1X[4],hairY+0.8*hairH);

            curveVertex(hair1X[4],hairY+0.8*hairH);
            curveVertex(hair1X[4],hairY+0.8*hairH);

            curveVertex(hair1X[5],hairY+0.85*hairH);

            curveVertex(hair1X[6],hairY+0.7*hairH);
            curveVertex(hair1X[6],hairY+0.7*hairH);

            curveVertex(hair1X[5],hairY+0.75*hairH);

            curveVertex(hair1X[4],hairY+0.65*hairH);     //hair strand 3 right
            curveVertex(hair1X[4],hairY+0.65*hairH);

            curveVertex(hair1X[3],hairY+0.65*hairH);
            curveVertex(hair1X[3],hairY+0.65*hairH);

            curveVertex(hair1X[1],hairY+0.65*hairH);

            curveVertex(hair1X[2],hairY+0.5*hairH);
            curveVertex(hair1X[2],hairY+0.5*hairH);

            curveVertex(hair1X[1],hairY+0.5*hairH);

            curveVertex(hair1X[0],hairY+0.2*hairH);    //hair strand 2 right
            curveVertex(hair1X[0],hairY+0.2*hairH);

            curveVertex(hair1X[0],hairY+0.2*hairH);
            curveVertex(hair1X[0],hairY+0.2*hairH);

            curveVertex(hair1X[1],hairY+0.25*hairH);

            curveVertex(hair1X[2],hairY+0.1*hairH);
            curveVertex(hair1X[2],hairY+0.1*hairH);

            curveVertex(hair1X[1],hairY+0.15*hairH);

            curveVertex(hair1X[0],hairY);              //hair strand 1 right
            curveVertex(hair1X[0],hairY);

            endShape();

            pop();
        }else if(mode==1||mode==3){

            push();
            translate(hairX,0);

            beginShape();
            vertex(-hair1X[0]*face,hairY);
            vertex(-hair1X[8]*face,hairY-0.5*hairH);
            vertex(0,hairY-0.7*hairH);
            vertex(hair1X[3]*face,hairY-0.57*hairH);
            vertex(-hair1X[9]*face,hairY);
            vertex(0,hairY+hairH+1);
            endShape();

            beginShape();
            curveVertex(-hair1X[0]*face,hairY);              //hair strand 1
            curveVertex(-hair1X[0]*face,hairY);

            curveVertex(-hair1X[1]*face,hairY+0.15*hairH);

            curveVertex(-hair1X[2]*face,hairY+0.1*hairH);
            curveVertex(-hair1X[2]*face,hairY+0.1*hairH);

            curveVertex(-hair1X[1]*face,hairY+0.25*hairH);

            curveVertex(-hair1X[0]*face,hairY+0.2*hairH);
            curveVertex(-hair1X[0]*face,hairY+0.2*hairH);   
            
            curveVertex(-hair1X[0]*face,hairY+0.2*hairH);    //hair strand 2
            curveVertex(-hair1X[0]*face,hairY+0.2*hairH);

            curveVertex(-hair1X[1]*face,hairY+0.5*hairH);

            curveVertex(-hair1X[2]*face,hairY+0.5*hairH);
            curveVertex(-hair1X[2]*face,hairY+0.5*hairH);

            curveVertex(-hair1X[1]*face,hairY+0.65*hairH);

            curveVertex(-hair1X[3]*face,hairY+0.65*hairH);
            curveVertex(-hair1X[3]*face,hairY+0.65*hairH); 

            curveVertex(-hair1X[4]*face,hairY+0.65*hairH);              //hair strand 3
            curveVertex(-hair1X[4]*face,hairY+0.65*hairH);

            curveVertex(-hair1X[5]*face,hairY+0.75*hairH);

            curveVertex(-hair1X[6]*face,hairY+0.7*hairH);
            curveVertex(-hair1X[6]*face,hairY+0.7*hairH);

            curveVertex(-hair1X[5]*face,hairY+0.85*hairH);

            curveVertex(-hair1X[4]*face,hairY+0.8*hairH);
            curveVertex(-hair1X[4]*face,hairY+0.8*hairH);  
            
            curveVertex(-hair1X[4]*face,hairY+0.8*hairH);     //   centre half
            curveVertex(-hair1X[4]*face,hairY+0.8*hairH); 

            curveVertex(-hair1X[7]*face,hairY+0.9*hairH);

            curveVertex(0,hairY+hairH);
            curveVertex(0,hairY+hairH);

            endShape();
            pop();

        }
    


    }
}

function horn(side){ // called twice by head for each side
    strokeWeight(2);
    stroke(colorArray[1]);
    fill(colorArray[0]);
    if(chara==0){
        const horn0X = [
            headW/4, headW/2, 3*headW/4, 3*headW/2, 11*headW/16,
            headW, 3*headW/5
        ]
        if(mode==0){
            push();
            translate(headX,0);
            beginShape();
            vertex(side*horn0X[0],headY-2*headH/5);      //1
            vertex(side*horn0X[1],headY-(4*headH/8));    //2
            vertex(side*horn0X[2],headY-(2*headH/3));    //3
            vertex(side*horn0X[1],headY-headH);          //4
            vertex(side*horn0X[2],headY-(4*headH/3));    //5
            vertex(side*horn0X[3],headY-headH);          //6
            vertex(side*horn0X[2],headY-(1.2*headH));    //7
            vertex(side*horn0X[4],headY-headH);          //8
            vertex(side*horn0X[5],headY-(7*headH/10));   //9
            vertex(side*horn0X[6],headY-(1*headH/4));    //10
            vertex(side*horn0X[0],headY-headH/8);        //11  
            endShape();
            pop();
        }else if(mode==1||mode==2||mode==3){
            push();
            translate(headX,0);
            if(mode==2){
                stroke(colorArray[7]);
                fill(colorArray[6]);
              
                beginShape();
                vertex(-headW/1.6*face,headY+headH/7);
                vertex(-headW/1.6*face,headY);
                vertex(-headW/1.8*face,headY-headH/5);
                vertex(-headW/5*face,headY-headH/2);
                vertex(headW/5*face,headY-headH/2);
                vertex(-headW/2.5*face,headY+headH/2);
                endShape();

                stroke(colorArray[1]);
                fill(colorArray[0]);
            }else if(mode==3){
                stroke(colorArray[7]);
                fill(colorArray[6]);
                let mod = headW/2;
                beginShape();
                vertex((-headW/5)*face,headY-headH/2);
                vertex((headW/5+mod)*face,headY-headH/2);
                vertex((-headW/2.5+mod/2)*face,headY+headH);
                endShape();

                stroke(colorArray[1]);
                fill(colorArray[0]);
            }

            if(side==face&&mode!=3){
                scale(0.7);
                translate(0,headY/3);
            }else if(side!=face&&mode==3){
                scale(0.7);
                translate(0,headY/3);
            }
            beginShape();
            vertex(side*horn0X[0],headY-2*headH/5);      //1
            vertex(side*horn0X[1],headY-(4*headH/8));    //2
            vertex(side*horn0X[2],headY-(2*headH/3));    //3
            vertex(side*horn0X[1],headY-headH);          //4
            vertex(side*horn0X[2],headY-(4*headH/3));    //5
            vertex(side*horn0X[3],headY-headH);          //6
            vertex(side*horn0X[2],headY-(1.2*headH));    //7
            vertex(side*horn0X[4],headY-headH);          //8
            vertex(side*horn0X[5],headY-(7*headH/10));   //9
            vertex(side*horn0X[6],headY-(1*headH/4));    //10
            vertex(side*horn0X[0],headY-headH/8);        //11  
            endShape();
            pop();



        }
    }else{

        const horn1X = [
            headW/2, 3*headW/4, headW/4, headW/5, 11*headW/16,
            headW, 3*headW/5
        ]

        if(mode==0){

            push();
            translate(headX,0);
            beginShape();
            vertex(side*horn1X[0],headY);
            vertex(side*horn1X[1],headY-headH/4);
            vertex(side*horn1X[2],headY-headH/5);
            vertex(side*horn1X[3],headY-headH/3);
            vertex(0,headY-headH*2);
            vertex(-side*horn1X[3],headY-headH/3);
            endShape();
            pop();



        }else if(mode==1||mode==2){
            if(side==-face){
                push();
                translate(headX,0);
            if(mode==2){
                stroke(colorArray[3]);
                fill(colorArray[2]);
              
                beginShape();
                vertex(-headW/1.6*face,headY+headH/7);
                vertex(-headW/1.6*face,headY);
                vertex(-headW/1.8*face,headY-headH/5);
                vertex(-headW/5*face,headY-headH/2);
                vertex(headW/5*face,headY-headH/2);
                vertex(-headW/2.5*face,headY+headH/2);
                endShape();

                stroke(colorArray[1]);
                fill(colorArray[0]);
            }
            if(side==face){
                scale(0.7);
                translate(0,headY/3);
            }

                beginShape();
                vertex(side*horn1X[0],headY);
                vertex(side*horn1X[1],headY-headH/4);
                vertex(side*horn1X[2],headY-headH/5);
                endShape();
                translate(headW/10,0);
                beginShape();
                vertex(side*horn1X[3],headY-headH/3);
                vertex(0,headY-headH*2);
                vertex(-side*horn1X[3],headY-headH/2.5);
                endShape();
                pop();
            }

        }else if(mode==3){
            push();
            translate(headX,0);
            stroke(colorArray[3]);
            fill(colorArray[2]);
            let mod = headW/2;
            beginShape();
            vertex((-headW/5)*face,headY-headH/2);
            vertex((headW/5+mod)*face,headY-headH/2);
            vertex((-headW/2.5+mod/2)*face,headY+headH);
            endShape();

            stroke(colorArray[1]);
            fill(colorArray[0]);
            if(side!=face){
                scale(0.7);
                translate(0,headY/3);
            }

                beginShape();
                vertex(side*horn1X[0],headY);
                vertex(side*horn1X[1],headY-headH/4);
                vertex(side*horn1X[2],headY-headH/5);
                endShape();
                translate(headW/10,0);
                beginShape();
                vertex(side*horn1X[3],headY-headH/3);
                vertex(0,headY-headH*2);
                vertex(-side*horn1X[3],headY-headH/2.5);
                endShape();
             
            pop();
        }


        
    }


}

function eyes(){
    stroke(colorArray[3]);
    fill(colorArray[2]);
    strokeWeight(3);
    noFill();
    
    if(mode==0){
        push();
        translate(headX,0);
        bezier(
            headW/6,headY+headH/9, 
            headW/6, headY+headY/9, 
            headW/4,headY+0.29*headH, 
            2*headW/5,headY+headH/3
        );
        bezier(
            -headW/6,headY+headH/9, 
            -headW/6, headY+headY/9, 
            -headW/4,headY+0.29*headH, 
            -2*headW/5,headY+headH/3
        );
        pop();
    }else if (mode == 1){
        push();
        translate(headX+face*headW/3,0);
        bezier(
            face*-headW/6,headY+headH/9, 
            face*-headW/6, headY+headY/9, 
            face*-headW/4,headY+0.29*headH, 
            face*-2*headW/5,headY+headH/3
        );
        pop();
    }else if(mode==2){
        push();
        translate(headX+headW/3*face,0);
        bezier(
            -headW/6*face,headY+headH/9, 
            -headW/6*face, headY+headY/9, 
            -headW/4*face,headY+0.29*headH, 
            -2*headW/5*face,headY+headH/3
        );
        scale(0.8);
        translate(-0.3*s*face,0.95*headH);
        bezier(
            headW/6*face,headY+headH/9, 
            headW/6*face, headY+headY/9, 
            headW/4*face,headY+0.29*headH, 
            2*headW/5*face,headY+headH/3
        );
      
      
        pop();
    }
    
}



function neck(){
    strokeWeight(2);
    stroke(colorArray[1]);
    fill(colorArray[0]);
    const neck0X = [
        headW/7, headW/5, headW/4, 3*headW/6, 
    ];

    let neckY;
    let mod = 0;
    if(mode==2){
        mod = face*headW/4;
    }
    if(mode==0||mode==2||mode==3){
        if(mode==3){
            neckY= (8.2*headW/4);
            mod = -face*headW/4;
        } else if(face==1){
            if(chara==0){
                neckY = (10*headW/4);
            }else{
                neckY = (12*headW/4);  
            }
        }else if (face == -1){
            neckY = (9*headW/4);
        }
        push();
        translate(headX,0);
        beginShape();
        vertex(-neck0X[0],headY+(3*headW/4));
        vertex(-neck0X[1],headY+(7*headW/4));
        vertex(-neck0X[2],headY+(7*headW/4));
        vertex(-neck0X[3],headY+(8*headW/4));
        vertex(mod,headY+neckY);
        vertex(neck0X[3],headY+(8*headW/4));
        vertex(neck0X[2],headY+(7*headW/4));
        vertex(neck0X[1],headY+(7*headW/4));
        vertex(neck0X[0],headY+(3*headW/4));
        endShape();
        
        pop();
        if(chara==1&&face==1&&mode!=3){
        overclothes(1*face);
        overclothes(-1*face);
        }
    }else if(mode==1){
        let mod = face*headW/10;
        neckY = (8*headW/4);
        neck0X[3] = 3*headW/7
        push();
        translate(headX+mod,0);
        beginShape();
        vertex(-neck0X[0]*face,headY+(3*headW/4));
        vertex(-neck0X[1]*face,headY+(7*headW/4));
        vertex(-neck0X[2]*face,headY+(7*headW/4));
        vertex(-neck0X[3]*face,headY+(8*headW/4));
        vertex(0,headY+neckY);
        vertex(neck0X[3]*face,headY+(8*headW/4));
        vertex(neck0X[2]*face,headY+(7*headW/4));
        vertex(neck0X[1]*face,headY+(7*headW/4));
        vertex(neck0X[0]*face,headY+(3*headW/4));
        endShape();
        
        pop();

       

    }

}

function chest(){
    strokeWeight(2);
    if(chara==0){
        stroke(colorArray[5]);
        fill(colorArray[4]);
    }else if(chara==1){
        stroke(colorArray[3]);
        fill(colorArray[2]);
    }
    const torso0X = [
        3*headW/7, headW/7, headW/5, 3*headW/6, 6*headW/7,2*headW/6,
        headW/2
    ];

    if(mode==0){
        push();
        translate(headX,0);
        beginShape();
        vertex(-torso0X[3],headY+(8*headW/4));
        bezierVertex(-torso0X[4],headY+(10*headW/4), -torso0X[0], 1.75*headY,-torso0X[2],headY+(16*headW/4) );
        vertex(torso0X[2],headY+(16*headW/4));
        bezierVertex( torso0X[0], 1.75*headY,torso0X[4],headY+(10*headW/4), torso0X[3],headY+(8*headW/4) );
        endShape(CLOSE);
        pop();
    }else if(mode==1){
        push();
        translate(headX,0);
        beginShape();
        vertex(-torso0X[5]*face,headY+(8*headW/4));
        bezierVertex(-torso0X[3]*face,headY+(10*headW/4), -torso0X[0]*face, 1.75*headY,-torso0X[2]*face,headY+(16*headW/4) );
        vertex(torso0X[2]*face,headY+(16*headW/4));
        bezierVertex( torso0X[0]*face, 1.75*headY,torso0X[4]*face,headY+(10*headW/4), torso0X[3]*face,headY+(8*headW/4) );
        endShape(CLOSE);
        pop();

    }else if(mode==2||mode==3){
        push();
        translate(headX,0);
        beginShape();
        vertex(-torso0X[6]*face,headY+(8*headW/4));
        bezierVertex(-torso0X[3]*face,headY+(10*headW/4), -torso0X[0]*face, 1.75*headY,-torso0X[2]*face,headY+(16*headW/4) );
        vertex(torso0X[2]*face,headY+(16*headW/4));
        bezierVertex( torso0X[0]*face, 1.75*headY,torso0X[4]*face,headY+(10*headW/4), torso0X[3]*face,headY+(8*headW/4) );
        endShape(CLOSE);
        pop();

    }

}

function hips(){
    strokeWeight(2);
    if(chara==0){
        stroke(colorArray[9]);
        fill(colorArray[5]);
    }else if(chara==1){
        if(mode==0){
            stroke(colorArray[7]);
            fill(colorArray[6]);
        }else if (mode==1||mode==2||mode==3){
            stroke(colorArray[3]);
            fill(colorArray[2]);
        }
    }
    const hip0X = [
        headW/5, headW/1.5, headW/9
    ];

    push();
    translate(headX,0);
    beginShape();
    vertex(-hip0X[0],headY+(16*headW/4));
    bezierVertex(-hip0X[2],headY+(16*headW/4), -hip0X[1],headY+(16*headW/4), -hip0X[1],headY+(24*headW/4));
    vertex(hip0X[1],headY+(24*headW/4));
    bezierVertex(hip0X[1],headY+(16*headW/4), hip0X[2],headY+(16*headW/4), hip0X[0],headY+(16*headW/4));
    endShape(CLOSE);
    pop();
    
}



function leg(side){  //each leg drawn seperately for layering
strokeWeight(2);
stroke(colorArray[1]);
fill(colorArray[0]);

let legW = 10*s/7;  //leg with
let legL = legW*10; //thight length
let legX1 = headX - headW/5 -legW;  //x of left leg
let legX2 = headX + headW/5;        //x of right leg
let legY = headY+(18*headW/4);

if(mode==1){
    legX1 = headX-legW/2;
    legX2 = headX-legW/2;
}else if(mode==2){
    if(face==1){
    legX1 = headX-legW;
    }else{
        legX2 = headX-legW/5;
    }

}

if(side==0){
push();
translate(legX1,legY);
rotate(angleTL);
rect(0,0,legW,legL);
ellipse(legW/2,legL,legW,legW);
if(chara==1){                    //pants drawn with legs if needed to minimise canvas rotations and transformations
   sleeves(legW,legL,1);
}
translate(0,legL);
rotate(angleCL);
triangle(0,0, legW,0, legW/2,headH*4);
if(chara==1){
    sleeves(legW,legL,2);
}
pop();
}

if(side==1){
push();
translate(legX2,legY);
rotate(angleTR);
rect(0,0,legW,legL);
ellipse(legW/2,legL,legW,legW);
if(chara==1){                                           
    stroke(colorArray[7]);
    fill(colorArray[6]);
    rect(0-legW/10,0,legW+legW/10,legL);
    ellipse(legW/2,legL,legW,legW);
    stroke(colorArray[1]);
    fill(colorArray[0]);
}
translate(0,legL);
rotate(angleCR);
triangle(0,0, legW,0, legW/2,headH*4);
if(chara==1){
    stroke(colorArray[7]);
    fill(colorArray[6]);
    rect(0-legW/10,0,legW+legW/10,headH*3);
}
pop();
}

}

function arm(side){ //each arm drawn seperately for layering
    strokeWeight(2);
    stroke(colorArray[1]);
    fill(colorArray[0]);
    
    armW = 10*s/7;  //arm with
    armL = armW*7; //upper arm length
    armX1 = headX - headW/5 -armW;  //x of left arm
    armX2 = headX + headW/5;        //x of right arm
    armY = headY+(8*headW/4);
    
    if(mode==1){
        armX1 = headX-armW/2;
        armX2 = headX-armW/2;
    }

    if(side==0){
        push();
        transformations(0);
        rect(0,0,armW,armL);
        ellipse(armW/2,armL,armW,armW);
        if(chara ==1){
            sleeves(armW,armL,0);
        }
        pop();
    }else if(side==1){
        push();
        transformations(2);
        rect(0,0,armW,armL);
        ellipse(armW/2,armL,armW,armW);
        if(chara ==1){
            sleeves(armW,armL,0);
        }
        pop();
    }else if(side==2){
        push();
        transformations(0);
        transformations(1);
        triangle(0,0, armW,0, armW/2,headH*2.25);
        pop();
    }else if(side==3){
        push();
        transformations(2);
        transformations(3);
        triangle(0,0, armW,0, armW/2,headH*2.25);
        pop();
    }
    
}

function sleeves(w,l,c){        //draws pants/arm sleeves
    if(c==0){
        stroke(colorArray[3]);                  
        fill(colorArray[2]);
        rect(0-w/10,0,w+w/10,l);
        ellipse(w/2,l,w,w);
        stroke(colorArray[1]);
        fill(colorArray[0]);
    }else if(c==1){
        stroke(colorArray[7]);                  
        fill(colorArray[6]);
        rect(0-w/10,0,w+w/10,l);
        ellipse(w/2,l,w,w);
        stroke(colorArray[1]);
        fill(colorArray[0]);
    }else{
        stroke(colorArray[7]);
        fill(colorArray[6]);
        rect(0-w/10,0,w+w/10,headH*3);
    }

}



function overclothes(a){
    push();
    translate(headX,0);
    if(chara==0){
        stroke(colorArray[1]);
        fill(colorArray[0]);
        beginShape();
        vertex(-headW/3.7,headY+(15.9*headW/4)-s);
        vertex(+headW/3.7,headY+(15.9*headW/4)-s);
        vertex(+headW/4.3,headY+(15.9*headW/4));
        vertex(-headW/4.3,headY+(15.9*headW/4));
        endShape(CLOSE);
    }else if(chara==1){
        let mod = 0;
        let mod1 = 0;
        let mod2 = 0;
        if(mode==2){
            mod1=face*headW/5;
            mod2=face*headW/7;
        }
        if(mode==1){
            stroke(colorArray[7]);
            fill(colorArray[6]);
            beginShape();
            vertex(0,headY+(8*headW/4));
            vertex(headW/3.5*face,headY+(13*headW/4));
            bezierVertex( 3*headW/7*face, 1.75*headY,6*headW/7*face,headY+(10*headW/4), 3*headW/6*face,headY+(8*headW/4));
            endShape(CLOSE);
            translate(face*headW/3.2,-headW/5);
            mod =a*-headW/10;
            
        }else if(a==face&&(mode==0||mode==2)){
            stroke(colorArray[7]);
            fill(colorArray[6]);
            rect(-headW/5+mod1,headY+1.8*headH,headW/2.5-mod2,headH/1.2);
        }else if(a!=face&&(mode==2)){
            scale(1.1);
            translate(0,-headW/1.5+(headW/7));
        }

        translate(mod1,-headW/7);
        stroke(colorArray[3]);
        fill(colorArray[2]);
        beginShape();
        vertex(a*headW/5+mod,headY+1.7*headH);
        vertex(0+mod,headY+2.9*headH);
        vertex(a*headW/1.8,headY+2.4*headH);
        vertex(a*headW/5,headY+2.4*headH);
        vertex(a*headW/1.25,headY+1.65*headH);
        endShape(CLOSE);
            
        stroke(colorArray[1]);
        fill(colorArray[0]);
        beginShape();
        vertex(a*headW/7+mod,headY+1.6*headH);
        vertex(a*headW/14+mod,headY+2.1*headH);
        vertex(a*headW/2,headY+1.7*headH);
        vertex(a*headW/2,headY+1.4*headH);
        endShape(CLOSE);
            
        if(face == 1){
            stroke(colorArray[10]);
            fill(colorArray[8]);
            ellipse(-headW/10,headY+3.2*headH+a*(s+mod1/2),s/1.5,s/1.5);
            
        }
    }
    pop();
}

function clothes(){ 
    strokeWeight(2);
    if(chara==0){
        stroke(colorArray[5]);
        fill(colorArray[4]);
        
        let mod =0;
        //top sleevely part of dress
        let As = angleUR+90;
        let Ae = angleUL+90;
        if(angleUR>=315||angleUR<=90){
            As = 35;
        }
        if(angleUL<=45){
            Ae = 145;
        }
        if(mode==1){
            mod=face*headW/20;
        }
        arc(headX+mod,headY+(6*headW/4),20*s,2.5*headH,As,Ae,PIE); 
           

        if((face==1&&mode==0)||mode==2){
            //front of skirt
            push();

            if(mode==2){
                if(face==1){
                    translate(headW/5,0);
                }else{
                    translate(-headW/5,0);
                }
                beginShape();
                vertex(headX-headW/5*face,headY+(15.9*headW/4));
                vertex(headX-2.1*headW/5*face,headY+(15.9*headW/4));
                vertex(headX-6*headW/5*face,headY+(20*headW/4));
                endShape();
                if(face==-1){
                    translate(headW/5,0);
                }
            }
            arc(headX-headW/5,headY+(15.9*headW/4),5*headH,5*headH,100,angleEnd+91,PIE); //front of skirt left

            if(mode==2){
                if(face==1){
                    translate(-headW/5,0);
                }else{
                    translate(-headW/5,0);
                }
            }
            arc(headX+headW/5,headY+(15.9*headW/4),5*headH,5*headH,angleStart+89,80,PIE); //front of skirt right

            pop();
          
            overclothes();
            
        }

           
            
        
    }else{
        stroke(colorArray[3]);
        fill(colorArray[2]);
        if (mode == 0||mode==2){
            if(face==1||mode==2){
                push();
                figureAngles();
                // if(mode==2){
                //     translate(-headW/7,0);
                // }
                arc(headX-headW/5,headY+(15.9*headW/4),3*headH,3.5*headH,100,angleEnd+91,PIE); //front of coatbottom left
                arc(headX+headW/5,headY+(15.9*headW/4),3*headH,3.5*headH,angleStart+89,80,PIE); //front of coatbottom right
                beginShape();
                let mod=0;
                let mod1=0;
                if(mode==2){
                    translate(face*headW/7,0);
                    if(face==1){
                        mod=headW/7;
                    }else{
                        mod1=headW/7;
                    }
                    
                   

                }
                
                vertex(headX+headW/4-mod,headY+(16*headW/4));
                vertex(headX+headW/2-mod,headY+(24*headW/4));
                vertex(headX-headW/2+mod1,headY+(24*headW/4));
                vertex(headX-headW/4+mod1,headY+(16*headW/4));
                endShape();
                pop();
            }
        }


    }

}

function underclothes(){        //back layer of character, back of skirts/ tails of coat 
    strokeWeight(2);            //seperate to clothes for easier layering
    if(chara==0){
        if((face==1&&mode==0)||mode==2||mode==3){
        stroke(colorArray[9]);
        fill(colorArray[5]);
        }else{
            stroke(colorArray[5]);
            fill(colorArray[4]);   
        }
        
        if (mode==0||mode==2||mode==3){
           figureAngles();
           push();
            if(mode==2){
                translate(headW/10*face,0);
            }
            arc(headX,headY+(15*headW/4),5*headH,5*headH,angleStart+90,angleEnd+90,PIE); //back of skirt
            if(face==-1){
                overclothes();
            }
            pop();
        }else if(mode==1){
            figureAngles();
            arc(headX,headY+(15*headW/4),5*headH,5*headH,angleStart+95,angleEnd+85,PIE); //back of skirt
            
        }
    }else{
        stroke(colorArray[3]);
        fill(colorArray[2]);

        const tails0X = [
            1.3*headW/5, 1.3*headW, 1.8*headW, headW, headW/4, 0.6*headW
        ];

        if(mode==0||mode==2||mode==3){
        if(mode==2){
            translate(-headW*face/7,0);
        }
        push();
        translate(headX,0);
        beginShape();
        
        curveVertex(-tails0X[0],headY+(16*headW/4));
        curveVertex(-tails0X[0],headY+(16*headW/4));

        curveVertex(-tails0X[1],headY+(24*headW/4));
        curveVertex(-tails0X[2],headY+(32*headW/4));

        curveVertex(-tails0X[3],headY+(40*headW/4));
        curveVertex(-tails0X[3],headY+(40*headW/4));

        curveVertex(-tails0X[3],headY+(34*headW/4));
        curveVertex(-tails0X[4],headY+(26*headW/4));

        curveVertex(0,headY+(24*headW/4));
        curveVertex(0,headY+(24*headW/4));

        curveVertex(tails0X[4],headY+(26*headW/4));
        curveVertex(tails0X[3],headY+(34*headW/4));

        curveVertex(tails0X[3],headY+(40*headW/4));
        curveVertex(tails0X[3],headY+(40*headW/4));

        curveVertex(tails0X[2],headY+(32*headW/4));
        curveVertex(tails0X[1],headY+(24*headW/4));
    
        curveVertex(tails0X[0],headY+(16*headW/4));
        curveVertex(tails0X[0],headY+(16*headW/4));

        endShape();
        
        let mod=0;
        if(mode==2){
            translate(headW/7*face,-headW/10);
        }else if(mode==3){
            mod=headW/5;
        }
        
        stroke(colorArray[3]);
        fill(colorArray[2]);
        beginShape();
        vertex(-headW/1.8,headY+1.6*headH);
        vertex(-headW/1.8,headY+1.9*headH);
        vertex(headW/1.8+mod,headY+1.9*headH);
        vertex(headW/1.8+mod,headY+1.6*headH);
        endShape(CLOSE);

        stroke(colorArray[1]);
        fill(colorArray[0]);
        beginShape();
        vertex(-headW/2,headY+1.4*headH);
        vertex(-headW/2,headY+1.7*headH);
        vertex(headW/2+mod,headY+1.7*headH);
        vertex(headW/2+mod,headY+1.4*headH);
        endShape(CLOSE);

        pop();
        
        }else if (mode==1){
            push();
            translate(headX,0);
            beginShape();
            
            curveVertex(-tails0X[0]*face,headY+(16*headW/4));
            curveVertex(-tails0X[0]*face,headY+(16*headW/4));

            curveVertex(-tails0X[1]*face,headY+(24*headW/4));
            curveVertex(-tails0X[2]*face,headY+(32*headW/4));

            curveVertex(-tails0X[3]*face,headY+(40*headW/4));
            curveVertex(-tails0X[3]*face,headY+(40*headW/4));

            curveVertex(-tails0X[3]*face,headY+(34*headW/4));
            curveVertex(-tails0X[4]*face,headY+(26*headW/4));

            curveVertex(tails0X[5]*face,headY+(24*headW/4));
            curveVertex(tails0X[5]*face,headY+(24*headW/4));

            endShape();
            

            stroke(colorArray[3]);
            fill(colorArray[2]);
            beginShape();
            vertex(-headW/4*face,headY+1.6*headH);
            vertex(-headW/4*face,headY+1.9*headH);
            vertex(headW/1.8*face,headY+1.9*headH);
            vertex(headW/1.8*face,headY+1.6*headH);
            endShape(CLOSE);

            rect(0,headY,2*s,5*s);

            stroke(colorArray[1]);
            fill(colorArray[0]);
            beginShape();
            vertex(-headW/5*face,headY+1.4*headH);
            vertex(-headW/5*face,headY+1.7*headH);
            vertex(headW/2*face,headY+1.7*headH);
            vertex(headW/2*face,headY+1.4*headH);
            endShape(CLOSE);

            

            pop();
        }



    }

}



function figureAngles(){
    angleStart = angleTL;         //skirt reacts to angles of legs
    angleEnd = angleTR;
       
    if(angleTL<=45 && angleTR<=45){
        angleStart = 45;
    }else if(angleTR>angleTL){
        angleStart = angleTR;
    }

    if(angleTL>=-45 && angleTR>=-45){
        angleEnd = -45;
    } else if(angleTL<angleTR){
        angleEnd = angleTL;
    }

    if(angleTL>=0 && angleTR>=0){
        let hold = angleStart;
        angleStart = angleEnd;
        angleEnd = hold;
    }else if(angleTL<=0 && angleTR<=0){
        let hold = angleStart;
        angleStart = angleEnd;
        angleEnd = hold;
    }else if (angleTL<0 && angleTR>0){
        let hold = angleStart;
        angleStart = angleEnd;
        angleEnd = hold;
    }

}

function transformations(num){
    if(num==0){
        translate(armX1,armY);
        rotate(angleUL);
    }else if(num==1){
        translate(0,armL);
        rotate(angleFL);
    }else if(num==2){
        translate(armX2+armW,armY+armW);
        rotate(angleUR);
    }else if(num==3){
        translate(0,armL);
        rotate(angleFR);
    }

}