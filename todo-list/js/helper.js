
/**
 * javascript 데이터 유형을 정확히 체크해주는 헬퍼 함수
 * @param  {everyThing}  data [description]
 * @return {Boolean}      [description]
 */
function checkType(data){
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}
/**
 * [isNumber description]
 * @param  {[number]}  data [description]
 * @return {Boolean}      [description]
 */
function isNumber(data){
  return checkType(data)==='number';
}
function isString(data){
  return checkType(data)==='string';
}
function isBoolean(data){
  return checkType(data)==='boolean';
}
function isFunction(data){
  return checkType(data)==='function';
}
function isArray(data){
  return checkType(data)==='array';
}
function isObject(data){
  return checkType(data)==='object';
}
function isElementNode(node){
  return node && node.nodeType === 1;
}


/*! helper.js © yamoo9.net, 2017 */
function createElement(el_name){
  return document.createElement(el_name);
}
function createText(content){
  return document.createTextNode(content);
}
/**
 * 요소노드를 생성(콘텐츠[HTML 유형가능] 포함)하거나,
 * 특정 부모노드에 자식노드로 삽입하는 헬퍼 함수
 * @param  {string} el_name  생성할 노드 이름
 * @param  {string} html_str 생성된 노드 내부에 삽입될 HTML 코드
 * @param  {HTMLElement} target  생성된 노드의 부모 요소노드
 * @param  {string} method   삽입될 위치[append,prepend,before,after]
 * @return {HTMLElement}          생성된 요소노드 반환
 */
function makeEl(el_name,html_str,target,method){
  // 초기 값 설정
  // context = context || null;
  // method = method || 'append';
  // 전달인자로 요소 노드와 텍스트 노드 생성
  var el = createElement(el_name);
  // if문
  // if(!html_str || !isString(html_str)){
  //   el.innerHTML = '';
  // } else {
  //   el.innerHTML = html_str;
  // }
  //3항식
  //변수 = 조건? 참인경우 값 : 거짓인 경우 값
  el.innerHTML = (!html_str || !isString(html_str)) ? '' : html_str;
  //만약 Target 존재한다면?
  if(target && isElementNode(target) && target.parentNode){
    // switch ~ case 구문 사용
    switch(method){
      default:
      case 'append':
      target.insertAdjacentElement('beforeend',el);
      break;
      case 'prepend':
      target.insertAdjacentElement('afterbegin',el);
      break;
      case 'before':
      target.insertAdjacentElement('beforebegin',el);
      break;
      case 'after':
      target.insertAdjacentElement('afterend',el);
      break;
    }

  //------------------------------------------
  // if(context){
  //   if(method=== 'append'){
  //   context.insertAdjacentElement('beforeend',el);
  // }else{
  //   context.insertAdjacentElement('afterbegin',el);
  // }
}
  return el;
}
 //생성된 요소노드 반환





/**
 *  querySelector 헬퍼 함수
 *  @param    {String}      selector_str
 *  @return   {HTMLElement} 문서 요소노드 반환
 */
function query(selector_str, context) {
  return (context || document).querySelector(selector_str);
 }
/**
 *  querySelectorAll 헬퍼 함수
 *  @param    {String}   selector_str
 *  @return   {Nodelist} 문서 요소노드 집합 반환
 */
function queryAll(selector_str,context) {
  return (context || document).querySelectorAll(selector_str);
}

// 부모노드 내부에 마지막 자식노드로 요소를추가하는 헬퍼 함수

// function append(parent_node, child_node){
// parent_node.appendChild(child_node);
// return child_node;
// }
function append(parent, child){
  //조건 검증
  //전달된 인자의 유형이 무엇인가?
  //전달된 인자가 요소노드라면?
if(parent.nodeType !== 1 ){
  parent= query(parent);
}
//아니면, 인자가 선택자 텍스트 유형이라면?
if(child.nodeType !==1){
  child = query(child);
}
return parent.insertAdjacentElement('beforeend',child);
}


// function prepend(parent_node, child_node){
//  var first = parent_node.children[0];
//  first.parentNode.insertBefore(child_node, first);
//  return child_node;
// }
function prepend(parent, child){
if(parent.nodeType !== 1 ){
  parent= query(parent);
}
//아니면, 인자가 선택자 텍스트 유형이라면?
if(child.nodeType !==1){
  child = query(child);
}
parent.insertAdjacentElement('afterbegin',child);
}

//insertNode를 targetNode 앞에 삽입하는 헬퍼함수(형제로서 삽입)
//@param {HTMLElemet} insert_node 삽입요소 노드
//@param {HTMLElemet} target_node 삽입요소 노드
//@return {HTMLElemet} 삽입요소 노드를 반환
function before(insert_node, target_node){
target_node.parentNode.insertBefore(insert_node, target_node);
return insert_node;
}

function after(target_node, insert_node){
  var next = target_node.nextElementSibling;
//조건1, target_node 뒤에 형제 노드가 있다면?
if( next === null ){
  append(target_node.parentNode, insert_node);
}else{
  before(insert_node,next);
}
//조건2, target_node 뒤에 형제 노드가 없다면?
return insert_node;
}

function remove(target_node){
  target_node.parentNode.removeChild(target_node);
}

// 새로운 노드로 이전 노드를 대체하는 헬퍼 함수
// replace_Child 대체할 노드
// replaced_Child 대체된 노드

function replace(replace_Child, replaced_child){
  replaced_child.parentNode.replaceChild(replace_Child, replaced_child);
  return replaced_child;
}


/**
 * 노드 A와 노드 B의 위치를 교체하는 헬퍼 함수
 * @param  {HTMLElement} replace_Child  [description]
 * @param  {HTMLElement} replaced_Child [description]
 * @return {[type]}                [description]
 */
function change (replace_Child, replaced_Child) {
  var sibling = replace_Child.nextElementSibling;
  var parent = replace_Child.parentNode;
  replace(replace_Child, replaced_Child);
  if(sibling !== null){
    //형제
    //before(삽입,목표)
    before(replaced_Child, sibling);
  }else{

    //부모
    //append(부모,자식)
    append(parent, replaced_Child);
  }
}
// function clone(parent_node,target_copy) {
// // var target = query('target');
// var target_copy = target.cloneNode(true);
// append(parent_node,target_copy);
// }
/**
 * 요소노드에 전달된 class 속성 이름 값이 일치하는 것이 있는지 유무 파악 헬퍼 함수
 * @param  {[HTMLElement]}  el_node  -class속상 값을 포함하는지 확인하고자 하는 요소노드
 * @param  {[String]}  class_name    -일치 유무를 파악하고자 하는 문자형 데이터
 * @return {Boolean}                  일치 유무 파악 후 결과 반환
 */
function hasClass(el_node, class_name){
  // el_node 의 class  속성 값에 전달된 class_name이 존재한다면? true 반환
  // el_node 요소노드에서 class 속성 값을 가져온다.
  var old_classes = el_node.getAttribute('class') || '';
  // if(typeof old_classes !== 'string'){
  //   old_classes = '';
  // }
  // 가져온 속성 값을 .split()로 쪼개서 집합(배열)을 만든다.
  old_classes = old_classes.split(' ');
  // 반복문을 사용해서 class_name 값과 일치하는 원소(아이템)가 있는지 확인한다.
  for (var i=0; i<old_classes.length; i++){
    var class_item = old_classes[i];
    if(class_item === class_name){
      return true;
    }
  }
  return false;
}
  // 만약 일치하는 원소가 있다면 true를 반환, 아니라면 false를 반환
//   var _class = el_node.className
//   var class_value= _class.split(' ');
//   for(var i=0; i< class_value.length; i++){
//     console.log(class_value[i]);
//     if(class_value[i] === class_name){
//     return true;
//   }else{
//     return false;
//   }
// }
// }
/**
 * 요소노드에 class 속성을 추가하는 헬퍼 함수
 * @param {[HTMLELement]} el_node    class속성을 추가할 HTML 요소노드
 * @param {[string]} class_name 적용할 class 속성 값 이름
 */

/**
 * 요소노드에 class 속성을 추가하는 헬퍼 함수
 * @param {[HTMLELement]} el_node    -class 속성을 추가할 HTML 요소노드
 * @param {[String]} class_name - 적용할 class 속성 값 이름
 */
function addClass(el_node,class_name){
  //전달인자 검증(Arguments Validation)
  if( el_node.nodeType !== 1){
    //문제가 발생하면
    throw new Error('첫번째 전달인자의 유형은 요소노드 여야 합니다. ');
  }
  if( typeof class_name !== 'string'){
    throw new Error('두번째 전달인자의 유형은 문자형이어야 합니다.');
  }

  // el_node.className += ' ' + class_name;

  if(!hasClass(el_node,class_name)){
    // el_node.setAttribute('class', class_name);
    // HTML DOM 방식
    // el_node.className += ' ' + class_name;
    // Core DOM 방식
    var old_class = el_node.getAttribute('class')|| '';
    el_node.setAttribute('class', old_class + ' ' + class_name);
  }
}
/**
 * 요소노드에 class 속성을 삭제하는 헬퍼 함수
 * @param {[HTMLELement]} el_node    -class 속성을 삭제할 HTML 요소노드
 * @param {[type]} class_name - 적용할 class 속성 값 이름
 */
function removeClass(el_node, class_name){
  //[옵션] class_name 값을 사용자가 전달하지 않았을 경우
  if (!class_name){
    //el.node.removeAttribute('class');
    el_node.setAttribute('class','');
  }
  //해당 클래스 속성 이름이 존재하면 제거
  if ( hasClass(el_node, class_name)) {
    var old_classes = el_node.getAttribute('class').split(' ');
    for (var i=0; i<old_classes.length; i++){
      var class_item = old_classes[i];
      if (class_item === class_name){
        old_classes.splice(i,1);
      }
    }
    el_node.setAttribute('class', old_classes.join(' '));
  }
}

/**
 * 부모노드를 찾아 반환하는 헬퍼 함수(옵션 : 몇번째 부모 설정)
 * @param  {[node]} node        -노드
 * @param  {[number]} above_depth - 몇단계 위인지 설정
 * @return {[node]}             - 부모노드 반환
 */
function parent(node, above_depth){
  // 사용자가 전달하지 않아도 기본값을 1로 설정
  above_depth = above_depth || 1 ;
 while(above_depth--){
   //node의 부모노드를 찾는다.
   node = node.parentNode;
  }
  return node;
 }

//첫번째 자식 요소노드를 반환하는 헬퍼 함수
function first(node){
  // if( !isElementNode(node)) {
  // console.error(''); return; } //console창에 에러메세지만 보여줌
  if( !isElementNode(node)) {
    throw new Error('사용된 함수는 요소노드를 전달해야 합니다.');
  } //에러가 나면서 코드가 멈춤
  //인자가 요구하는 조건을 통과하면
  return node.children[0];
}

// 마지막 자식 요소노드를 반환하는 헬퍼 함수
function last(node){
  if( !isElementNode(node)) {
    throw new Error('사용된 함수는 요소노드를 전달해야 합니다.');
  } //에러가 나면서 코드가 멈춤
  var childs = node.children;
  return childs[childs.length -1];
}

// 다음 형제 요소노드를 반환하는 헬퍼 함수
function next(el_node){
  // if ('nextElementSibling' in  Element.prototype){
  //   return el_node.nextElementSibling;
  // } else { }
  if( !isElementNode(el_node)) {
    throw new Error('사용된 함수는 요소노드를 전달해야 합니다.');
  }
  // el_node의 다음에 인접한 형제 노드는 요소노드인가?(반복)
  do{
  el_node = el_node.nextSibling
} while(!isElementNode(el_node))
  return el_node;
 } // 반복하다가 요소노드가 나오면 반복을 중지하고, 요소노드를 반환


// 이전 형제 요소노드를 반환하는 헬퍼 함수
function prev(el_node){
  if( !isElementNode(el_node)) {
    throw new Error('사용된 함수는 요소노드를 전달해야 합니다.');
  } //에러가 나면서 코드가 멈춤
  do{
  el_node = el_node.previousSibling
} while(!isElementNode(el_node))
  return el_node;
}
