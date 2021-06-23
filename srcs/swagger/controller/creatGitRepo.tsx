/**
 * @swagger
 * team/creategitrepo/{teamID}:
 *  post:
 *      description: 팀의 깃 저장소를 생성하는 API입니다.
 *      parameters:
 *      - in: path
 *        name: teamID
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: 깃 저장소를 생성할 팀의 id 입니다.
 *      responses:
 *          200:
 *              description: 팀의 깃 저장소를 성공적으로 생성했을 경우 다음 결과가 반환됩니다.
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
 *                오류가 발생해 팀의 깃 저장소를 성공적으로 생성하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - teamId에 해당하는 팀이 없음</br>
 *                - 팀에 subject가 없음</br>
 *                - 팀에 이미 깃 링크가 있음
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
 *                              code: Team already has a gitLink
 *                              message: Team already has a gitLink
 */
