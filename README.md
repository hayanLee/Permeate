## 🏆 향수 판매 e-커머스
![PERMEATE](https://github.com/user-attachments/assets/43fb274d-3228-4643-bd90-6b227ef9897a)

`서비스 링크` : https://www.permeate.store

## ⚡ 프로젝트 소개
2024-07-16~2024-08-21 (36day)
- ‘향기’ 와 관련한 제품을 파는 곳은 많지만, 판매 사이트들이 분산되어 있어 구매자의 입장에서는 검증된 사이트를 찾기 쉽지 않습니다.
- 이에 특정 브랜드에 얽매이지 않고, 다양한 브랜드를 모아 하나의 웹사이트에서 편리하게 구매할 수 있는 e-커머스 사이트입니다.

<br>

## 🎲 팀원 소개

<table>
  <tbody>
    <tr>
      <th align="center"><b>리더: 윤문열</b></th>
      <th align="center"><b>팀원: 박원빈</b></th>
      <th align="center"><b>팀원: 이수진</b></th>
      <th align="center"><b>팀원: 이하얀</b></th>
    </tr>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/50113066?v=4" width="100px;" alt="윤문열"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/119783002?v=4" width="100px;" alt="박원빈"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/59927808?v=4" width="100px;" alt="이수진"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/164024424?v=4" width="100px;" alt="이하얀"/></td>
     <tr/>
      <td align="center"><a href="https://github.com/munyeol-Yoon">@munyeol-Yoon</a></td>
      <td align="center"><a href="https://github.com/harry21-kr">@harry21-kr</a></td>
      <td align="center"><a href="https://github.com/leeejin">@leeejin</a></td>
      <td align="center"><a href="https://github.com/hayanLee">@hayanLee</a></td>
    </tr>
    <tr>
      <td align="center">- 카테고리 페이지<br>- 검색 페이지<br>- 상품 목록 페이지</td>
      <td align="center">- 장바구니 페이지<br>- 주문 페이지</td>
      <td align="center">- 메인 페이지<br>- 상품 디테일 페이지<br>- 리뷰 페이지</td>
      <td align="center">- 로그인(로컬, 소셜), 로그아웃, 회원가입<br>- 마이페이지<br>- UI</td>
    </tr>
  </tbody>
</table>

<br>

## 🌐 개발 환경 및 서비스 아키텍처
![스크린샷 2025-01-07 오후 5 25 50](https://github.com/user-attachments/assets/97b3c724-f77f-42f6-8f8d-838b6db3d334)
- **Front** : Next.js, TypeScript
- **Styling** : TailwindCSS, Shadcn
- **DB** : Supabase
- **Collaboration Tools** : Github, Slack, Notion, Figma
- **Deploy** : Vercel

<br>

## 💡 페이지별 기능
<table border="1" cellspacing="0" cellpadding="10">
  <thead>
    <tr>
      <th colspan="2">페이지</th>
      <th>기능</th>
      <th>스크린샷</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">메인페이지</td>
      <td>페이지 이동 nav</td>
      <td>카테고리, 장바구니, 마이페이지, 헤더 탭, 메인 캐러셀 아래 배너</td>
      <td rowspan="4"><img src="https://github.com/user-attachments/assets/a2c9af08-2fd4-4675-8407-67aed607d393" width="300" height="400"/></td>
    </tr>
    <tr>
      <td>캐러셀</td>
      <td>메인 화면, 추천 상품</td>
    </tr>
    <tr>
      <td>제품 불러오기</td>
      <td>주문량 / 최신 제품 / 좋아요 순</td>
    </tr>
    <tr>
      <td>특정 상품 브랜드 불러오기</td>
      <td>캔들, 디퓨저, 딥디크(브랜드)</td>
    </tr>
    <tr>
      <td rowspan="5">상품상세페이지</td>
      <td>장바구니 추가</td>
      <td>상품을 장바구니에 추가</td>
      <td rowspan="5"><img src="https://github.com/user-attachments/assets/9b9a9633-4425-49bd-97dc-6ef1758c2e69" width="300" height="400"/></td>
    </tr>
    <tr>
      <td>해당 카테고리로 바로가기</td>
      <td>상품의 카테고리로 이동</td>
    </tr>
    <tr>
      <td>바로 구매하기</td>
      <td>즉시 구매 기능</td>
    </tr>
    <tr>
      <td>카카오톡 공유하기</td>
      <td>상품을 카카오톡으로 공유</td>
    </tr>
    <tr>
      <td>좋아요 기능</td>
      <td>옵티미스틱(낙관적) 좋아요 기능</td>
    </tr>
    <tr>
      <td rowspan="5">리뷰페이지</td>
      <td>전체 후기 사진 7개만 불러오기</td>
      <td>최초로 7개 사진만 불러오기</td>
      <td rowspan="5"><img src="https://github.com/user-attachments/assets/345b2373-4066-423c-835a-34c9625a553f" width="300" height="400"/></td>
    </tr>
    <tr>
      <td>상품별 리뷰 불러오기</td>
      <td>각 상품에 대한 리뷰 목록</td>
    </tr>
    <tr>
      <td>리뷰별 필터링</td>
      <td>최신순 / 오랜된 순 / 별점 높은순 필터링</td>
    </tr>
    <tr>
      <td>페이지네이션</td>
      <td>페칭(Pre-fetching) 기법 사용</td>
    </tr>
    <tr>
      <td>이미지 전체 보기 클릭 시</td>
      <td>리뷰 이미지 전체 보기 기능</td>
    </tr>
    <tr>
      <td rowspan="6">상품 주문/결제페이지</td>
      <td>비로그인 시 로컬 스토리지만 사용</td>
      <td>비로그인 시 로컬 스토리지로 장바구니 저장</td>
      <td rowspan="6"><img src="https://github.com/user-attachments/assets/5693e5f9-44d5-4593-b02e-ed0322cc0ac2" width="300" height="400"/></td>
    </tr>
    <tr>
      <td>로그인 시 로컬 스토리지 + DB 사용</td>
      <td>로그인 후 장바구니 정보 DB 저장</td>
    </tr>
    <tr>
      <td>상세 페이지에서 상품 추가 기능</td>
      <td>상세 페이지에서 바로 장바구니에 상품 추가</td>
    </tr>
    <tr>
      <td>구매할 상품의 상태 변경 가능</td>
      <td>상품 삭제, 옵션 변경, 구매 여부 변경</td>
    </tr>
    <tr>
      <td>배송지 변경 가능</td>
      <td>마이페이지에서 배송지 변경</td>
    </tr>
    <tr>
      <td>결제 수단 선택 가능</td>
      <td>카카오페이, 토스페이 등 결제 수단 제공</td>
    </tr>
    <tr>
      <td rowspan="1">상품 결과 필터링페이지</td>
      <td>상품 결과 필터링</td>
      <td>가격별 필터링 제공</td>
      <td><img src="https://github.com/user-attachments/assets/cf3275e6-e2b8-4f65-8eb0-2b9e6c49abcd" width="300" height="400"/></td>
    </tr>
    <tr>
      <td rowspan="1">검색페이지</td>
      <td>카테고리 불러오기</td>
      <td>카테고리별 상품 조회</td>
      <td><img src="https://github.com/user-attachments/assets/c2a3b619-e5d4-4b8c-ab24-743d9c276055" width="300" height="400"/></td>
    </tr>
    <tr>
      <td rowspan="1">로그인/회원가입</td>
      <td>이메일 인증 (OTP)</td>
      <td>이메일을 통한 인증 절차</td>
      <td><img src="https://github.com/user-attachments/assets/0d52a874-9fb0-4a9f-aca9-31deaf6b8a22" width="300" height="400"/></td>
    </tr>
    <tr>
      <td rowspan="1">마이페이지</td>
      <td>마일리지 / 쿠폰 / 후기 페이지</td>
      <td>마일리지 조회 및 쿠폰 관리</td>
      <td><img src="https://github.com/user-attachments/assets/9e28a6b2-0d64-429f-9026-07066aa63837" width="300" height="400"/></td>
    </tr>
  </tbody>
</table>

<br/>

## 트러블 슈팅

### 🐌 장바구니 성능 개선
장바구니 기능에서 주어진 피드백 중 가장 많이 언급된 문제는 "장바구니가 느리다"는 점이었습니다. 구체적인 문제는 다음과 같습니다:

1. 장바구니에 상품을 추가해도 딜레이가 발생
2. 상품 옵션(수량, 사이즈) 변경 시 딜레이
3. 상품 삭제 시 딜레이

### 문제의 심각성
UI 반영이 느리다는 문제 외에도, 장바구니에 추가한 상품이 주문 페이지에 반영되지 않는 현상이 발생하고 있었습니다. 이는 유저에게 혼란을 주고, 결제까지 진행하는데 상품이 누락되는 문제를 발생시킬 수 있습니다.

### 문제 원인
장바구니에 상품을 추가, 수정, 삭제할 때마다 항상 서버와 통신이 발생했기 때문입니다. 이로 인해 UI 반영 속도가 느려지고, 주문 페이지에서는 최신 장바구니가 반영되지 않는 문제로 이어졌습니다.

### 해결 방안
1. **서버와의 통신 제한**
   - 서버와 통신하는 동안 유저의 행동을 제한하고, 로딩 스피너를 표시하여 UI 반영 지연을 시각적으로 안내합니다.
   
2. **서버 통신을 최소화**
   - 장바구니 정보는 로컬 스토리지에 저장하고, 유저가 수정할 때마다 로컬에 저장됩니다. 장바구니 페이지가 언마운트될 때 DB에 정보를 저장하여 서버 통신 횟수를 줄입니다.
   - 비로그인 상태에서도 로컬 스토리지를 활용해 장바구니 기능을 제공하고, 로그인 시 로컬 스토리지와 DB의 정보를 병합합니다.

### 개선된 로직
- **로그인 상태**: 
  1. 로그인 시 유저의 장바구니 정보를 로컬 스토리지에 저장
  2. 장바구니 수정 시 로컬에 정보 저장
  3. 페이지 언마운트 시 DB에 장바구니 정보 저장
- **비로그인 상태**: 로컬 스토리지에 장바구니 정보를 저장하며, 로그인 시 로컬 스토리지와 DB의 정보를 합침

### 개선 효과
- 장바구니 반영 속도 개선
- 주문 페이지에서 상품 누락 문제 해결
- 비로그인 유저도 장바구니 기능 이용 가능

<br/>

## 🔧 개선 목표
### 기능 개발
- **리팩토링**: 코드 개선 및 최적화를 통해 유지보수성 향상
- **판매자, 브랜드, 이벤트 페이지 구현**: 각 페이지의 기능 추가
- **주문 취소/환불**: 유저가 주문을 취소하거나 환불을 요청할 수 있는 기능 개발
- **아이디/비밀번호 찾기**: 유저가 아이디 및 비밀번호를 찾을 수 있는 기능 구현
- **고객센터**: 유저가 문의를 할 수 있는 고객센터 기능 추가

### 기술적인 도전 계획
- **페이지 성능 최적화**: 로딩 속도 개선, 렌더링 최적화를 통해 사용자 경험 향상
- **데이터 보안 강화**: 사용자 정보 보호 및 데이터 전송 보안 강화
- **1:1 문의 챗봇 도입**: 유저와 실시간으로 소통할 수 있는 1:1 챗봇 서비스 도입
  
<br/>

## 📂 프로젝트 폴더 구조

```
📦src
 ┣ 📂api                # api 호출 및 관련 함수 정의
 ┣ 📂app
 ┃ ┣ 📂(provider)       # global provider 설정
 ┃ ┃ ┣ 📂(root)         # 최상위 루트 레이아웃 설정
 ┃ ┃ ┃ ┣ layout.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┗ layout.tsx
 ┃ ┣ 📂api              # route handler
 ┃ ┗ layout.tsx
 ┣ 📂assets             # 정적 파일
 ┣ 📂components         # 재사용 UI 컴포넌트
 ┣ 📂constant           # 상수값 모음
 ┣ 📂hooks 
 ┃ ┣ 📂mutation         # mutation hooks
 ┃ ┣ 📂query            # query hooks
 ┃ ┣ ...                # 커스텀 훅
 ┣ 📂providers          # provider 
 ┣ 📂supabase           # supabase 설정 파일
 ┣ 📂types              # 타입 선언
 ┣ 📂utils              # 유틸함수
 ┗ middleware.ts      # 전역 미들웨어 설정

```
