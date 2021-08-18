/**
 * @swagger
 * /team/{teamID}:
 *  patch:
 *      description: 팀의 정보를 변경시키는 API입니다.
 *      parameters:
 *      - in: path
 *        name: teamID
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 정보를 변경시킬 팀의 ID 입니다.
 *      requestBody:
 *        required: true
 *        description: |
 *          ### state : 변경할 상태 정보입니다.</br>
 *          - progress - 팀 멤버가 3명 이상이 되어 정상적으로 진행 중입니다.</br>
 *          - end - 팀의 학습이 종료되어 팀이 닫혔습니다.</br>
 *          - less_member - 팀 멤버가 3명 미만으로 진행중이고 추가 멤버를 받지 않는 상태입니다</br>
 *          - wait_member - 팀 멤버가 3명 미만으로 진행중이고 추가 멤버를 받는 상태입니다.</br>
 *          ### teamName : 변경할 팀의 이름입니다.</br>
 *          ### description : 변경할 팀의 설명입니다.</br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                state:
 *                  type: string
 *                  enum: [progress, end, less_member, wait_member]
 *                teamName:
 *                  type: string
 *                description:
 *                  type: string
 *              example:
 *                state: "less_member"
 *                teamName: "team1"
 *                description: "subject matched"
 *      responses:
 *          200:
 *              description: 팀 상태를 성공적으로 변경했을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            team:
 *                              $ref: "#/components/schemas/Team"
 *          400:
 *              description: |
 *                오류가 발생해 팀의 상태를 변경하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - state값이 유효하지 않음</br>
 *                - teamID에 해당하는 팀이 없음
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
 *                              code: Invalid Team ID
 *                              message: Invalid Team ID
 */
