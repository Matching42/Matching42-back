/**
 * @swagger
 * /addmember:
 *  post:
 *      description: addMember는 Matching42에 등록되어 있는 팀에 특정 유저를 추가하는 API 입니다.
 *      requestBody:
 *          required: true
 *          description: |
 *              #### 유저를 등록시킬 팀의 ID와 팀에 추가할 유저의 ID가 필요합니다.
 *              - teamId - 유저를 추가하고자 하는 팀 ID
 *              - userId - 팀에 추가하고자 하는 유저의 ID
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          teamId:
 *                              type: string
 *                              required: true
 *                          userId:
 *                              type: string
 *                              required: true
 *                      example:
 *                          "teamId": "1"
 *                          "userId": "hyeokim"
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, 팀의 멤버 목록에 유저를 추가하고, 유저 정보에 팀을 등록한다. </br>
 *                  - success : API 실행 결과 </br>
 *                  - team : 유저가 추가된 팀의 상세 정보 </br>
 *                      - ID : 팀의 ID </br>
 *                      - leaderID : 팀의 리더 역할을 맡고있는 유저의 ID </br>
 *                      - memberID : 팀에 속해있는 유저들의 ID 리스트 </br>
 *                      - subject : 현재 팀이 진행하고 있는 과제 </br>
 *                      - state : 팀의 현재 상태 </br>
 *                          - progress : 매칭이 완료되어 프로젝트 진행 중인 상태</br>
 *                          - end : 프로젝트가 종료된 상태</br>
 *                          - less_member : 팀 멤버 수가 적은 상태로 매칭된 상태</br>
 *                          - wait_member : 팀 멤버를 기다리는 중인 상태 </br>
 *                      - startDate : 팀이 생성된 날짜 정보 </br>
 *                      - notionLink : 팀에게 제공되는 노션 페이지의 링크 </br>
 *                      - gitLink : 팀에게 제공되는 Github 저장소의 링크 </br>
 *                      - teamName : 팀명
 *                  - user : 팀 정보가 추가된 유저의 상세 정보 </br>
 *                      - ID : 유저의 ID </br>
 *                      - intraInfo : 유저의 인트라 정보 </br>
 *                          - blackholed_at : 유저의 블랙홀 날짜 정보 </br>
 *                          - level : 유저의 42SEOUL 레벨 정보 </br>
 *                      - waitMatching : 유저의 매칭 대기 상태 정보 </br>
 *                      - teamID : 유저가 속해 있는 팀의 ID </br>
 *                      - gitID : 유저의 Github ID </br>
 *                      - cluster : 유저가 선호하는 클러스터
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              team:
 *                                  $ref: "#/components/schemas/Team"
 *                              user:
 *                                  $ref: "#/components/schemas/User"
 *          400:
 *              description: |
 *                  잘못된 요청으로 인해 멤버 추가 요청 실패 </br>
 *                  - 유효하지 않은 teamId 값이 들어온 경우 </br>
 *                  - 유효하지 않은 userId 값이 들어온 경우</br>
 *                  - 팀 멤버 리스트에 이미 해당 유저가 존재하는 경우 </br>
 *                  - 팀의 상태가 "wait_member"가 아닌 경우
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      code:
 *                                          type: string
 *                                      message:
 *                                          type: string
 *                          example:
 *                              success: false
 *                              error:
 *                                  code: Error
 *                                  message: Invalid User ID
 */
