/**
 * @swagger
 * /team/{teamId}:
 *  patch:
 *      description: 팀의 상태를 변경시키는 API입니다.
 *      parameters:
 *      - in: path
 *        name: teamId
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 상태를 변경시킬 팀의 id 입니다.
 *      requestBody:
 *        required: true
 *        description: |
 *          ### 변경할 상태 정보입니다.</br>
 *          - progress - 매칭이 완료되어 프로젝트 진행 중입니다.</br>
 *          - end - 프로젝트가 종료되어 매칭이 팀이 닫혔습니다.</br>
 *          - less_member - 팀 멤버 수가 적은 상태로 매칭되었습니다</br>
 *          - wait_member - 팀 멤버를 기다리는 중입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                state:
 *                  type: string
 *                  enum: [progress, end, less_member, wait_member]
 *              example:
 *                state: "less_member"
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
 *                - teamId에 해당하는 팀이 없음
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
 *                              code: no such team id or state
 *                              message: no such team id or state
 */
