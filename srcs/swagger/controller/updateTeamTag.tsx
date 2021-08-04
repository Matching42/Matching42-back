/**
 * @swagger
 * /team/tag/{teamID}:
 *  patch:
 *      description: 팀의 태그를 변경시키는 API입니다.
 *      parameters:
 *      - in: path
 *        name: teamID
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 태그를 변경시킬 팀의 ID 입니다.
 *      requestBody:
 *        required: true
 *        description: |
 *          ### state : 변경할 태그 정보입니다.</br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tag:
 *                  type: array
 *                  items:
 *                    type: string
 *              example:
 *                tag: ["tag1", "tag2"]
 *      responses:
 *          200:
 *              description: 팀 태그를 성공적으로 변경했을 경우 다음 결과가 반환됩니다.
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
 *                오류가 발생해 팀의 태그를 변경하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - 태그 값이 유효하지 않음</br>
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
