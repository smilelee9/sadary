# sadary
Platform helping users meet new people, conveniently and safely.

## 커밋 메세지 양식
ex) 2020-11-09 필터 완성, Sorter 디자인 완료, react-filter 적용
- 날짜 처음에
- 기능: 한국말 (ex. 필터)
- 수정한 파일 중에 중요한 파일: 파일 이름 그대로 (ex. Sorter)
- 새로운 라이브러리 적용 — react-native-modal: 영어 그대로

## 실행
yarn start
localhost::3000 에서 시작됨

## 디렉토리 설명
- api: functions for create, read, update, delete data from firebase realtime DB / authentication
- common: hard-coded data for debugging, redux store
- component: functional components not linked to redux store (mostly does not have state) [주호, 승우는 여기만 작성]
- container: functional components linked to redux store and dispatch actions. Pass callbacks and data as props to children components 
- state: redux actions and reducers
- util: utilities for reusable logics
