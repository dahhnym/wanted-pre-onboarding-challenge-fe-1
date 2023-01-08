# 원티드 프리온보딩 프론트엔드 1월 챌린지 사전과제

해당과제에 사용된 API는 원티드 프리온보딩 챌린지에서 제공하는 API를 사용하였습니다. <br>
출처 : https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api

## Dependency

- React 18.2.0
- TypeScript 4.9.4
- React-router-dom
- Axios
- Styled-components

## 실행방법

```
$ git clone https://github.com/dahhnym/wanted-pre-onboarding-challenge-fe-1.git
$ npm install

// 서버실행
$ cd server
$ yarn start

// 클라이언트 실행
$ cd client
$ npm start
```

## 데모

### 배포 URL

http://wanted-pre-onboarding-challenge-fe-1-two.vercel.app

### 테스트 계정

이메일: test3@test.com <br>
비밀번호: qwer1234$

## 요구사항

### Login / SignUp

- [x] input, submit button을 포함한 로그인, 회원가입 폼 구현
- [x] 이메일 유효성 검사 (`@`, `.` 포함)
- [x] 비밀번호 유효성 검사 (영문 대소문자, 숫자, 특수문자(!@#$%^&\*) 포함한 8글자 이상)
- [x] 이메일, 비밀번호 유효성 검사 통과시 제출 버튼 활성화
- [x] 로그인 API 호출 후 응답으로 받은 토큰 로컬스토리지 저장
- [x] 토큰 존재하는 경우 루트 경로로 리다이렉트
- [x] 토큰 존재하지 않는 경우, 사용자에게 알린 후 로그인 페이지로 리다이렉트

### Todo List

- [x] Todo 목록 및 상세 영역 구분하여 구현
- [x] Todo 제목 클릭 시 투두 상세 내용 표시
- [x] Todo 추가, 삭제 구현
- [x] Todo 수정 버튼 클릭시 수정 모달 표시
- [x] Todo 수정모달에서 수정 후 확인 버튼 클릭 시 수정된 Todo 반영한 화면 표시
- [ ] 개별 Todo 조회 순서에 따라 페이지 뒤로가기 통해 조회

## 시연영상

|                                                      회원가입                                                      |                                                     로그인&로그아웃                                                      |
| :----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| ![signup_3](https://user-images.githubusercontent.com/74545780/211207693-b409e66e-69c3-4ffd-bdd6-a85003144ef3.gif) | ![signin_signout](https://user-images.githubusercontent.com/74545780/211207130-9a7f3138-573c-4aef-b1e5-6b52a3aa162f.gif) |

|                                                             투두 CRUD                                                             |
| :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/74545780/211207132-e4429a1a-52b6-4a77-a5b0-f5e311c1399a.gif" width="400px" /> |
