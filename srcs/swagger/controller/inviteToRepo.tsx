/**
 * @swagger
 * /team/invitetorepo/{teamID}/{userID}:
 *  post:
 *      description: 팀의 깃 저장소에 유저를 초재하는 API입니다.
 *      parameters:
 *      - in: path
 *        name: teamID
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 초대장을 발급 할 팀의 id 입니다.
 *      - in: path
 *        name:  userID
 *        required: false
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 초대장을 발급받을 유저의 id 입니다. </br> 해당 값을 입력하지 않을 경우 전체 멤버를 초대합니다.
 *      responses:
 *          200:
 *              description: 대상을 성공적으로 초대했을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *          400:
 *              description: |
 *                오류가 발생해 대상의 일부 혹은 전체를 성공적으로 초대하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - userID로 지정된 유저가 팀에 속하지 않음</br>
 *                - userID로 지정된 유저가 데이터베이스에 존재하지 않음</br>
 *                - 유저의 gitName이 깃허브에 등록되어 있지 않음</br>
 *                - 팀의 깃 링크가 아직 생성되지 않음</br>
 *                - 팀의 깃 링크가 깃허브에 존재하지 않음
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
 *                                 properties:
 *                                   userID: string
 *                          example:
 *                            success: false
 *                            error:
 *                              code: "Error"
 *                              message:
 *                                user1: "User:123 does not Exist in github"
 *                                user3: "User:345 does not Exist in github"
 */
