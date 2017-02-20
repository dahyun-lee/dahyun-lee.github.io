
  var input = document.querySelector('#input-todo');
  // console.log(todo_input);
  var button = document.querySelector('.add-btn');
  // console.log(btn);
  var todo_list = document.querySelector('.todo-list');


  button.onclick = function() {

    if(input.value === ''){
      window.alert('할일을 입력해주세요');
      return;
    }

    // console.log('ok');
    var item = document.createElement('li');
    item.setAttribute('class','todo-list-item');

    var item_text_node = document.createTextNode(input.value);
    var check_box = document.createElement('input');

    check_box.setAttribute('type','checkbox');
    //x버튼 제작
    var x_btn = document.createElement('button');
    var x_btn_content = document.createTextNode('x');
    x_btn.appendChild(x_btn_content);
    item.appendChild(check_box);
    item.appendChild(item_text_node);
    item.appendChild(x_btn);
    todo_list.appendChild(item);
    input.value='';
    input.focus();


    document.querySelector('.todo-list input').onclick=function(){
      if(this.checked === true){
        this.parentNode.style.cssText = 'text-decoration:line-through; color:rgb(179, 182, 179)';
      }else{
        this.parentNode.style.cssText = '';
      }
    }



    // check_box.onclick = function(){
    //   item.style.cssText='text-decoration:line-through; color:rgb(179, 182, 179) ';
    //   check_box.value = 'checked';
    //
    // };

    x_btn.onclick = function(){
      alert("삭제하시겠습니까?");
       item.parentNode.removeChild(item,check_box,x_btn);
      }

    };
