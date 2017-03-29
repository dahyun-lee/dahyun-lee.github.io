(function(global){
  'use strict';

var input = document.querySelector('#input-todo');
// console.log(todo_input);
var button = document.querySelector('.add-btn');
// console.log(btn);
var todo_list = document.querySelector('.todo-list');


//함수 실행
document.onkeypress = keyboardAction;
button.onclick = todoAdd;

//체크박스 체크시 취소선
function checkcheck (){
  if(this.checked === true){
    this.parentNode.style.cssText = 'text-decoration:line-through; color:rgb(179, 182, 179)';
  }else{
    this.parentNode.style.cssText = '';
  }
}

//엔터키로 일정 추가하기
function keyboardAction(evt){
  evt = evt || window.event; // IE 6,7,8 고려 코드
  if(evt.keyCode == 13 || evt.keyCode ==3 ){
    todoAdd();
  }
}


//일정 추가 함수
 function todoAdd () {
  if(input.value === ''){
    window.alert('할일을 입력해주세요');
    return;
  }
  var item = document.createElement('li');
  item.setAttribute('class','todo-list-item');
  var item_text_node = document.createTextNode(input.value);
  var check_box = document.createElement('input');
  check_box.setAttribute('type','checkbox');
  //x버튼 제작
  var x_btn = document.createElement('button');
  var x_btn_content = document.createTextNode('x');

  //체크박스 체크 이벤트
  check_box.onclick = checkcheck;


  x_btn.appendChild(x_btn_content);
  item.appendChild(check_box);
  item.appendChild(item_text_node);
  item.appendChild(x_btn);
  todo_list.appendChild(item);
  input.value='';
  input.focus();

//삭제 함수
  x_btn.onclick=function(){
    alert("삭제하시겠습니까?");
     todo_list.removeChild(item);
  }
};
})(window);
