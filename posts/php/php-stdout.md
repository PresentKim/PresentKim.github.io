---
title: "PHP에서 문자를 출력하는 방법"
summary: "PHP에서 사용 가능한 여러 문자 출력 방식을 설명하는 글"
date: 2022-11-09 12:43:00
tags: [php]
draft: true
---

PHP에선 콘솔에 문자를 출력할 수 있는 다양한 방법이 있다.  
이 글에선 방법의 예시와 차이점, 그리고 주의점을 설명한다.  
특히 잘 놓칠 수 있는 주의할 점에 대해 자세히 설명하려 한다.   

## 1 PHP 태그 밖에 작성하기
먼저 php는 html을 포함해 작성하기 위해서 `<?php` 태그로 감싸지지 않은 내용을 그대로 출력하는 특징을 갖고 있다.  
```php
Hello,World!<? echo " is old "; ?>message...
```
위처럼 작성하면 `Hello,World! is old message...`가 출력된다.  
따라서 정해진 문자를 출력해야 하는 php문서의 경우 그냥 해당 부분을 PHP태그 밖에 작성하면 된다.  
하지만 HTML을 포함하는 문서에나 사용되는 방식이기 떄문에 거의 출력 자체를 용도로 사용하지는 않는다고 보면 된다.  

### 2 `<?=`태그를 사용하기
`<?=` 태그는 `<?php echo`의 축약형이다.  
```php
<?="Hello,","World!";
```
위처럼 작성하면 `Hello World!`가 출력된다.  
`echo`를 축약한 것이기 때문에 `echo`와 동일하게 여러 인자를 받을 수 있다.  

## 2. 문자 출력 키워드 사용하기  
### 2.1 사용법
PHP의 키워드 중에선 주어진 값을 그대로 출력하는 `echo`와 `print`가 있다.
문자열이나 숫자 등 변환 없이 출력 가능한 값들을 출력할 때 주로 사용한다.  
```php
print "안녕, 세상!";  //출력: "안녕, 세상!"
print("안녕, 세상!"); //출력: "안녕, 세상!"

print 1234;  //출력: "1234"
print(1234); //출력: "1234"

//문법에 문제가 없다면 공백이 없어도 된다
print"안녕, 세상!"; //출력: "안녕, 세상!"

//아래 코드는 문법 오류가 발생한다
print1234; //오류: Undefined constant "print1234"

//추가로 만약 배열이나 실수 등의 값이면 제대로 출력되지 않을 수 있다
$arr = [1234567890.0123456789, 0.0123456789123456789];
print $arr; //출력: "Array"
print $arr[0]; //출력: "1234567890.0123"
print $arr[1]; //출력: "0.012345678912346"
```

### 2.2 주의점
`echo`와 `print`는 모두 함수가 아닌 키워드이다.  
가독성을 위해 소괄호`()`로 감싸 함수처럼 보이게 사용은 가능하지만, 괄호는 필수가 아니다.
이를 구분하지 못하고 함수처럼 사용할 경우, 아래 코드처럼 전혀 예상하지 못한 실행 결과가 발생할 수 있다.  
```php
print(1 + 3) / 4; //출력: "1"
//위 코드는 먼저 `(1 + 3) / 4`를 계산한 뒤, 그 결과를 출력한다

print(5677) + print(1234); //출력: "12345678"
//위 코드는 "1234"를 먼저 출력하고 `(5677) + 1`을 계산한 뒤, 그 결과를 출력한다

print("몰루?") && print("print의 반환값: "); //출력: "print의 반환값: 1"
//위 코드는 "print의 반환값: "를 먼저 출력하고 `("몰루?") && 1`을 계산한 뒤, 그 결과를 출력한다
```

### 2.3 차이점
>1. `echo`는 여러 개의 인자를, `print`는 하나의 인자만 받을 수 있다.
> 
>   ```php
>   echo "안녕,"," 세상!"; //출력: "안녕, 세상!"
>   print "안녕, 세상!";  //오류: Parse error: syntax error, unexpected token ","
>   ```


2. `echo`는 출력값을 반환하지 않지만, `print`는 출력값을 반환한다. (항상 `1`)  
    이로 의해 `print`는 표현식이 들어갈 수 있는 곳에 모두 들어갈 수 있다.  
    ```php
    if(print"안녕,") echo "세상!"; //출력: "안녕,세상!"
    if(echo"안녕,") print "세상!"; //오류: Parse error: syntax error, unexpected token "echo"
    
    true ? print "Do!" : print "Don't"; //출력: "Do!"
    true ?  echo "Do!" :  echo "Don't"; //오류: Parse error: syntax error, unexpected token "echo"
    
    //이를 이용해 아래와 같은 변태짓도 가능은 하다
    print print 1 + print 2 + print 4; //출력: "4321";
    print(print(1+print(2+print(4)))); //출력: "4321";
    ```