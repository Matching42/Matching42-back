/**
 * @swagger
 * /user:
 *  get:
 *      description: 모든 유저 정보를 조회하는 API
 *      responses:
 *          200:
 *              description: |
 *                  API 호출에 성공, success(true) 값과 모든 유저 정보 반환 </br>
 *                  - success : API 실행 결과 </br>
 *                  - users : 모든 유저의 상세 정보 리스트 </br>
 *                      - ID : 유저의 ID </br>
 *                      - intraInfo : 유저의 인트라 정보 </br>
 *                          - blackholed_at : 유저의 블랙홀 날짜 정보 </br>
 *                          - level : 유저의 42SEOUL 레벨 정보 </br>
 *                      - waitMatching : 유저의 매칭 대기 상태 정보 </br>
 *                      - teamID : 유저가 속해 있는 팀의 ID </br>
 *                      - endTeamList : 유저가 과거 속해 있던 팀의 리스트 </br>
 *                      - gitID : 유저의 Github ID </br>
 *                      - cluster : 유저가 선호하는 클러스터
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              users:
 *                                  type: array
 *                                  items:
 *                                      oneOf:
 *                                          - $ref: "#/components/schemas/User"
 *                                          - $ref: "#/components/schemas/User"
 *                                          - $ref: "#/components/schemas/User"
 *          400:
 *              description: 잘못된 요청으로 인해 유저 정보 조회 실패
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
 *                                  code: error code
 *                                  message: error message
 */
