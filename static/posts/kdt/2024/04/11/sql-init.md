---
title: '📝 KDT : 04월 11일자 수업 정리'
summary: '오늘은 오라클 SQL을 설치하고 SQL에 대해 공부했습니다.'
date: 2024-04-11 11:42:00
tags: [ kdt, sql ]
---

- 사용하는 IDE : Eclipse 2024-03 (4.31.0)
- 사용하는 DBMS : Oracle Database Express Edition (XE) Release 11.2.0.2.0 (11gR2).

---

# SQL의 큰 구조

## 테이블(Table)

데이터베이스에서 사용되는 데이터 집합의 단위로 흔히 알고 있는 "표"에 해당합니다.

## 필드(Field)

열에 해당하는 데이터 단위로, 세로줄로 표시됩니다. 외에도 속성(attribute), 혹은 칼럼(column)이라고도 불립니다.

## 레코드(Record)

열에 해당하는 데이터 단위로, 가로줄로 표시됩니다. 외에도 튜플(tuple), 혹은 로우(row)이라고도 불립니다.

데이터베이스에는 SQL(Structured Query Lanuage)가 활용됩니다.
SQL는 관계형 데이터베이스 관리 시스템(RDBMS)를 위해 설계된 특수 목적의 프로그래밍 언어입니다.

---

# SQL 문법

- 주석문 : `--` 또는 `/* */`를 통해 주석을 작성할 수 있습니다.
- 명령어는 대소문자를 구분하지 않습니다. (하지만, 명령어는 대문자로 작성하는 것이 관례입니다.)
- 명령어는 세미콜론(`;`)으로 끝납니다.
- 명령어는 여러 줄에 걸쳐 작성할 수 있습니다.

---

## 제약조건 (Constraint)

SQL에는 필드에 들어갈 수 있는 값과 필드나 테이블 간의 관계를 제한하는 제약조건이 있습니다.

```sql
CREATE TABLE booklist (
    book_num VARCHAR2(5) NOT NULL PRIMARY KEY,
    ...,
);
```

위 처럼 쓰는 경우는 필드 수준의 제약조건이라고 하고,

```sql
CONSTRAINT booklist_pk PRIMARY KEY (book_num)
```

위 처럼 쓰는 경우는 테이블 수준의 제약조건이라고 합니다.

### NOT NULL

필드에 NULL 값을 허용하지 않는 제약조건입니다.
SQL의 NULL은 자바의 NULL과 같은 의미입니다.

---

### 기본키 (Primary Key)

SQL에는 기본키라는 제약조건이 있습니다.
기본키는 데이블을 구성하는 필드 중 갖는 값이 NOT NULL이고,
서로 다른 값(유일한 값)을 갖고 있어 레코드를 식별할 수 있는 필드입니다.
테이블을 구성하는 필드 중 하나를 기본키로 지정할 수 있습니다.
기본키를 지정함으로서 발생할 수 있는 오류를 미연에 방지하고 탐색 속도를 높힐 수 있습니다.
기본키로 결함을 없애고, 그 상태를 유지하는 것을 객체 무결성이라고 합니다.

---

### 외래키 (Foreign Key)

SQL에는 외래키라는 제약조건이 있습니다.
테이블 간의 필수 포함 관계를 구성할 때에 상대 테이블의 특정 필드값을 참조하고,
상대 테이블에 없는 값을 사용할 수 없도록 하는 규칙입니다.
이때 참조의 대상이 될 필드는 기본키(primary key) 또는 유일한 값(unique)이어야 합니다.
외래키로 유지되는 무결성을 참조 무결성이라고 합니다.

예를 들어 `booklist` 테이블에 존재하지 않는 도서의 번호(`book_num`)를
`rentlist` 테이블의 빌려간 도서의 번호로 입력할 수 없도록 하는 것입니다.

:::info 도서대여점의 도서목록과 대여목록의 관계

- 도서목록 테이블의 이름 : booklist
- 대여목록 테이블의 이름 : rentlist

| 필드 이름     | 자료형        | 제약조건     |
|-----------|------------|----------|
| idx       | NUMBER(3)  |          |
| rent_date | DATE       |          |
| bnum      | VARCHAR(5) | NOT NULL |
| mnum      | VARCHAR(5) | NOT NULL |
| discount  | NUMBER(4)  |          |
| ...       | ...        | ...      |

```sql
CREATE TABLE rentlist (
    idx       NUMBER(3),                 -- 대여번호
    rent_date DATE      DEFAULT sysdate, -- 대여일자 (데이터 입력시 현재 날짜로 입력)
    bnum      VARCHAR2(5) NOT NULL,      -- 도서번호
    mnum      VARCHAR2(5) NOT NULL,      -- 회원번호
    discount  NUMBER(4) DEFAULT 500,     -- 할인액  (데이터 미입력시 500으로 입력)
    CONSTRAINT pk PRIMARY KEY (idx),
    CONSTRAINT fk1 FOREIGN KEY (bnum) REFERENCES booklist (book_num),
    -- 현재 테이블의 bnum 필드는 booklist 테이블의 book_num 필드를 참조합니다.
    CONSTRAINT fk2 FOREIGN KEY (mnum) REFERENCES memberlist (member_num)
    -- 현재 테이블의 mnum 필드는 memberlist 테이블의 member_num 필드를 참조합니다.
);
```

:::

### 유일값 (Unique)

UNIQUE는 필드에 중복된 값을 허용하지 않는 제약조건입니다.
기본키와 유일값은 비슷하지만, 기본키는 NULL을 허용하지 않는 반면, 유일값은 NULL을 허용합니다.

### 조건 (Check)

CHECK는 필드에 들어갈 수 있는 값의 범위를 제한하는 제약조건입니다.
제약의 조건에는 TRUE 또는 FALSE를 반환하는 조건식을 사용할 수 있습니다.
이를 이용해 가격이 0 이상이라거나, 성별이 '남자' 또는 '여자'라는 조건 등을 걸 수 있습니다.


---

## 자료형 (Data Type)

### 정수형

- NUMBER(자리수) : 바이트가 아닌 자리수를 입력하는 것에 주의

### 실수형

- NUMBER(자리수, 소수점 이하 자리수) : 바이트가 아닌 자리수를 입력하는 것에 주의

### 가변형 문자 (최대 4000 Byte)

- VARCHAR2(문자수) : 지정한 문자수를 최대 크기로 갖지만, 실제 문자수만큼의 공간만 차지한다

### 고정형 문자 (최대 2000 Byte)

- CHAR(문자수) : 지정한 문자수를 최대 크기로 갖고, 문자수 만큼의 공간을 차지한다

### 가변형 유니코드 문자 (최대 4000 Byte)

- NVARCHAR2(문자수) : VARCHAR2와 같지만, 유니코드 문자를 저장할 수 있다

### 고정형 유니코드 문자 (최대 2000 Byte)

- NCHAR(문자수) : CHAR와 같지만, 유니코드 문자를 저장할 수 있다

### 날짜형

- DATE : 주로 사용되는 날짜와 시간을 저장할 수 있는 자료형 (java.sql.Date와 유사)
- TIMESTAMP : DATE와 유사하지만, 밀리초까지 저장할 수 있는 자료형 (java.sql.Timestamp와 유사)
- SYSDATE : DATE 형식의 현재 날짜와 시간을 반환하는 키워드
- SYSTIMESTAMP : TIMESTAMP 형식의 현재 날짜와 시간을 반환하는 키워드

### LOB (Large Object)

- 대용량 데이터를 저장할 수 있는 타입이지만, 최근에는 별도로 저장하고, 경로만 저장하는 추세이다.
- BLOB : 이진 데이터
- CLOB : 문자 데이터
- NCLOB : 유니코드 문자 데이터

### 더이상 사용되지 않는 자료형

- VARCHAR : VARCHAR2로 대체
- LONG : 최대 2GB의 가변 길이 문자형
- FLOAT : NUMBER로 대체 (2진수 기준 22바이트)
- BINARY_FLOAT : 32비트 부동 소수점
- BINARY_DOUBLE : 64비트 부동 소수점

---

# SQL 명령어의 분류

## 1. DDL 명령어 : 데이터베이스의 구조를 정의하는 명령어

### 1. `CREATE` : 테이블 또는 뷰, 사용자 등을 생성

```sql
CREATE TABLE table_name (
    필드명1 DATATYPE [DEFAULT 기본값, OR 제약조건 등],
    필드명2 DATATYPE [DEFAULT 기본값, OR 제약조건 등],
    ...,
    필드명n DATATYPE [DEFAULT 기본값, OR 제약조건 등]
);
```

:::info CREATE TABLE 의 세부 규칙

1. 테이블의 이름은 객체를 의미할 수 있는 적합한 이름을 사용합니다. (Java의 변수와 유사한 규칙)
2. 다른 테이블과 이름이 중복되지 않게 주의합니다.
3. 한 테이블 내에서도 필드 이름이 중복되지 않게 주의합니다.
4. 각 필드들은 `,`로 구분합니다. 단, 마지막 필드는 `,`를 붙이지 않습니다.
5. CREATE를 비롯한 모든 명령어는 `;`로 끝납니다.
6. 필드 이름 뒤에 DATATYPE은 반드시 지정하고, []안의 내용은 생략 가능합니다.
7. 예약어 명령어 등을 테이블 이름과 필드 이름으로 사용할 수 없습니다.
8. 테이블 생성시 대소문자를 구분하지 않습니다.
9. 보통은 데이터 형식과 용량을 지정하는데, DATE 형식은 별도로 크기를 지정하지 않습니다.
10. 문자데이터의 DATATYPE은 VARCHAR2(10), NUMBER의 DATATYPE은 NUMBER(10) 등으로 지정합니다.
11. 필드의 크기는 반드시 가질 수 있는 최대의 길이로 지정해야합니다.
12. 숫자 데이터 형식의 경우 바이트가 아니라 자리수를 지정한다는 것을 주의합니다.

:::

:::info 도서대여점의 도서목록 테이블의 생성

테이블 이름 : booklist

| 필드 이름    | 자료형    | 제약조건     |
|----------|--------|----------|
| book_num | 문자 5자  | NOT NULL |
| subject  | 문자 30자 | NOT NULL |
| makeyear | 숫자 4자  |          |
| inprice  | 숫자 6자  |          |
| outprice | 숫자 6자  |          |

```sql
CREATE TABLE booklist (
    book_num VARCHAR2(5) NOT NULL,
    subject VARCHAR2(30) NOT NULL,
    makeyear NUMBER(4),
    inprice NUMBER(6),
    outprice NUMBER(6)
);
```

여기서 문자열을 담는 자료형인 `CHAR`은 무조건 고정된 크기를 차지합니다.
이를 대신해서 사용되는 `VARCHAR`은 불필요한 공간을 차지하지 않는다는 장점이 있습니다.
오라클에선 보다 더 좋은 성능을 가진 `VARCHAR2`를 지원합니다.

주의할 점은 `NUMBER(4)`의 4는 4바이트가 아닌 4자리 숫자를 의미합니다.
따라서 `NUMBER(4)`는 -9999부터 9999까지의 숫자를 저장할 수 있습니다.

:::

:::info 회원리스트의 테이블 생성

테이블 이름 : memberlist

| 필드 이름       | 자료형         | 제약조건                                           |
|-------------|-------------|------------------------------------------------|
| member_num  | VARCHAR(5)  | NOT NULL : 필드 레벨로 설정, PRIMARY KEY : 테이블 레벨로 설정 |
| member_name | VARCHAR(12) | NOT NULL : 필드 레벨로 설정                           |
| Phone       | VARCHAR(13) | NOT NULL : 필드 레벨로 설정                           |
| birth       | DATE        |                                                |
| bpoint      | NUMBER(6)   |                                                |

```sql
CREATE TABLE memberlist (
    member_num VARCHAR2(5) NOT NULL,
    member_name VARCHAR2(12) NOT NULL,
    phone VARCHAR2(13) NOT NULL,
    birth DATE,
    bpoint NUMBER(6),
    CONSTRAINT member_pk PRIMARY KEY (member_num)
);
```

:::

### 2. `DROP` : 이미 생성되어 있는 테이블 또는 뷰, 사용자 등을 삭제

```sql
DROP TABLE table_name;
```

:::info 도서대여점의 도서목록 테이블의 삭제

```sql
DROP TABLE booklist;
```

:::

### 3. `ALTER` : 이미 생성되어 있는 테이블 또는 뷰, 사용자 등의 구조를 변경

```sql
ALTER TABLE table_name ADD 필드명 DATATYPE;
ALTER TABLE table_name MODIFY 필드명 DATATYPE;
ALTER TABLE table_name DROP COLUMN 필드명;
```

:::info 도서대여점의 도서목록 테이블의 수정

```sql
ALTER TABLE booklist ADD pub VARCHAR2(20);
ALTER TABLE booklist MODIFY inprice NUMBER(7);
ALTER TABLE booklist DROP COLUMN makeyear;
```

:::

## 2. DML 명령어 : 데이터를 조작하는 명령어

### 1. `SELECT` : 테이블의 데이터를 조회하는 명령어

```sql
SELECT 필드명1, 필드명2, ... FROM 테이블명;
```

:::info 도서대여점의 도서목록 테이블의 조회

```sql
SELECT * FROM booklist;
```

:::

### 2. `INSERT` : 테이블에 데이터를 삽입하는 명령어

### 3. `UPDATE` : 테이블의 데이터를 수정하는 명령어

### 4. `DELETE` : 테이블의 데이터를 삭제하는 명령어

## 3. DCL 명령어 : 데이터베이스에 대한 접근을 제어하는 명령어

### 1. `GRANT` : 특정 사용자에게 특정 권한을 부여

### 2. `REVOKE` : 특정 사용자에게 특정 권한을 박탈

---

# 시퀀스 (Sequence)

시퀀스는 테이블 내의 중복되지 않는 숫자를 자동으로 생성하는 자동 번호 발생기입니다.
테이블 생성 후 시퀀스를 따로 만들어야 합니다.

## 생성 방법

주로 NUMBER 형식의 기본 키값으로 사용됩니다.

```sql
CREATE SEQUENCE 시퀀스명 START WITH 시작값 INCREMENT BY 증가값;
```

```sql
CREATE SEQUENCE book_seq START WITH 1 INCREMENT BY 1;
```

---

## 사용 방법

```sql
INSERT INTO 테이블명 (기본키, ...) VALUES (시퀀스명.NEXTVAL, ...);
```

```sql
INSERT INTO booklist VALUES (book_seq.NEXTVAL, '스프링 부트 3', 2024, 21000, 27000);
```

---

## 시퀀스 삭제

```sql
DROP SEQUENCE 시퀀스명;
```

```sql
DROP SEQUENCE book_seq;
```

---

# 뷰 (View)

뷰는 하나 이상의 테이블로부터 유도된 가상 테이블입니다.
뷰는 데이터를 저장하지 않지만, 테이블과 같이 사용할 수 있습니다.

## 생성 방법

```sql
CREATE VIEW 뷰명 AS SELECT 필드명1, 필드명2, ... FROM 테이블명 WHERE 조건;
```

```sql
CREATE VIEW bookview AS SELECT book_num, subject FROM booklist WHERE makeyear > 2010;
```

---

## 뷰 삭제

```sql
DROP VIEW 뷰명;
```

```sql
DROP VIEW bookview;
```

---


:::info 예제 테이블 만들기

- 테이블 이름 : orders1

| 필드 이름        | 자료형          | 제약조건                                                   |
|--------------|--------------|--------------------------------------------------------|
| order_id     | NUMBER(12,0) | 기본키 (테이블레벨, 제약명 : pk_order)                            |
| order_date   | DATE         | 기본값은 오늘 날짜                      (필드레벨)                 |
| order_mode   | VARCHAR2(8)  | 'direct'와 'online'만 입력 가능 (테이블레벨, 제약명 : ck_order_mode) |
| order_status | NUMBER(2,0)  |                                                        |
| order_total  | NUMBER(8,2)  | 기본값은 0 (필드레벨)                                          |
| sales_rep_id | NUMBER(6,0)  |                                                        |
| promotion_id | NUMBER(6,0)  |                                                        |

```sql
CREATE TABLE orders1 (
    order_id NUMBER(12,0),
    order_date DATE DEFAULT SYSDATE,
    order_mode VARCHAR2(8),
    order_status NUMBER(2,0),
    order_total NUMBER(8,2) DEFAULT 0,
    customer_id NUMBER(6,0),
    sales_rep_id NUMBER(6,0),
    promotion_id NUMBER(6,0),
    CONSTRAINT pk_order PRIMARY KEY (order_id),
    CONSTRAINT ck_order_mode CHECK (order_mode IN ('direct', 'online'))
);
```

- customer_id 필드명을 customer_number 로 변경

```sql
ALTER TABLE orders1 RENAME COLUMN customer_id TO customer_number;
```

- promotion_id 필드의 값은 10000에서 99999 사이의 값만 허용

```sql
ALTER TABLE orders1 ADD CONSTRAINT ck_promotion_id CHECK promotion_id >= 10000 AND promotion_id <= 99999);
-- 혹은 BETWEEN 사용
ALTER TABLE orders1 ADD CONSTRAINT ck_promotion_id CHECK (promotion_id BETWEEN 10000 AND 99999);
```

- orders1 테이블을 orders2로 복사

```sql
CREATE TABLE orders2 AS SELECT * FROM orders1;
```

:::

---


:::info booklist 테이블에 시퀀스 등록하기

```sql
CREATE SEQUENCE book_seq START WITH 1 INCREMENT BY 1;

INSERT INTO booklist VALUES (book_seq.NEXTVAL, '스프링 부트 3 백엔드', 2024, 21000, 27000);
INSERT INTO booklist VALUES (book_seq.NEXTVAL, '코딩 자율학습', 2024, 22000, 29700);
INSERT INTO booklist VALUES (book_seq.NEXTVAL, '객체 지향의 원리', 2024, 15000, 22500);
INSERT INTO booklist VALUES (book_seq.NEXTVAL, '자바 표준 프로그래밍', 2024, 30000, 38700);
```

- 시퀀스 최대 증가값을 14까지로 제한

```sql
ALTER SEQUENCE book_seq MAXVALUE 14;
```

- 시퀀스 삭제

```sql
DROP SEQUENCE book_seq;
```

- 시퀀스 재생성

```sql
CREATE SEQUENCE book_seq START WITH 15 INCREMENT BY 1;
```

- 1부터 1씩 증가하는 member_seq, rent_seq 시퀀스 생성

```sql
CREATE SEQUENCE member_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE rent_seq START WITH 1 INCREMENT BY 1;
```

:::
