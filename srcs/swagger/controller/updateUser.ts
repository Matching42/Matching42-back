/**
 * @swagger
 * /user/{userID}:
 *  patch:
 *      description: 유저의 정보를 변경시키는 API입니다.
 *      parameters:
 *      - in: path
 *        name: userID
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 정보를 변경시킬 유저의 ID 입니다.
 *      requestBody:
 *        required: true
 *        description: |
 *          ### waitMatching : 유저의 매칭 대기 상태 정보로 매칭 신청한 서브젝트 명으로 나타냄.</br>
 *          ### teamID : 유저가 속해 있는 팀의 ID </br>
 *          ### gitName : 유저의 Github Name </br>
 *          ### cluster : 유저가 선호하는 클러스터 </br>
 *          - ['개포', '서초', null]
 *          ### deadline : 유저가 선호하는 프로젝트 수행 기간 </br>
 *          - ['3일', '1주', '2주', '4주', '6주 이상', null]
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                waitMatching:
 *                  type: string
 *                teamID:
 *                  type: string
 *                gitName:
 *                  type: string
 *                cluster:
 *                  type: string
 *                  enum: ['개포', '서초', null]
 *                deadline:
 *                  type: string
 *                  enum: ['3일', '1주', '2주', '4주', '6주 이상', null]
 *              example:
 *                state: "Libft"
 *                teamID: "1"
 *                gitName: "hminn"
 *                cluster: "개포"
 *                deadline: "3일"
 *      responses:
 *          200:
 *              description: 유저 정보를 성공적으로 변경했을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            team:
 *                              $ref: "#/components/schemas/User"
 *          400:
 *              description: |
 *                오류가 발생해 유저의 정보를 변경하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - teamID에 해당하는 팀이 없음</br>
 *                - cluster 값이 유효하지 않음</br>
 *                - deadline 값이 유효하지 않음</br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            error:
 *                              properties:
 *                               code:
 *                                 type: string
 *                               message:
 *                                 type: string
 *                          example:
 *                            success: false
 *                            error:
 *                              code: Error
 *                              message: Invalid Team ID
 */
