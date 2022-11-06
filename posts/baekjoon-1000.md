---
title: "백준 1000 :: A+B"
summary: "백준 단계별로 문제 풀기 - 01단계 02번 문제: A+B"
date: 2022-11-04 13:11:00
tags: [baekjoon, algorithm, cpp, php, javscript]
---

## 문제

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

## 입력

첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

## 출력

첫째 줄에 A+B를 출력한다.

```예제_입력
1 2
```

```예제_출력
3
```

## 알고리즘 분류

- 수학
- 구현
- 사칙연산

---

## 풀이

한줄로 입력된 두 숫자를 구하고 결과를 출력한다

```PHP
<?
fscanf(STDIN,"%d %d", $a, $b);
echo $a + $b;
```

> 아예 `array_sum`을 사용할 수도 있다
> ```PHP
> <? echo array_sum(fscanf(STDIN, "%d%d"));
> ```

```C++
#include <iostream>
using namespace std;

int main(){
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
```

```JavaScript
const fs = require('fs');
const inputData = fs.readFileSync(0, 'utf8').toString().split(' ');
const a = parseInt(inputData[0]), b = parseInt(inputData[1]);
console.log(a + b);
```