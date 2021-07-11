
function readJSONFile(file) {
    fetch(file).then(response => {
        return response.json();
    }).then(data => {
        //console.log(data.items);      ~~~Check if the data is succesfully fetched
        items_array=data.items;
        renderitems(data.items);
    });
}
readJSONFile("seeder/data.json")


const items_layout_html=document.getElementById('items-layout');
let items_array=[];
let first_card = null;
let second_card = null;
let score=0;
const score_html=document.getElementById('score-layout');


function putInScore(){
    score_html.innerHTML+=`<div>Your Score: ${score}/10</div>`;
}



function renderitems(items){
    putInScore();
    items.forEach(item => {
        items_layout_html.innerHTML+=`
        <div class="one-card" data-name="${item.name}">
            <img class="hidden-img" src="${item.hidden_img}" />
            <img class="shown-img" src="imgs/shown_img.jpg" />
        </div>`
    })
    shuffleAndOnClickEvent(document.querySelectorAll(".one-card"))
}


function shuffleAndOnClickEvent(items){
    items.forEach(item=>{
        item.style.order=Math.floor(Math.random()*items_array.length); //Math.random() 取得0 ~ items_array.length 之間的其中一個數字（含0 不含items_array.length）
        item.onclick=function(){
            toFlip(this);
        }
    })
}


function toFlip(item){
    if(first_card===null){
        first_card=item;
        item.classList.add('flip');
    }else if(second_card===null){
        second_card=item;
        item.classList.add('flip');
        setTimeout(function(){
            matchFunc();
        }, 1500);
    }else{
        return;
    }
}

function matchFunc(){
    if(first_card.dataset.name===second_card.dataset.name){
        first_card.onclick = null;
        second_card.onclick = null;
        first_card.classList.add('fixed');
        second_card.classList.add('fixed');
        score+=1;
        putInScore()
    }else{
        first_card.classList.remove("flip");
        second_card.classList.remove("flip");
    }
    first_card=null;
    second_card=null;
}


